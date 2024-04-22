import { httpPOSTRequest, httpPUTRequest } from "../apiManager/httpRequestHandler";
import { print } from "graphql";

import { GRAPHQL } from "../apiManager/endpoints";
import { CREATE_WORKFLOW_ACTIVITY,FETCH_WORKFLOW_ACTIVITIES_BY_CASE,UPDATE_WORKFLOW_ACTIVITY } from "../graphql/workflowActivityRequests";


export const createNewWorkflowActivity = async (caseId, taskId, taskName, selectedForm, formurl, status, userName) => {
  const url = GRAPHQL;

  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_WORKFLOW_ACTIVITY),
      variables: {
        createWorkflowActivityInput: {
          caseid :  parseInt(caseId) ,
          creationdate : new Date(),
          userid : userName,
          taskid : taskId,
          taskname : taskName,
          formurl : formurl,
          status: status,
          selectedform : selectedForm
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.createWorkflowActivity;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};



export const getWorkflowActivities = async (id) => {
  const url = GRAPHQL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_WORKFLOW_ACTIVITIES_BY_CASE),
      variables: {
        CaseId: parseInt(id),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.workflowActivitiesByCaseId;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};


export const updateWorkflowActivity = async (data) => {
  const url = GRAPHQL;
  return httpPUTRequest(
    url,
    {
      query: print(UPDATE_WORKFLOW_ACTIVITY),
      variables: {
        updateCaseInput: {
          id: data.id,
          description: data.description
        },
      },
    },
    null
  )
    .then((res) => {
      return { success: res.data };
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};
