import React, { useEffect, useState } from "react";
import { Button, Typography, FormControl, TextField } from "@mui/material";
import EmployerList from "../EmployerList/EmployerList";
import Search from "../Search/Search";
import "./employers.scss";
import { getAllEmployersData } from "../../services/EmployerService";
import CustomizedDialog from "../Dialog/Dialog";
import CreateEmployer from "../CreateEmployer/CreateEmployer";

export default function Employer() {
  const nothing = () => {};
  const [allEmployers, setAllEmployers] = useState([]);

  const getAllEmployers = async () => {
    const employers = await getAllEmployersData();
    setAllEmployers(employers);
  };

  const [isCreateEmployerOpen, setOpenCreateEmployerPopup] = useState(false);
  const handleCreateNewEmployer = ()=> {
    setOpenCreateEmployerPopup(true);
  };
  const handleCreateEmployerPopUpClose = () => {
    setOpenCreateEmployerPopup(false);
  };
  useEffect(() => {
    getAllEmployers();
  }, []);
  return (
    <>
      <CustomizedDialog
        title="Create Employer"
        isOpen={isCreateEmployerOpen}
        setIsOpen={setOpenCreateEmployerPopup}
        handleClose={handleCreateEmployerPopUpClose}
        fullWidth
      >
        <div className="workflow">
          <CreateEmployer closePopUp={handleCreateEmployerPopUpClose}/>
        </div>
      </CustomizedDialog>
      <div className="header-search">
        <Typography variant="body1" className="title">
          Employers
        </Typography>
        <div className="search">
          <Search
            setSearchField={nothing}
            dropDownArray={[]}
            setSearchColumn={() => {}}
            dropDownValues={nothing}
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
            onClick={handleCreateNewEmployer}
          >
            Create Employer
          </Button>
        </div>
      </div>
      <EmployerList employers={allEmployers} />
    </>
  );
}
