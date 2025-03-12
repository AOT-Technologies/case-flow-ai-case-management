import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import EmployerList from "../EmployerList/EmployerList";
import Search from "../Search/Search";
import './employers.scss'

export default function Employer() {
  const nothing = () => {};
  return (
    <>
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
            onClick={nothing}
          >
            Create Employer
          </Button>
        </div>
      </div>
      <EmployerList/>
    </>
  );
}
