import {
  httpGETRequest,
  httpPOSTRequest,
  httpPUTRequest,
} from "../apiManager/httpRequestHandler";
import { BPM_URL, FORM_URL } from "../apiManager/endpoints";
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
export const getTaskById = async (id) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${id}`;
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
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${id}/`;
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
export const getTaskVariablesById = async (id) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${id}/variables`;
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

export const getTaskIdentityLinksById = async (id) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${id}/identity-links?type=candidate`;
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

export const getProcessDefinitionById = async (id) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/process-definition?processDefinitionId=${id}`;
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

export const getTaksByUserId = async (id, start = 0, size = 2, sortBy) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task?assignee=${id}&firstResult=${start}&maxResults=${size}&sortBy=${sortBy}&sortOrder=desc`;
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

/**
 *
 * @param  {...any} rest
 */
export const getProcessActivities = async (process_instance_id, ...rest) => {
  const apiUrlProcessActivities = `${BPM_URL}/camunda/engine-rest-ext/v1/process-instance/${process_instance_id}/activity-instances`;
  const output = await httpGETRequest(apiUrlProcessActivities, {}, null)
    .then((res) => {
      return res?.data?.childActivityInstances;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const fetchDiagram = async (
  process_key,
  isDmn = false,
  ...rest
) => {
  let apiFetchDiagram = isDmn ? `${BPM_URL}/camunda/engine-rest-ext/v1/decision-definition/key/${process_key}/xml` : `${BPM_URL}/camunda/engine-rest-ext/v1/process-definition/key/${process_key}/xml`;
  const output = await httpGETRequest(apiFetchDiagram, {}, null)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return isDmn ? output.dmnXml : output.bpmn20Xml;
};


export const onBPMTaskFormSubmit = async (taskId, formReq) => {

  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${taskId}/submit-form`;
  const output = await httpPOSTRequest(url, formReq, null)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};
export const addBPMGroup = async (taskId, group) => {

  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${taskId}/identity-links`;
  const output = await httpPOSTRequest(url, group, null)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};


export const removeBPMGroup =  async (taskId, group) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${taskId}/identity-links/delete`;
  const output = await httpPOSTRequest(url, group, null)
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log({ error: error });
    return {};
  });
  return output;
};

export const claimTask =  async (taskId, body) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${taskId}/claim`;
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
export const unClaimTask =  async (taskId) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${taskId}/unclaim`;
  const output = await httpPOSTRequest(url, {}, null)
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log({ error: error });
    return {};
  });
  return output;
};
export const fetchUserList = async (group) => {
  const apiFetchUsers = `${FORM_URL}/user?memberOfGroup=${group}`;
  const output = await httpGETRequest(apiFetchUsers, {}, null)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
}
export const updateTaskAssignee = async (taskId, body) => {
  const url = `${BPM_URL}/camunda/engine-rest-ext/v1/task/${taskId}/assignee`;
  const output = await httpPOSTRequest(url, body, null)
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log({ error: error });
    return {};
  });
  return output;
}