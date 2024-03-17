/**
 *  After user signed in using Auth0, we mint a new auth token so they can call Supabase
 */

import { jwtVerify, SignJWT, createRemoteJWKSet, JWTPayload } from 'https://deno.land/x/jose@v5.2.3/index.ts';
import { createClient } from 'npm:@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

const DB_JWT_SECRET = Deno.env.get("JWT_SECRET");
const AUTH0_URL = Deno.env.get("AUTH0_URL"); // https://TENANT.us.auth0.com
const BACKEND_URL = Deno.env.get("BACKEND_URL"); // http://localhost:3000

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!DB_JWT_SECRET) { 
    console.error('Missing jwt secret.'); 
    return new Response("", { status: 500, headers: { ...corsHeaders } });
  }

  const token = req.headers.get('authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) { 
    return new Response("Missing token", { status: 400, headers: { ...corsHeaders } });
  }

  try {
    const { sub, iat, exp } = await decodeAuthToken(token);

    const { email } = await fetchUser(token);
    
    if (!sub || !iat || !exp) return new Response('', { status: 400} );

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: users } = await supabase.from('users').select('*').eq('email', email).limit(1);

    let user = users ? users[0] : null;

    if (!user) {
      const { error, data } = await supabase.auth.admin.createUser({ email });
      if (error) {
        return new Response('', { status: 500 });
      }
      user = data.user;
      console.log(data);
    }

    return new Response(JSON.stringify({
      access_token: await new SignJWT({ })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(user.id)
        .setAudience('authenticated')
        .setIssuedAt(new Date(iat * 1000))
        .setExpirationTime(new Date(exp * 1000))
        .sign(new TextEncoder().encode(DB_JWT_SECRET))
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.log(err);
    return new Response("No", { status: 401, headers: { ...corsHeaders } });
  }
});

async function decodeAuthToken(jwt: string): Promise<JWTPayload> {
  const JWKS = createRemoteJWKSet(new URL(`${AUTH0_URL}/.well-known/jwks.json`));
  const { payload } = await jwtVerify(jwt, JWKS, {
    issuer: `${AUTH0_URL}/`,
    audience: BACKEND_URL,
  });

  return payload;
}

async function fetchUser (token: string) {
  const response = await fetch(`${AUTH0_URL}/userinfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }
  }).then((data) => data.json());

  console.log(response);

  return response;
}
