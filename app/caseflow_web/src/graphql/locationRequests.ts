import gql from "graphql-tag";

export const CREATE_LOCATION = gql`
  mutation createCaseflowLocations($CreateCaseflowLocationsInput: CreateCaseflowLocationsInput!) {
    createCaseflowLocations(CreateCaseflowLocationsInput: $CreateCaseflowLocationsInput) {
      id
    }
  }
`;