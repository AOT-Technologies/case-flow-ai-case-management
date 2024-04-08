import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./cases.scss";
import CaseList from "../CaseList/CaseList";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import { searchCases } from "../../services/CaseService";
import { ToastContainer, toast } from "react-toastify";
import {
  setTotalCaseCount,
  setsearchCaseResult,
} from "../../reducers/newCaseReducer";
import { Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
import { getContactDetailsByIds } from "../../services/ContactService";
import { getIndividualDetailsByIds } from "../../services/IndividualService";
const caseListProps = {
  title: GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: true,
};


const Cases = () => {
  const [filteredCaseDetails, setFilteredCaseDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("other");
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  const [sortSetting, setSortSetting] = useState({
    orderBy: "id",
    orderType: true,
  });

  const dispatch = useDispatch();
  const selectedPage = useSelector((state: State) => state.cases.pageSelected);
  const searchResults = useSelector(
    (state: State) => state.cases.searchCaseResult
  );

  const filterDocumentDetails = async () => {
    let searchResult = await searchCases(
      searchField,
      searchColumn,
      selectedPage,
      sortSetting.orderBy,
      sortSetting.orderType,
      false,
      null,
      null
    );
    
    let searchResultCases = searchResult.Cases?.map((element) => {
      return { ...element, status: "Open" };
    });
    let contacts = await searchResultCases.reduce(function(pV, cV){
      pV.push(parseInt(cV.contactid));
      return pV;
    }, []);
    let individuals = await searchResultCases.reduce(function(pV, cV){
      pV.push(parseInt(cV.individualid));
      return pV;
    }, []);
    let contactList = await getContactDetailsByIds(contacts);
    let individualList = await getIndividualDetailsByIds(individuals);
    
    let contactsKey = new Map<string, string>();
    contactList.map(contact=>{
      contactsKey.set(contact.id, contact.firstname+' '+contact.lastname);
    })
    
    let individualsKey = new Map<string, string>();
    individualList.map(individual=>{
      individualsKey.set(individual.id, individual.firstname+' '+individual.lastname);
    })

    searchResultCases = searchResultCases.map((element) => {
      element.contactname=contactsKey.get(element.contactid);
      element.individualname=individualsKey.get(element.individualid);
      return element;
    });
    
    if (searchResultCases) setFilteredCaseDetails(searchResultCases);
    dispatch(setTotalCaseCount(searchResult.totalCount));
  };

  const searchCasesDetails = async () => {
    let searchResult = await searchCases(
      searchField,
      searchColumn,
      selectedPage,
      sortSetting.orderBy,
      sortSetting.orderType,
      true,
      null,
      null
    );
    let searchResultCases = searchResult.Cases?.map((element) => {
      return {
        title: element.id + " - " + element.issuetype,
        content: 'Owner: '+element.caseowner,
        subtitle: GENERIC_NAME,
        link: "/private/cases/" + element.id + "/details",
        imgIcon: require("../../assets/CasesIcon.png"),
      };
    });

    if (searchResultCases) {
      dispatch(
        setsearchCaseResult({
          searchResult: searchResultCases,
          totalCount: searchResult.totalCount,
        })
      );
    }
  };

  useEffect(() => {
    filterDocumentDetails();
  }, [selectedPage, sortSetting]);

  useEffect(() => {
    searchCasesDetails();
  }, [searchField, searchColumn]);

  return (
    <section className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          CaseFlow
        </Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
            dropDownValues={searchResults}
          ></Search>
        </div>
      </div>
      <div className="recent-cases">
        <CaseList
          sortSetting={sortSetting}
          setSortSetting={setSortSetting}
          config={caseListProps}
          allRecentCases={filteredCaseDetails}
        ></CaseList>
      </div>
    </section>
  );
};

export default Cases;
