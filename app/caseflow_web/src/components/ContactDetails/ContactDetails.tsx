import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import "./ContactDetails.scss";
import moment from "moment";
import { getContactDetails, getContactDetailsByIds } from "../../services/ContactService";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../../reducers/newContactReducer";
import { Typography } from "@mui/material";
import CaseList from "../CaseList/CaseList";
import { fetchRecentCaseList, searchCases } from "../../services/CaseService";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
import { setsearchCaseResult } from "../../reducers/newCaseReducer";
import { getIndividualDetailsByIds } from "../../services/IndividualService";

const caseListProps = {
  title: "Related Cases",
};

const ContactDetail = () => {
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
    let individuals = await searchResultCases?.reduce(function(pV, cV){
      pV.push(parseInt(cV.individualid));
      return pV;
    }, []);
    let individualList = individuals ? await getIndividualDetailsByIds(individuals):[];
    
    
    let individualsKey = new Map<string, string>();
    individualList?.map(individual=>{
      individualsKey.set(individual.id, individual.firstname+' '+individual.lastname);
    })
    

    searchResultCases = searchResultCases?.map((element) => {
      element.contactname=output.firstname+' '+output.lastname;
      element.individualname=individualsKey.get(element.individualid);
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
          Contact: {contact.firstname}  {contact.lastname}
        </Typography>
      </section>
      <div className="lob-detail-row">
        <div className="lob-detail-name">
          <Typography variant="subtitle1">First Name</Typography>
          <Typography>{contact.firstname}</Typography>
        </div>

        <div className="lob-detail-name">
          <Typography variant="subtitle1">Last Name</Typography>
          <Typography>
            {contact.lastname}
          </Typography>
        </div>
        <div className="lob-detail-date">
          <Typography variant="subtitle1">Date Of Birth</Typography>
          <Typography>
            {moment(contact.dateofbirth).format("MMMM Do, YYYY")}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Address</Typography>
          <Typography>
            {contact.address}
          </Typography>
        </div>
       
      </div>
      <div className="lob-detail-row">
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Phone Number</Typography>
          <Typography>
            {contact.phonenumber}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Email</Typography>
          <Typography>{contact.email}</Typography>
        </div>

       
        <div className="lob-detail-date">
          <Typography variant="subtitle1">Created At</Typography>
          <Typography>
            {moment(contact.createdat).format("MMMM Do, YYYY")}
          </Typography>
        </div>
        <div className="lob-detail-name">
          <Typography variant="subtitle1">Id</Typography>
          <Typography>
            {contact.id}
          </Typography>
        </div>
      </div>
      <div className="recent-cases">
        <CaseList
          config={caseListProps}
          allRecentCases={recentCases}
        ></CaseList>
      </div>
    </>
  );
};

export default ContactDetail;
