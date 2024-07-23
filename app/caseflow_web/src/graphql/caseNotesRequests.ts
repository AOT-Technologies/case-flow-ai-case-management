import gql from "graphql-tag";

export const FETCH_DATA = gql`
  query getNoteById($Id: Int!) {
    getNoteById(id: $Id) {
      id
      caseid
      creationdate
      userid
      notetext
      actiontype
    }
  }
`;



export const CREATE_NEW_CASE_NOTE = gql`
  mutation createCaseNote($createCaseNoteInput: CreateCaseNoteInput!) {
    createCaseNote(createCaseNoteInput: $createCaseNoteInput) {
      id
      caseid
      creationdate
      userid
      notetext
      actiontype
    }
  }
`;

export const UPDATE_NEW_CASE_NOTE = gql`
  mutation updateCaseNote($updateCaseNoteInput: UpdateCaseNoteInput!) {
    updateCaseNote(updateCaseNoteInput: $updateCaseNoteInput) {
      id
      caseid
      creationdate
      userid
      notetext
      actiontype
    }
  }
`;


export const FETCH_CASENOTES = gql`
  query caseNotesByCaseId($CaseId: Int!) {
    caseNotesByCaseId(id: $CaseId) {
      id
      caseid
      creationdate
      userid
      notetext
      actiontype
    }
  }
`;
