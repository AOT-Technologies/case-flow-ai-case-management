import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecentCaseList, searchCases } from "../../services/CaseService";
import {
  getContactDetails,
  getContactDetailsByIds,
} from "../../services/ContactService";
import CaseList from "../CaseList/CaseList";
import { setSelectedContact } from "../../reducers/newContactReducer";
import { State } from "../../interfaces/stateInterface";
import { getIndividualDetailsByIds } from "../../services/IndividualService";
import './employerdetails.scss'


export default function EmployerDetails() {
  const employer = {
    id: 1,
    worksafeNumber: 123,
    name: "A Real Business",
    contacts: ["John Smith", "Jeff Doe"],
    locations: ["123 Real Rd.", "456 5th St.", "456 7th St."],
  };
  const caseListProps = {
    title: "Related Cases",
  };

  const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
    { text: "Home", link: "/private" },
  ]);
  const contact = useSelector((state: State) => state.contacts.selectedContact);
  const [recentCases, setrecentCases] = useState([]);

  const [searchColumn] = useState("contactid");

  const relatedCaseList = async (output) => {
    let recentCases = await searchCases(
      output.id,
      searchColumn,
      1,
      "id",
      true,
      true,
      null,
      null
    );
    let searchResultCases = recentCases?.Cases?.map((element) => {
      return { ...element, status: "Open" };
    });
    let individuals = await searchResultCases?.reduce(function (pV, cV) {
      pV.push(parseInt(cV.individualid));
      return pV;
    }, []);
    let individualList =
      individuals.length > 0
        ? await getIndividualDetailsByIds(individuals)
        : [];

    let individualsKey = new Map<string, string>();
    individualList?.map((individual) => {
      individualsKey.set(
        individual.id,
        individual.firstname + " " + individual.lastname
      );
    });

    searchResultCases = searchResultCases?.map((element) => {
      element.contactname = output.firstname + " " + output.lastname;
      element.individualname = individualsKey.get(element.individualid);
      return element;
    });

    setrecentCases(searchResultCases);
  };

  const location = useLocation();
  const dispatch = useDispatch();
  async function fetchContactDetails() {
    var matches = location.pathname.match(/(\d+)/);
    if (matches && matches[0]) {
      let output = await getContactDetails(matches[0]);
      dispatch(setSelectedContact(output));
      relatedCaseList(output);
    }
  }

  useEffect(() => {
    fetchContactDetails();
  }, []);

  useEffect(() => {
    setDataForBreadCrumbs([
      { text: "Home", link: "/private" },
      { text: "Contact", link: "/private/contacts" },
      {
        text: "Contact ID : " + contact.id,
        link: "/private/contacts/" + contact.id + "details",
      },
    ]);
  }, [contact]);

  return (
    <>
      <div className="lob-details-container">
        <div className="header-search">
          <Typography variant="body1" className="title">
            CaseFlow
          </Typography>
        </div>
      </div>
      <section className="lob-detail-container">
        <Typography variant="subtitle1" className="lob-id">
          Employer: {employer.name}
        </Typography>
      </section>
      <div className="employer-detail-row">
        <div className="lob-detail-name">
          <Typography variant="subtitle1">ID</Typography>
          <Typography>{employer.id}</Typography>
        </div>

        <div className="lob-detail-name">
          <Typography variant="subtitle1">WorkSafe Number</Typography>
          <Typography>{employer.worksafeNumber}</Typography>
        </div>
      </div>
      <div>
        Location table
      </div>
      <div>
        contacts
      </div>
      <div className="recent-cases">
        <CaseList
          config={caseListProps}
          allRecentCases={recentCases}
        ></CaseList>
      </div>
    </>
  );
}
