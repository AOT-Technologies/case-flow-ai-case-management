import React from "react";
import {
  Typography,
  List,
  Grid,
  ListItemText,
  Divider,
  ListItem,
} from "@mui/material";
import LocationRow from "../LocationsRow/LocationsRow";
export default function LocationsList(props) {
  const locations = props.locations;
  return (
    <div style={{ padding: "4rem 4rem 0rem 4rem" }}>
      <span className="recent-case-header">
        <Typography variant="h6" className="recent-case-header-font ">
          Locations
        </Typography>
      </span>

      <List>
        <Grid container spacing={1} sx={{ paddingBottom: 1.5 }}>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  ID
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Address
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  City
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Province
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                >
                  Country
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                  sx={{ cursor: "pointer" }}
                >
                  Postal Code
                </Typography>
              }
            />
          </Grid>
        </Grid>

        <Divider sx={{ border: 1, color: "#606060" }} />
        {locations.map(location => (
            <LocationRow location={location} />
        ))}
      </List>
    </div>
  );
}
