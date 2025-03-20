import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { LOBURL } from "../apiManager/endpoints";
import {
  CREATE_EMPLOYER,
  FETCH_ALL,
  FETCH_DATA
} from "../graphql/employerRequest";
import { print } from "graphql";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";

export const createEmployer = async (data) => {
  const url = LOBURL;
   return httpPOSTRequest(
      url,
      {
        query: print(CREATE_EMPLOYER),
        variables: {
          CreateCaseflowEmployersInput: {
            name: data.name,
            worksafenumber: Number(data.worksafenumber),
            phonenumber: Number(data.phoneNumber),
            email: data.email,
            createdate: new Date(),
          },
        },
      },
      null
    )
}


export const getEmployerDetails = async (id) => { 
  const url = LOBURL;
  console.log('getting employer details', id)
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_DATA),
      variables: {
        Id: parseInt(id),
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.getEmployersById;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

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
