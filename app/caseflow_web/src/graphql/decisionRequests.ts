import gql from "graphql-tag";


export const CREATE_ROOT_DECISION = gql`
  mutation CreateRootDecision($createRootDecisionInput: CreateRootDecisionInput!) {
    createRootDecision(createRootDecisionInput: $createRootDecisionInput) {
      id
    }
  }
`;

export const CREATE_ISSUE_DECISION = gql`
  mutation CreateIssueDecision($createIssueDecisionInput: CreateIssueDecisionInput!) {
    createIssueDecision(createIssueDecisionInput: $createIssueDecisionInput) {
      id
    }
  }
`;


export const CREATE_CASE_DECISION = gql`
  mutation CreateCaseDecision($createCaseDecisionInput: CreateCaseDecisionInput!) {
    createCaseDecision(createCaseDecisionInput: $createCaseDecisionInput) {
      id
    }
  }
`;
