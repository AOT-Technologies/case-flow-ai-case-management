/* eslint-disable max-len */
//  const SERVER_BASE_URL = "http://localhost:5000";
import {
  CASEFLOW_DMS_API_URL,
  CASEFLOW_GRAPHQL_API_URL,
  CASEFLOW_LOB_GRAPHQL_API_URL,
  FORMSFLOW_URL,
  FORMSFLOW_FORM_URL,
  FORMSFLOW_APP_URL,
  FORMSFLOW_WEB_URL
} from "./config";

export const GRAPHQLAPI: string = `${CASEFLOW_GRAPHQL_API_URL}`;
export const LOB_GRAPHQLAPI: string = `${CASEFLOW_LOB_GRAPHQL_API_URL}`;

//alert(CASEFLOW_API_URL)
export const API = {
  DMS_API: `${CASEFLOW_DMS_API_URL}/documents`,
};
export const GRAPHQL = GRAPHQLAPI + "/graphql";
export const LOBURL = LOB_GRAPHQLAPI + "/graphql";
export const BPM_URL = FORMSFLOW_URL;
export const FORMSFLOW_APPLICATION_URL = FORMSFLOW_APP_URL;
export const FORMSFLOW_WEB_APPLICATION_URL = FORMSFLOW_WEB_URL;
export const FORM_URL = FORMSFLOW_FORM_URL;
