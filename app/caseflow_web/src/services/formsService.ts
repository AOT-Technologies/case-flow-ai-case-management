import {
  httpGETRequest,
  httpPOSTRequest,
  httpPUTRequest,
} from "../apiManager/httpRequestHandler";
import {
  GRAPHQL,
  FORM_URL,
  FORMSFLOW_APPLICATION_URL,
} from "../apiManager/endpoints";
import { print } from "graphql";
import { ADD_WORKFLOW_CASE_HISTORY } from "../graphql/caseRequests";
import { FORMSFLOW_FORM_URL } from "../apiManager/endpoints/config";
import UserService from "./UserService";

export const getFormsList = async () => {
  const url = `${FORM_URL}/form`;
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
export const getFormsListByName = async (name) => {
  const url = `${FORM_URL}/form`;
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

export const getFormDetails = async (form) => {
  const url = `${FORMSFLOW_APPLICATION_URL}/${form}`;
  const formIoToken = await getFormIORoleIds();
  const headers = { "x-jwt-token": formIoToken };
  const output = await httpGETRequest(url, {}, formIoToken, false, headers)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};
export const getFormDetailsById = async (formId) => {
  const url = `${FORMSFLOW_APPLICATION_URL}/form/${formId}`;
  const formIoToken = await getFormIORoleIds();
  const headers = { "x-jwt-token": formIoToken };
  const output = await httpGETRequest(url, {}, formIoToken, false, headers)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};
export const submitNewForm = async (id, body) => {
  const formIoToken = await getFormIORoleIds();
  const token = { "x-jwt-token": formIoToken };
  const url = `${FORMSFLOW_APPLICATION_URL}/form/${id}/submission`;
  const output = await httpPOSTRequest(url, body, null, true, false, token)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const submitNewFormDraft = async (body, draftId) => {
  const url = `${FORM_URL}/draft/${draftId}/submit`;
  return await httpPUTRequest(url, body, null)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
};

export const createDraft = async (body) => {
  const draftUrl = `${FORM_URL}/draft`;
  const output = await httpPOSTRequest(draftUrl, body, null, true, false, null)
    .then((res) => {
      return res.data.id;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const createCase = async (body) => {
  const createUrl = `${FORM_URL}/application/create`;
  const output = await httpPOSTRequest(createUrl, body, null, true, false, null)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const getTaksByCaseId = async (id) => {
  const url = `${FORM_URL}/camunda/engine-rest-ext/v1/task?caseInstanceId=${id}`;
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

export const getTaksByUserId = async (id) => {
  const url = `${FORM_URL}/camunda/engine-rest-ext/v1/task?assignee=${id}`;
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

export const addWorkflowCaseHistory = async (caseId: string) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(ADD_WORKFLOW_CASE_HISTORY),
      variables: {
        createCaseEventInput: {
          artifactId: parseInt(caseId),
          eventtypeId: 12,
        },
      },
    },
    null
  )
    .then((res) => {
      return { success: res };
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};

export const getFormIORoleIds = () => {
  const url = FORMSFLOW_FORM_URL + "/formio/roles";

  return httpGETRequest(url, {}, UserService.getToken(), true)
    .then((res) => {
      const token = res.headers["x-jwt-token"];
      localStorage.setItem("formioToken", token.toString());
      localStorage.setItem("roleIds", JSON.stringify(res.data.form));
      return res.headers["x-jwt-token"];
    })
    .catch((error) => {
      return error;
    });
};
