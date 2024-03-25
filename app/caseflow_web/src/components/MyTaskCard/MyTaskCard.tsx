import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { Link } from "@mui/material";
import { FORMSFLOW_WEB_URL } from "../../apiManager/endpoints/config";

const MyTaskCard = (props) => {
  console.log(props);
  return (
    <>
      <ListItem
        button
        sx={{ paddingInline: 0, paddingTop: 1.3, paddingBottom: 2 }}
      >
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingTop: "7px",
                  }}
                >
                  {" "}
                  <Link
                    target="_blank"
                    href={FORMSFLOW_WEB_URL + `/task/${props.task.id}`}
                  >
                    {" "}
                    {props.task.name}{" "}
                  </Link>{" "}
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
                    paddingTop: "7px",
                  }}
                >
                  {moment(props.task.created).format("MMMM Do, YYYY")}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingTop: "7px",
                  }}
                >
                  {props.task.description}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={1.5}>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  noWrap
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingTop: "7px",
                  }}
                >
                  {props.task.owner}{" "}
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
                    paddingTop: "7px",
                  }}
                >
                  {moment(props.task.due).format("MMMM Do, YYYY")}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={1.5}>
            <Typography className="recent-case-card-status">
              <div className="recent-case-card-status-text">Active</div>
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default MyTaskCard;
