import React from 'react'
import {
    Typography,
    Box,
    Grid,
    Divider,
    ListItemText,
    ListItem
  } from "@mui/material";
export default function LocationRow(props) {
    const location = props.location
    return (
        <>
        <ListItem sx={{ paddingInline: 0, paddingBlock: 2 }}>
          <Grid container spacing={1} >
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
                    {location.id}{" "}
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
                    {location.address}{" "}
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
                    {location.city}{" "}
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
                    BC{" "}
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
                    Canada{" "}
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </ListItem>
        <Divider sx={{ color: "E2E2E2" }} />
      </>
    )
}