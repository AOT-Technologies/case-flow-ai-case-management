import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { searchCases } from "../../services/CaseService";
import {
  getEmployerDetails
} from "../../services/EmployerService";
import CaseList from "../CaseList/CaseList";
import { getIndividualDetailsByIds } from "../../services/IndividualService";
import LocationsList from "../LocationsList/LocationsList";
import './employerdetails.scss'
import { getContactDetailsByIds } from "../../services/ContactService";


export default function EmployerDetails() {
  const caseListProps = {
    title: "Related Cases",
  };

  const [recentCases, setrecentCases] = useState([]);

  const [searchColumn] = useState("employerid");

  const relatedCaseList = async (output) => {
    console.log('output id is', output.id)
    let recentCases = await searchCases(
      output.id,
      "employerid",
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

    console.log('case results', searchResultCases)

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

    let contacts = await searchResultCases?.reduce(function (pV, cV) {
      pV.push(parseInt(cV.contactid));
      return pV;
    }, []);

    let contactsList =
    contacts.length > 0
      ? await getContactDetailsByIds(contacts)
      : [];

    let contactsKey = new Map<string, string>();
      contactsList?.map((contact) => {
        contactsKey.set(
          contact.id,
          contact.firstname + " " + contact.lastname
        );
      });

    searchResultCases = searchResultCases?.map((element) => {
      element.contactname = contactsKey.get(element.contactid)
      element.individualname = individualsKey.get(element.individualid);
      return element;
    });

    setrecentCases(searchResultCases);
  };

  const location = useLocation();
  const [employer, setEmployer] = useState({
    id: 0,
    name: "",
    worksafenumber: 0,
    phonenumber: 0,
    email: "",
    locations: [""],
  });

  const fetchEmployerDetails = async () => {
    var matches = location.pathname.match(/(\d+)/);
    if (matches && matches[0]) {
      const employer = await getEmployerDetails(matches[0])
      console.log('employer is', employer)
      setEmployer(employer)
      // relatedCaseList(employer)
    }
  }

  useEffect(() => {
    fetchEmployerDetails();
  }, []);

  // useEffect(() => {
  //   setDataForBreadCrumbs([
  //     { text: "Home", link: "/private" },
  //     { text: "Contact", link: "/private/contacts" },
  //     {
  //       text: "Contact ID : " + contact.id,
  //       link: "/private/contacts/" + contact.id + "details",
  //     },
  //   ]);
  // }, [contact]);

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
          <Typography>{employer.worksafenumber}</Typography>
        </div>

        <div className="lob-detail-name">
          <Typography variant="subtitle1">Phone Number</Typography>
          <Typography>{employer.phonenumber}</Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Email Address</Typography>
          <Typography>{employer.email}</Typography>
        </div>
      </div>
      {employer.locations && employer.locations.length > 0 && employer.id != 0 && (
        <div className="recent-cases">
          <LocationsList locations={employer.locations}/>
        </div>
      )}
      {/* <div className="recent-cases">
        <CaseList
          config={caseListProps}
          allRecentCases={recentCases}
        ></CaseList>
      </div> */}
    </>
  );
}
