/**
 * # create-session
 *
 *  After someone signed in using Auth0, we mint a new auth token so they can call Supabase
 */

import { STATUS_CODE } from "https://deno.land/std@0.220.1/http/status.ts";
import { jwtVerify, SignJWT, createRemoteJWKSet } from 'https://deno.land/x/jose@v5.2.3/index.ts';
import { tryCall} from './try-call.ts';

const DB_JWT_SECRET = Deno.env.get("JWT_SECRET");
const ISSUER = 'https://kernelquest-dev.us.auth0.com/';
const AUDIENCE = 'http://localhost:3000';

Deno.serve(async (req) => {
  if (!DB_JWT_SECRET) { console.error('Missing jwt secret.'); return new Response("", { status: 500 }); }

  const token = req.headers.get('authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) { return new Response("Missing token", { status: 400 }); }


  const [err, decoded] = await tryCall(decodeAuthToken, token);

  console.log('Decoded:', decoded);
  
  if (err) {
    console.log('Failed decoding the token', err);
    return new Response("Token invalid or something", { status: STATUS_CODE.Forbidden });
  }
  
  
  const payload = {
    userId: decoded.sub,
    iat: decoded.iat,
    exp: decoded.exp
  };
  
const alg = 'HS256';
const secret = new TextEncoder().encode(DB_JWT_SECRET);

  return new Response(JSON.stringify({
    access_key: await new SignJWT({ })
      .setProtectedHeader({ alg })
      .setSubject(decoded.sub)
      .setIssuedAt(decoded.iat)
      .setExpirationTime(decoded.exp)
      .sign(secret)
  }))
});

async function decodeAuthToken(jwt: string) {
  const JWKS = createRemoteJWKSet(new URL('https://kernelquest-dev.us.auth0.com/.well-known/jwks.json'));
  const result = await jwtVerify(jwt, JWKS, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });

  console.log('result:', result);

  return result;
}
