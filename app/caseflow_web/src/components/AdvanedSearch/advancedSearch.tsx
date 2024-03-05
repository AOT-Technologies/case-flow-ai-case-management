import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  List,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./advancedSearch.scss";
import SearchIcon from "@mui/icons-material/Search";
import CaseList from "../CaseList/CaseList";
import IndividualList from "../IndividualList/IndividualList";
import ContactList from "../ContactList/ContactList";
import { Cases } from "../Cases/Cases";
import { searchCases } from "../../services/CaseService";
import { getIndividualsData} from "../../services/IndividualService";
import { getContactDetails } from "../../services/ContactService";
import { searchCaseDocument } from "../../services/DocumentManagementService";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import { setadvanceSearchResult } from "../../reducers/applicationReducer";
import { getLobData } from "../../services/LOBService";

import moment from "moment";
import { useNavigate } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";

export default function AdvancedSearch() {
  const [searchField, setSearchField] = useState("");
  const searchresults = useSelector(
    (state: State) => state.app.advanceSearchResult
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allSearch, setAllsearch] = useState(true);
  const [documentSearch, setDocumentsearch] = useState(false);
  const [caseSearch, setCasesearch] = useState(false);
  const [lobSearch, setLobsearch] = useState(false);
  const [individualSearch, setIndividualsearch] = useState(false);
  const [contactSearch, setContactsearch] = useState(false);
  const [fromDateForSearch, setFromDateForSearch] = useState(null);
  const [toDateForSearch, setToDateForSearch] = useState(null);
  const [showDate, setShowDate] = useState(false);

  // const caseListProps = {
  //   title: GENERIC_NAME,
  //   count: 5,
  //   isShowSort: false,
  //   pagination: true,
  // };

  const searchDetails = async () => {
    let result: any = [];
    let totalCount = 0;
    await Promise.all([
      (allSearch || caseSearch) &&
        searchCases(
          searchField,
          "name",
          1,
          "id",
          true,
          true,
          fromDateForSearch,
          toDateForSearch
        ).then((searchCaseResult) => {
          totalCount = totalCount + searchCaseResult.totalCount;
          searchCaseResult?.Cases.map((element) => {
            result.push({
              title: element.id + " - " + element.name,
              content: element.desc,
              subtitle: GENERIC_NAME,
              link: "/private/cases/" + element.id + "/details",
              imgIcon: require("../../assets/CasesIcon.png"),
            });
          });
        }),
      (allSearch || documentSearch) &&
        searchCaseDocument(
          searchField,
          "Name",
          "name",
          true,
          true,
          fromDateForSearch,
          toDateForSearch
        ).then((searchDocumentResult) => {
          totalCount = totalCount + searchDocumentResult.totalCount;
          searchDocumentResult?.CaseDocuments.map((element) => {
            result.push({
              title: element.id + " - " + element.name,
              content: element.desc,
              subtitle: "CaseDocuments",
              link: "",
              imgIcon: require("../../assets/DocumentsIcon.png"),
            });
          });
        }),
      (allSearch || individualSearch) &&
        getIndividualsData (
          0,
          searchField,
          "id",
          fromDateForSearch,
          toDateForSearch
        ).then((searchIndividualResult) => {
          totalCount = totalCount + searchIndividualResult?.totalCount;
          searchIndividualResult?.CaseflowLob.map((element) => {
            result.push({
              title: element.id + " - " + element.policyNumber,
              content: moment(element.createdDate).format("MMMM Do, YYYY"),
              subtitle: "Policy",
              link: "/private/lob/" + element.id + "/details",
              imgIcon: require("../../assets/AssignedIcon.png"),
            });
          });
        }),
      (allSearch || contactSearch) &&
        getContactDetails (
          "id",
        ).then((searchContactResult) => {
          totalCount = totalCount + searchContactResult?.totalCount;
          searchContactResult?.CaseflowLob.map((element) => {
            result.push({
              title: element.id + " - " + element.policyNumber,
              content: moment(element.createdDate).format("MMMM Do, YYYY"),
              subtitle: "Policy",
              link: "/private/lob/" + element.id + "/details",
              imgIcon: require("../../assets/ContactsIcon.png"),
            });
          });
        }),
    ]);

    dispatch(
      setadvanceSearchResult({ searchResult: result, totalCount: totalCount })
    );
  };
  // const testcase = [{
  //   id:1,
  //   name: 'testAaron',
  //   title: 'test'
  // }]

  // const testcontact = [{
  //   id:2,
  //   firstname: 'String',
  //   lastname: 'String',
  //   phonenumber: 1.000,
  //   email: 'String',
  //   dateofbirth: 'DateTime',
  //   address: 'String',
  //   createdat: 'DateTime'
  // }]

  const clearFilter = () => {
    setCasesearch(false);
    setAllsearch(true);
    setDocumentsearch(false);
    setLobsearch(false);
    setFromDateForSearch(null);
    setToDateForSearch(null);
    setShowDate(false);
  };

  useEffect(() => {
    searchDetails();
    console.log(searchresults);
  }, [
    searchField,
    fromDateForSearch,
    allSearch,
    documentSearch,
    caseSearch,
    lobSearch,
    toDateForSearch,
  ]);

  return (
    <>
      <div className="details-container">
        <div className="header-search">
          <Typography variant="body1" className="title">
            CaseFlow
          </Typography>
        </div>
        <div className="search-area-container">
          <Typography variant="h5">Advanced Search</Typography>

          <div className="search-bar-advanced-search">
            <OutlinedInput
              sx={{ width: "100%" }}
              id="standard-adornment-amount"
              placeholder="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchField(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
          <div>
            <Typography variant="caption" sx={{ fontSize: 8 }}>
              {searchresults?.totalCount} search results
            </Typography>
          </div>
          <FormControl>
            <Box sx={{ display: "flex", width: "100%" }}>
              <FormControlLabel
                control={
                  <Checkbox className="all-checkbox"
                    checked={allSearch}
                    onChange={() => {
                      setAllsearch(!allSearch);
                      if(!allSearch){
                        setCasesearch(false);
                        setDocumentsearch(false);
                        setLobsearch(false);
                      }

                    }}
                    defaultChecked
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={caseSearch}
                    onChange={() => {
                      setCasesearch(!caseSearch);
                      setAllsearch(false);
                      
                    }}
                  />
                }
                label={GENERIC_NAME}
              />
              <FormControlLabel
                control={
                  <Checkbox  className="documents-checkbox"
                    checked={documentSearch}
                    onChange={() => {
                      setDocumentsearch(!documentSearch);
                      setAllsearch(false);
                    }}
                  />
                }
                label="Documents"
              />
              <FormControlLabel
                control={
                  <Checkbox className="individual-checkbox"
                    checked={individualSearch}
                    onChange={() => {
                      setIndividualsearch(!individualSearch);
                      setAllsearch(false);
                    }}
                  />
                }
                label="Individual"
              />
              <FormControlLabel
                control={
                  <Checkbox className="contacts-checkbox"
                    checked={contactSearch}
                    onChange={() => {
                      setContactsearch(!contactSearch);
                      setAllsearch(false);
                    }}
                  />
                }
                label="Contacts"
              />
              <FormControlLabel
                control={
                  <Checkbox className="date-checkbox"
                    checked={showDate}
                    onChange={() => {
                      setShowDate(!showDate);
                      setFromDateForSearch(null);
                      setToDateForSearch(null);
                    }}
                  />
                }
                label="Date"
              />

              {showDate && (
                <>
                  <Box sx={{ mx: 4, width: "10rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="From Date"
                        inputFormat="YYYY-MM-DD"
                        value={fromDateForSearch}
                        onChange={(newValue) => {
                          setFromDateForSearch(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box sx={{ width: "10rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="To Date"
                        inputFormat="YYYY-MM-DD"
                        value={toDateForSearch}
                        onChange={(newValue) => {
                          setToDateForSearch(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </>
              )}
              <Button sx={{ ml: 2 }} onClick={clearFilter} variant="text">
                Clear
              </Button>
            </Box>
          </FormControl>
          <Box sx={{ overflow: "auto", height: "55vh" }}>
           {/* {searchresults?.searchResult.length ? searchresults?.searchResult.map((eachValue) => ( 
            <Grid container key={eachValue.title}> 
                 <Grid item xs={0.5} sx={{ pt: "5vh" }}>  */}
            {caseSearch.valueOf() && (
                  <div>
                    <CaseList className="cases"
                      //sortSetting={sortSetting}
                      //setSortSetting={setSortSetting}
                      config={{}}
                      allRecentCases= {searchresults?.searchResult}
                    ></CaseList> 
                  </div>
              )}
               {documentSearch.valueOf() && (
                  <div>
                    <li className="documents"
                      //  sortSetting={sortSetting}
                      //  setSortSetting={setSortSetting}
                      //  config={{}}
                      //  allRecentContacts={searchresults?.searchResult}
                  ></li>
                  </div>
              )}
              {individualSearch.valueOf() && (
                  <div>
                    <IndividualList className="individuals"
                       //sortSetting={sortSetting}
                       //setSortSetting={setSortSetting}
                       config={{}}
                       allRecentIndividuals={searchresults?.searchResult}
                  ></IndividualList>
                  </div>
              )}
              {contactSearch.valueOf() && (
                  <div>
                    <ContactList className="contacts"
                       //sortSetting={sortSetting}
                       //setSortSetting={setSortSetting}
                       config={{}}
                       allRecentContacts={searchresults?.searchResult}
                  ></ContactList>
                  </div>
              )}
                   {/* <img
                    alt="Tasksicon"
                    src={eachValue.imgIcon}
                    style={{ height: "1rem" }}
                  ></img>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <Typography
                      variant="body1"
                      sx={{
                        pt: 4,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      color="#002EFF"
                      onClick={() => {
                        navigate(eachValue.link);
                      }}
                    >
                      {eachValue.title}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: 8 }}>
                      {eachValue.subtitle}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: 14 }}
                      gutterBottom
                    >
                      {eachValue.content}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            )): */}
            <Typography variant="body1" className="no-details-found">
            No Result Found!
          </Typography>
          {/* }  */}
          </Box>
        </div>

        {/* <div className="filter-area-container">
<SearchFilters />
  </div> */}
      </div>
    </>
  );
}
