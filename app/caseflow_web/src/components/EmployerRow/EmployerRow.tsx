import React from "react";
import {
  Typography,
  Box,
  Grid,
  Divider,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Employer } from "../../interfaces/componentInterface";
import './employerrow.scss'
export default function EmployerRow(props) {
  const employer: Employer = props.employer;
  const navigate = useNavigate();
  const viewEmployerDetails = async (employer) => {
    navigate("/private/employers/" + employer.id + "/details");
  };
  return (
    <>
      <ListItemButton sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid container spacing={1} onClick={() => {
            viewEmployerDetails(employer);
          }}>
          <Grid item xs={2}>
            <ListItemText
              className="caseName-case-list"
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {employer.id}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              className="caseName-case-list"
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {employer.worksafenumber}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              className="caseName-case-list"
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {employer.name}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              className="caseName-case-list"
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {employer.phonenumber}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              className="caseName-case-list"
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {employer.email}{" "}
                </Typography>
              }
            />
          </Grid>
          {/* <Grid
            item
            xs={2}
            display="flex"
            justifyContent="flex-start"
            flexWrap="wrap"
            gap={1}
          >
            {employer.contacts.map((contact) => (
              <Box>
                <Typography className="recent-contact-card-status">
                  <div className="recent-contact-card-status-text">
                    {contact}
                  </div>
                </Typography>
              </Box>
            ))}
          </Grid> */}
          <Grid
            item
            xs={2}
            display="flex"
            alignItems=""
            justifyContent="flex-start"
            flexWrap="wrap"
            gap={1}
          >
            {employer.locations.map((location) => (
              <Box>
                <Typography className="location-box">
                  <div className="location-text">
                    {`${location.address}, ${location.city}, BC`}
                  </div>
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </ListItemButton>
      <Divider sx={{ color: "E2E2E2" }} />
    </>
  );
}
