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