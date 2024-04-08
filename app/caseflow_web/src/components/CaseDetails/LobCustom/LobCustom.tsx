import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import "./LobCustom.scss";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../interfaces/stateInterface";
import { useNavigate } from "react-router";

const LobCustom = () => {
  const selectedContact = useSelector((state: State) => state.contacts.selectedContact);
  const selectedIndividual = useSelector((state: State) => state.individuals.selectedIndividual);
  

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
          <Typography variant="subtitle1">{selectedContact?.id}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1">{selectedContact?.firstname} {selectedContact?.lastname}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Phone No</Typography>
          <Typography variant="subtitle1">{selectedContact?.phonenumber}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle1">{selectedContact?.email}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Address</Typography>
          <Typography variant="subtitle1">{selectedContact?.address}</Typography>
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
          <Typography variant="subtitle1">{selectedIndividual?.id}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1">{selectedIndividual?.firstname} {selectedIndividual?.lastname}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Phone No</Typography>
          <Typography variant="subtitle1">{selectedIndividual?.phonenumber}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle1">{selectedIndividual?.email}</Typography>
          <Typography variant="body2" color="#606060">
            
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Address</Typography>
          <Typography variant="subtitle1">{selectedIndividual?.address}</Typography>
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
