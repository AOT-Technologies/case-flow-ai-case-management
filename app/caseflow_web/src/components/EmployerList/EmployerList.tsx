import React from "react";
import {
  Typography,
  List,
  Divider,
  ListItem,
  ListItemText,
  Grid,
  Pagination,
} from "@mui/material";
import EmployerRow from "../EmployerRow/EmployerRow";
import { Employer } from "../../interfaces/componentInterface";
export default function EmployerList() {
  const employers = [
    {
      id: 1,
      worksafeNumber: 123,
      name: "Business1",
      contacts: ["John Smith", "Jeff Doe"],
      locations: ["123 Real Rd.", "456 5th St.", "456 7th St."],
    },
    {
      id: 2,
      worksafeNumber: 456,
      name: "Business2",
      //   contacts: ["Mary Smith", "Jane Doe"],
      contacts: [],
      locations: ["456 Fake Rd.", "789 4th St."],
    },
    {
      id: 3,
      worksafeNumber: 789,
      name: "Business3",
      contacts: ["Steven Smith", "Greg Doe"],
      //   locations: ["111 Victoria Rd.", "333 3rd St."],
      locations: [],
    },
    {
      id: 4,
      worksafeNumber: 124,
      name: "Business4",
      contacts: ["Jessica Smith", "Sarah Doe"],
      locations: ["777 Lucky Rd.", "123 ABC St."],
    },
  ];

  return (
    <div style={{ padding: "2rem 4rem 0rem 4rem" }}>
      <List>
        <Grid container spacing={1} sx={{ paddingBottom: 1.5 }}>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-contact-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Employer ID
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-contact-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Worksafe Number
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-individual-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Name
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-contact-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Contacts
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-contact-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Locations
                </Typography>
              }
            />
          </Grid>
        </Grid>
        <Divider sx={{ border: 1, color: "#606060" }} />

        {employers.length != 0 ? (
          employers.map((employer: Employer) => (
            <EmployerRow employer={employer} />
          ))
        ) : (
          <ListItem>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ListItemText>
                  <Typography variant="body1" align="center">
                    {" "}
                    No Recent {" " + "Employers" + " "} Found!{" "}
                  </Typography>
                </ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        )}
      </List>
    </div>
  );
}
