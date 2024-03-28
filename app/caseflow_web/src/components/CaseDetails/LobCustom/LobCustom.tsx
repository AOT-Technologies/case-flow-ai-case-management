import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import "./LobCustom.scss";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../interfaces/stateInterface";
import { getLobDetails } from "../../../services/LOBService";
import { setSelectedCaseLOBDetails } from "../../../reducers/newCaseReducer";
import { useNavigate } from "react-router";
import { getContactDetails, getContactsData } from "../../../services/ContactService";
import { getIndividualsData } from "../../../services/IndividualService";
import { setSelectedContact } from "../../../reducers/newContactReducer";
import { setSelectedIndividual } from "../../../reducers/newIndividualReducer";

const LobCustom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCase = useSelector((state: State) => state.cases.selectedCase);
  const selectedContact = useSelector((state: State) => state.contacts.selectedContact);
  const selectedIndividual = useSelector((state: State) => state.individuals.selectedIndividual);
  // const lobData = selectedCase.lobDetails;
  useEffect(() => {
    if (selectedCase.contactid) {
      getCaseContactDetails(selectedCase.contactid);
    }
  }, [selectedCase.contactid]);
  useEffect(() => {
    if (selectedCase.individualid) {
      getCaseIndividualDetails(selectedCase.individualid);
    }
  }, [selectedCase.individualid]);
  const getCaseContactDetails = async (contact) => {
    let searchContacts = await getContactsData(1, contact.split(" ")[0]);
    let contactDetails = searchContacts?.CaseflowContacts?.map((element) => {
      if(element.firstname+" "+element.lastname === contact) {
        return element
      } else return {}
    });
    dispatch(setSelectedContact(contactDetails));
  };
  const getCaseIndividualDetails = async (individual) => {
    let searchIndividuals = await getIndividualsData(1, individual.split(" ")[0]);
    let individualDetails = searchIndividuals?.CaseflowIndividuals?.map((element) => {
      if(element.firstname+" "+element.lastname === individual) {
        return element
      } else return {}
    });
    dispatch(setSelectedIndividual(individualDetails));
  };
  

  // const navigateToLob = () => {
  //   navigate("/private/lob/" + lobData.id + "/details");
  // };

  return (
    <>
    <>
      <Typography
        variant="body1"
        sx={{ margin: "3.5rem 0  1rem ", fontSize: 24 }}
      >
        Contact Details
      </Typography>
      <Divider sx={{ border: 1, color: "#606060" }} />
      {/* {selectedContact && selectedContact.id ? ( */}
      <div className="lob-custom-content-case-detail">
        <div>
          <Typography variant="subtitle1">Id</Typography>
          <Typography variant="subtitle1">{selectedContact[0]?.id}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1">{selectedContact[0]?.firstname} {selectedContact[0]?.lastname}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Phone No</Typography>
          <Typography variant="subtitle1">{selectedContact[0]?.phonenumber}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle1">{selectedContact[0]?.email}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Address</Typography>
          <Typography variant="subtitle1">{selectedContact[0]?.address}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
          {/* <div>
            <Typography
              variant="subtitle1"
              className="lob-record-link-upper-section"
            ></Typography>
            <Typography variant="body2">
              <Link
                onClick={navigateToLob}
                underline="always"
                style={{ color: "blue", cursor: "pointer" }}
              >
                LOB Record <LaunchIcon style={{ fontSize: ".875rem" }} />
              </Link>
            </Typography>
          </div> */}
        </div>
      {/* ) : (
        <Typography variant="body1" className="no-details-found">
          No Details Found!
        </Typography>
      )} */}
    </>
     <>
     <Typography
       variant="body1"
       sx={{ margin: "3.5rem 0  1rem ", fontSize: 24 }}
     >
       Individual Details
     </Typography>
     <Divider sx={{ border: 1, color: "#606060" }} />
     {/* {lobData && lobData.id ? ( */}
     <div className="lob-custom-content-case-detail">
     <div>
          <Typography variant="subtitle1">Id</Typography>
          <Typography variant="subtitle1">{selectedIndividual[0]?.id}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1">{selectedIndividual[0]?.firstname} {selectedIndividual[0]?.lastname}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Phone No</Typography>
          <Typography variant="subtitle1">{selectedIndividual[0]?.phonenumber}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle1">{selectedIndividual[0]?.email}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Address</Typography>
          <Typography variant="subtitle1">{selectedIndividual[0]?.address}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>

         {/* <div>
           <Typography
             variant="subtitle1"
             className="lob-record-link-upper-section"
           ></Typography>
           <Typography variant="body2">
             <Link
               onClick={navigateToLob}
               underline="always"
               style={{ color: "blue", cursor: "pointer" }}
             >
               LOB Record <LaunchIcon style={{ fontSize: ".875rem" }} />
             </Link>
           </Typography>
         </div> */}
       </div>
     {/* ) : (
       <Typography variant="body1" className="no-details-found">
         No Details Found!
       </Typography>
     )} */}
   </>
   </>
  );
};

export default LobCustom;
