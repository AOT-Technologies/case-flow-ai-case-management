import {
  httpGETRequest,
} from "../apiManager/httpRequestHandler";
import { FORMSFLOW_FORM_URL } from "../apiManager/endpoints/config";

export const fetchDashboardDetails = async (id, ...rest) => {
  const url = `${FORMSFLOW_FORM_URL}/dashboards/${id}`;
  const output =await httpGETRequest(url, {}, null)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};export const fetchUserDashboards = async () => {
  const url = `${FORMSFLOW_FORM_URL}/authorizations/users/dashboard`;
  const output = await httpGETRequest(url, {}, null)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};