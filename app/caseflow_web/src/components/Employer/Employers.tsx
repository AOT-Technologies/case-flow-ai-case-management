import React, { useEffect, useState } from "react";
import { Button, Typography, FormControl, TextField } from "@mui/material";
import EmployerList from "../EmployerList/EmployerList";
import Search from "../Search/Search";
import "./employers.scss";
import { getAllEmployersData } from "../../services/EmployerService";
import CustomizedDialog from "../Dialog/Dialog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateEmployer from "../CreateEmployer/CreateEmployer";
export default function Employer() {
  const nothing = () => {};
  const createNewContact = () => {return 1}
  const [allEmployers, setAllEmployers] = useState([]);

  const getAllEmployers = async () => {
    const employers = await getAllEmployersData();
    setAllEmployers(employers);
  };

  const navigate = useNavigate();

  const createContact = async () => {
    let response = await createNewContact(
    //   {
    //   firstname,
    //   lastname,
    //   phonenumber,
    //   email,
    //   dateofbirth,
    //   address,
    // }
  );
    if (response) {
      setOpenCreateContactPopup(false);
      await toast.success("Contact created succesfully!");
      navigate("/private/contacts/" + response + "/details");
    } else {
      toast.error("Failed to  add the note. Please try again!");
    }
  };

  const [filteredContactDetails, setFilteredContactDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [firstname, setFirstname]: any = useState();
  const [lastname, setLastname]: any = useState();
  const [phonenumber, setPhonenumber]: any = useState();
  const [email, setEmail]: any = useState();
  const [dateofbirth, setDateofbirth]: any = useState();
  const [address, setAddress]: any = useState();
  const [dropDownArray, setdropDownArray] = useState(["Name", "Description"]);
  const [isCreateContactOpen, setOpenCreateContactPopup] = useState(false);
  const [sortSetting, setSortSetting] = useState({
    orderBy: "id",
    orderType: true,
  });
  const handleCreatNewContact = ()=> {
    setOpenCreateContactPopup(true);
  };
  const handleCreateContactsPopUpClose = () => {
    setOpenCreateContactPopup(false);
  };
  useEffect(() => {
    getAllEmployers();
  }, []);
  return (
    <>
      <CustomizedDialog
        title="Create Employer"
        isOpen={isCreateContactOpen}
        setIsOpen={setOpenCreateContactPopup}
        handleClose={handleCreateContactsPopUpClose}
        fullWidth
      >
        <div className="workflow">
          {/* <FormControl>
            <div className="lob-custom-content-case-detail">
              <div>
                <Typography variant="subtitle1">Employer Name</Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  sx={{ marginRight: 1 }}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <Typography variant="subtitle1">WorkSafeBC Number</Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  sx={{ marginRight: 1 }}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <Typography variant="subtitle1">Phone Number</Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  sx={{ marginRight: 1 }}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </div>
              <div>
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  sx={{ marginRight: 1 }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Typography variant="subtitle1">Address</Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  sx={{ marginRight: 1 }}
                  onChange={(e) => setAddress(e.target.value)}
                />
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
              onClick={createContact}
            >
              Save
            </Button>
          </FormControl> */}
          <CreateEmployer/>
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
            onClick={handleCreatNewContact}
          >
            Create Employer
          </Button>
        </div>
      </div>
      <EmployerList employers={allEmployers} />
    </>
  );
}
