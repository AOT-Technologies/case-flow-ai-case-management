import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { LOBURL } from "../apiManager/endpoints";
import { print } from "graphql";

import { GRAPHQL } from "../apiManager/endpoints";
import { CREATE_NEW_CASE_NOTE, FETCH_CASENOTES } from "../graphql/caseNotesRequests";


export const createNewNote = async (data) => {
  const url = GRAPHQL;

  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_NEW_CASE_NOTE),
      variables: {
        createCaseNoteInput: {
          caseid :  parseInt(data.caseid) ,
          creationdate : new Date(),
          userid : 1,
          notetext : data.notetext,
          actiontype: data.actiontype
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.createCaseNote;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};



export const getCaseNotes = async (id) => {
  const url = GRAPHQL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_CASENOTES),
      variables: {
        CaseId: parseInt(id),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.caseNotesByCaseId;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

