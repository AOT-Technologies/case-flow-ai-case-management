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
export default function EmployerList(props) {
  const employers: Employer[] = props.employers

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
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-contact-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Worksafe Num
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
                  Phone
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
                  Email
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

        {employers && employers.length != 0 ? (
          employers.map((employer: Employer) => (
            <EmployerRow key={employer.id} employer={employer} />
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
