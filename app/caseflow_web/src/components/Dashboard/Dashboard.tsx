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
        content: element.individualid,
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
    recentCases = recentCases.filter((element, index) => {
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
