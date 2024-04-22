import {
  httpGETRequest,
  httpPOSTRequest,
  httpPUTRequest,
} from "../apiManager/httpRequestHandler";
import { BPM_URL } from "../apiManager/endpoints";
import { GRAPHQL } from "../apiManager/endpoints";
import { print } from "graphql";
import { ADD_WORKFLOW_CASE_HISTORY } from "../graphql/caseRequests";

export const getWorkflowList = async (caseType) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/process-definition?latestVersion=true`;
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
export const startNewWorkflow = async (id, body) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/process-definition/key/${id}/start`;
  const output = await httpPOSTRequest(url, body, null)
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
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task?caseInstanceId=${id}`;
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
export const getTaksByProcessInstanceId = async (id) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task?processInstanceId=${id}`;
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
export const updateTaksById = async (id, body) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${id}`;
  const output = await httpPUTRequest(url, body, null)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const getTaksByUserId = async (id, start = 0, size = 2) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task?assignee=${id}&firstResult=${start}&maxResults=${size}`;
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

export const getTaskCountByUserId = async (id) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/count?assignee=${id}`;
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

export const addWorkflowCaseHistory = async (caseId,workflowtype="") => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(ADD_WORKFLOW_CASE_HISTORY),
      variables: {
        createCaseEventInput: {
          artifactId: parseInt(caseId),
          eventtypeId: 12,
          workflowtype:workflowtype,
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
