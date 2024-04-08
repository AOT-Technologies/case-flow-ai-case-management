import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./dashboard.scss";
import CaseList from "../CaseList/CaseList";
import MyTask from "../MyTask/MyTask";
import { fetchRecentCaseList, searchCases } from "../../services/CaseService";
import { Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
import { useDispatch, useSelector } from "react-redux";
import { setsearchCaseResult } from "../../reducers/newCaseReducer";
import { State } from "../../interfaces/stateInterface";
import { getContactDetailsByIds } from "../../services/ContactService";
import { getIndividualDetailsByIds } from "../../services/IndividualService";

const caseListProps = {
  title: "Recent " + GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: false,
};

const Dashboard = () => {
  const [recentCases, setrecentCases] = useState([]);

  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  
  const dispatch = useDispatch();
  const searchResults = useSelector(
    (state: State) => state.cases.searchCaseResult
  );

  const searchCasesDetails = async () => {
    let searchResult = await searchCases(
      searchField,
      searchColumn,
      1,
      "id",
      true,
      true,
      null,
      null
    );
    let searchResultCases = searchResult.Cases?.map((element) => {
      return {
        title: element.id + " - " + element.issuetype,
        content: 'Owner: '+ element.caseowner,
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

  const recentCaseList = async () => {
    let recentCases = await fetchRecentCaseList();
    let contacts = await recentCases.reduce(function(pV, cV){
      pV.push(parseInt(cV.contactid));
      return pV;
    }, []);
    let individuals = await recentCases.reduce(function(pV, cV){
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
    recentCases = recentCases.filter((element, index) => {
      element.contactname=contactsKey.get(element.contactid);
      element.individualname=individualsKey.get(element.individualid);
      return index < 5;
    });
    
    setrecentCases(recentCases);
  };

  useEffect(() => {
    recentCaseList();
  }, []);
  useEffect(() => {
    searchCasesDetails();
  }, [searchField, searchColumn]);

  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  return (
    <div className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          CaseFlow
        </Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn} dropDownValues={searchResults}          ></Search>
        </div>
      </div>
      <div className="recent-cases">
        <CaseList
          config={caseListProps}
          allRecentCases={recentCases}
        ></CaseList>
      </div>
      <div className="my-task">
        <MyTask></MyTask>
      </div>
    </div>
  );
};

export default Dashboard;
