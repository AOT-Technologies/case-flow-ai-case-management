import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./individuals.scss";
import IndividualList from "../IndividualList/IndividualList";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../interfaces/stateInterface";
//import { searchContacts } from "../../services/ContactService";
// import {
//   setTotalContactCount,
//   setsearchContactResult,
// } from "../../reducers/newContactReducer";
import { Button, FormControl, InputLabel, Select, TextField, Typography } from "@mui/material";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
import { useNavigate } from "react-router";
import CustomizedDialog from "../Dialog/Dialog";
const individualsListProps = {
  title: GENERIC_NAME,
  count: 5,
  isShowSort: false,
  pagination: true,
};
const Individuals = () => {
  const [filteredIndividualDetails, setFilteredIndividualDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  
  const [isCreateIndividualOpen, setOpenCreateIndividualPopup] = useState(false);
  const [sortSetting, setSortSetting] = useState({
    orderBy: "id",
    orderType: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPage = 1;
//   const searchResults = useSelector(
//     (state: State) => state.individuals.searchCndividualResult
//   );

//   const filterDocumentDetails = async () => {
//     let searchResult = await searchIndividuals(
//       searchField,
//       searchColumn,
//       selectedPage,
//       sortSetting.orderBy,
//       sortSetting.orderType,
//       false,
//       null,
//       null
//     );
//     let searchResultIndividuals = searchResult.Individuals?.map((element) => {
//       return { ...element, status: "Open" };
//     });

//     if (searchResultIndividuals) setFilteredIndividualDetails(searchResultIndividuals);
//     dispatch(setTotalIndividualsCount(searchResult.totalCount));
//   };

//   const searchIndividualssDetails = async () => {
//     let searchResult = await searchIndividuals(
//       searchField,
//       searchColumn,
//       selectedPage,
//       sortSetting.orderBy,
//       sortSetting.orderType,
//       true,
//       null,
//       null
//     );
//     let searchResultIndividuals = searchResult.Individuals?.map((element) => {
//       return {
//         title: element.id + " - " + element.name,
//         content: element.desc,
//         subtitle: GENERIC_NAME,
//         link: "/private/individuals/" + element.id + "/details",
//         imgIcon: require("../../assets/IndividualsIcon.png"),
//       };
//     });

//     if (searchResultIndividuals) {
//       console.log({
//         searchResultIndividuals: searchResultIndividuals,
//         totalCount: searchResult.totalCount,
//       });
//       dispatch(
//         setsearchIndividualResult({
//           searchResult: searchResultIndividuals,
//           totalCount: searchResult.totalCount,
//         })
//       );
//     }
//   };

//   useEffect(() => {
//     filterDocumentDetails();
//   }, [selectedPage, sortSetting]);

//   useEffect(() => {
//     searchIndividualsDetails();
//   }, [searchField, searchColumn]);

const handleCreatNewIndividual = ()=> {
    setOpenCreateIndividualPopup(true);
  };
  const handleCreateIndividualsPopUpClose = ()=> {
    setOpenCreateIndividualPopup(false);
  };
  return (
    <>
    <CustomizedDialog
        title="Create Individual"
        isOpen={isCreateIndividualOpen}
        setIsOpen={setOpenCreateIndividualPopup}
        handleClose={handleCreateIndividualsPopUpClose}
        fullWidth
      >
        <div className="workflow">
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
          <div className="lob-custom-content-case-detail">
             <div>
                <Typography variant="subtitle1" >First Name</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Last Name</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Phone Number</Typography>
                <TextField
                    id="outlined-multiline-flexible"/>
            </div>
            <div>
                <Typography variant="subtitle1">email</Typography>
                <TextField
                    id="outlined-multiline-flexible"/>
            </div>
            <div>
                <Typography variant="subtitle1">Address</Typography>
                <TextField
                    id="outlined-multiline-flexible"
                    sx={{marginRight: 1}}
                    />
            </div>
            <div>
                <Typography variant="subtitle1">Date Of Birth</Typography>
                <TextField
                    id="outlined-multiline-flexible"/>
            </div>
        </div>
        
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                borderColor: "primary.main",
              }}
            //   onClick={submitNote}
            >
              Save
            </Button>
          </FormControl>
        </div>
      </CustomizedDialog>
      <section className="dashboard">
      <div className="header-search">
        <Typography variant="body1" className="title">
          Individuals
        </Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
            dropDownValues={{}}
          ></Search>
        </div>
        <div className="search">
            <Button
                variant="contained"
                className="btn-navigation-style"
                style={{
                    width: "206px",
                    margin: ".7rem auto 0",
                    borderRadius: "8px",
                    transition: "all 1s ease",
                }}
                sx={{ backgroundColor: "primary.main" }}
                onClick={handleCreatNewIndividual}
                >
                Create Individual
            </Button>
            
        </div>
      </div>
      <div className="recent-individual">
        <IndividualList
          sortSetting={sortSetting}
          setSortSetting={setSortSetting}
          config={{}}
          allRecentIndividuals={filteredIndividualDetails}
        ></IndividualList>
      </div>
    </section>
    </>
  );
};

export default Individuals;