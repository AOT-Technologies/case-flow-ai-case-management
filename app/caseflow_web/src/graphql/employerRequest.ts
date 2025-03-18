import gql from "graphql-tag";

export const FETCH_ALL = gql`
  query getEmployersList {
    getEmployersList {
      totalCount
      CaseflowEmployers {
        id
        name
        worksafenumber
        phonenumber
        email
        createdate
        locations {
          id
          address
          city
        }
      }
    }
  }
`;

export const FETCH_DATA = gql`
  query getEmployersById($Id: Int!) {
    getEmployersById(id: $Id) {
        id
        name
        worksafenumber
        phonenumber
        email
        createdate
        locations {
          id
          address
          city
        }
    }
  }
`;
