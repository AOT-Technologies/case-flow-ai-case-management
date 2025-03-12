import React from "react";
import {
  Typography,
  Box,
  Grid,
  Divider,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Employer } from "../../interfaces/componentInterface";
export default function EmployerRow(props) {
  const employer: Employer = props.employer;
  return (
    <>
      <ListItemButton sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid container spacing={1} onClick={() => {}}>
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
          <Grid item xs={3}>
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
                  {employer.worksafeNumber}{" "}
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
          <Grid
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
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexWrap="wrap"
            gap={1}
          >
            {employer.locations.map((location) => (
              <Box>
                <Typography className="recent-contact-card-status">
                  <div className="recent-contact-card-status-text">
                    {location}
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
