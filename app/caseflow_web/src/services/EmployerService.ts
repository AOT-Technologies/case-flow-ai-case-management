import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { LOBURL } from "../apiManager/endpoints";
import {
  FETCH_ALL,
} from "../graphql/employerRequest";
import { print } from "graphql";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";


export const getAllEmployersData = async () => {
  const url = LOBURL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_ALL),
      variables: {
       Take: Number(PAGINATION_TAKE),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });

  console.log(output)
  return output?.getEmployersList?.CaseflowEmployers;
};
