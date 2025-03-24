import { LOBURL } from "../apiManager/endpoints";
import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { CREATE_LOCATION } from "../graphql/locationRequests";
import { print } from "graphql";
export const createLocation = async (data) => {
  const url = LOBURL;
  console.log('employerid in serv', data.employerid, data)
  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_LOCATION),
      variables: {
        CreateCaseflowLocationsInput: {
          address: data.address,
          city: data.city,
          employerId: Number(data.employerid),
          createdate: new Date(),
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.createLocations;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};