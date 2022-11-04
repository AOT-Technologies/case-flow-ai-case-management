export const BASE_ROUTE = "/";

//keycloak
export const Keycloak_Client =
  (window._env_ && window._env_.KEYCLOAK_WEB_CLIENTID) ||
  process.env.KEYCLOAK_WEB_CLIENTID ||
  "case-flow-web";


export const KEYCLOAK_REALM =
  (window._env_ && window._env_.REACT_APP_KEYCLOAK_URL_REALM) ||
  process.env.REACT_APP_KEYCLOAK_URL_REALM ||
  "caseflow";

export const KEYCLOAK_URL =
  (window._env_ && window._env_.REACT_APP_KEYCLOAK_URL) ||
  process.env.REACT_APP_KEYCLOAK_URL;
  
export const KEYCLOAK_AUTH_URL = `${KEYCLOAK_URL}/auth`;