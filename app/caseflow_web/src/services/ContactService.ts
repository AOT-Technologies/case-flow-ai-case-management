import { httpPOSTRequest } from "../apiManager/httpRequestHandler";
import { LOBURL } from "../apiManager/endpoints";
import {
  CREATE_NEW_CASEFLOW_CONTACT,
  FETCH_ALL,
  FETCH_ALL_BY_IDS,
  FETCH_ALL_CONTACTS_DATA,
  FETCH_DATA,
  UPDATE_NEW_CASEFLOW_CONTACT,
} from "../graphql/contactRequest";
import { print } from "graphql";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";
import moment from "moment";

export const getContactDetails = async (id) => { 
  const url = LOBURL;
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
      return res.data.data.getContactsById;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const getContactDetailsByIds = async (ids) => { 
  const url = LOBURL;
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_ALL_BY_IDS),
      variables: {
        Id: ids,
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.getContactsByIds.CaseflowContacts;
    })
    .catch((error) => {
      console.log({ error: error });
      return {};
    });
  return output;
};

export const getAllContactsData = async () => {
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
  return output?.getContactsList?.CaseflowContacts;
};

export const getContactsData = async (
  number,
  searchField,
) => {
  const url = LOBURL;
  const skip = (number - 1) * Number(PAGINATION_TAKE);
  const output = await httpPOSTRequest(
    url,
    {
      query: print(FETCH_ALL_CONTACTS_DATA),
      variables: {
        searchField: searchField,
        Skip: skip,
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
  return output?.searchCaseflowContacts;
};

export const createNewContact = async (data) => {
  const url = LOBURL;

  return httpPOSTRequest(
    url,
    {
      query: print(CREATE_NEW_CASEFLOW_CONTACT),
      variables: {
        CreateCaseflowContactsInput: {
          firstname: data.firstname,
          lastname: data.lastname,
          phonenumber: Number(data.phonenumber),
          email: data.email,
          dateofbirth: new Date(data.dateofbirth),
          address: data.address,
          createdat: new Date(),
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.createCaseflowContacts;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};

export const updateContact = async (data) => {
  const url = LOBURL;
  console.log(data);
  return httpPOSTRequest(
    url,
    {
      query: print(UPDATE_NEW_CASEFLOW_CONTACT),
      variables: {
        updateCaseflowContactInput: {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          phonenumber: Number(data.phonenumber),
          email: data.email,
          dateofbirth: new Date(data.dateofbirth),
          address: data.address,
          createdat: new Date(),
        },
      },
    },
    null
  )
    .then((res) => {
      return res.data.data.updateCaseflowContacts;
    })
    .catch((error) => {
      if (error?.response?.data) {
        return { error: error };
      } else {
        return { error: "something went wrong" };
      }
    });
};
