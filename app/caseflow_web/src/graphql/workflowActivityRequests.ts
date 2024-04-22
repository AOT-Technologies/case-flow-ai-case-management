import gql from "graphql-tag";

export const CREATE_WORKFLOW_ACTIVITY = gql`
  mutation createWorkflowActivity($createWorkflowActivityInput: CreateWorkflowActivityInput!) {
    createWorkflowActivity(createWorkflowActivityInput: $createWorkflowActivityInput) {
      taskid
      taskname
      caseid
      formurl
      status
      selectedform
      creationdate
      userid
    }
  }
`;

export const UPDATE_WORKFLOW_ACTIVITY = gql`
  mutation updateWorkflowActivity($updateWorkflowActivityInput: UpdateWorkflowActivityInput!) {
    updateWorkflowActivity(updateWorkflowActivityInput: $updateWorkflowActivityInput) {
      taskid,
      status
    }
  }
`;


export const FETCH_WORKFLOW_ACTIVITIES_BY_CASE = gql`
  query workflowActivitiesByCaseId($CaseId: Int!) {
    workflowActivitiesByCaseId(id: $CaseId) {
      id
      taskid
      taskname
      caseid
      formurl
      status
      selectedform
      creationdate
      userid
    }
  }
`;
