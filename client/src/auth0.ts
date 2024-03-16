import { createAuth0 } from "@auth0/auth0-vue"

const redirectUri = `${window.location.protocol}//${window.location.host}/callback`

export const auth0 = createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirect_uri: redirectUri,
  },
});
