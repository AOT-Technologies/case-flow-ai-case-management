import { print } from "graphql";
import {
  CREATE_ROOT_DECISION,
  CREATE_ISSUE_DECISION,
  CREATE_CASE_DECISION,
  GET_CASE_DECISION_BY_CASE_ID,
} from "../graphql/decisionRequests";
import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { GRAPHQL } from "../apiManager/endpoints";

export const createRootDecisionService = async (data) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_ROOT_DECISION),
      variables: {
        createRootDecisionInput: {
          rootDecisionDate: data.rootDecisionDate,
          rootDecisionAgency: data.rootDecisionAgency,
          decisionMaker: data.decisionMaker,
          referenceNumber: data.referenceNumber,
          decisionDate: data.decisionDate,
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.createRootDecision;
    })
    .catch((error) => {
      return error?.response?.data
        ? { error: error }
        : { error: "Something went wrong" };
    });
};

export const createIssueDecisionService = async (data) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_ISSUE_DECISION),
      variables: {
        createIssueDecisionInput: {
          issue: data.issue,
          eaoRole: data.eaoRole,
          outcome: data.outcome,
          impact: data.impact,
        },
      },
    },
    null
  )
    .then((res) => res.data.data.createIssueDecision)
    .catch((error) => {
      return error?.response?.data
        ? { error: error }
        : { error: "Something went wrong" };
    });
};

export const createCaseDecisionService = async (data) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_CASE_DECISION),
      variables: {
        createCaseDecisionInput: {
          caseId: Number(data.caseId),
          rootDecisionId: Number(data.rootDecisionId),
          issueDecisionId: Number(data.issueDecisionId),
        },
      },
    },
    null
  )
    .then((res) => res.data.data.createCaseDecision)
    .catch((error) => {
      return error?.response?.data
        ? { error: error }
        : { error: "Something went wrong" };
    });
};

export const getCaseDecisionByCaseId = async (data) => {
  const url = GRAPHQL;
  return httpPOSTRequest(
    url,
    {
      query: print(GET_CASE_DECISION_BY_CASE_ID),
      variables: { caseId: Number(data.caseId) },
    },
    null
  )
    .then((res) => res.data.data.getCaseDecisionByCaseId)
    .catch((error) => {
      return error?.response?.data
        ? { error: error }
        : { error: "Something went wrong" };
    });
};
