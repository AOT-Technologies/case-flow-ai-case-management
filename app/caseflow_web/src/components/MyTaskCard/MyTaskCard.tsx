import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { Link } from "@mui/material";
import CustomizedDialog from "../Dialog/Dialog";
import "react-datepicker/dist/react-datepicker.css";
import "./mytaskcard.scss";
import TaskDetailsPopUp from "./TaskDetailsPopup";

const MyTaskCard = (props) => {
  
  const [isTaskDetailsOpen, setOpenTaskDetailsPopup] = useState(false);
  
  const handleTaskDetailsView = ()=> {
    setOpenTaskDetailsPopup(true);
  };
  const handleTaskDetailsPopUpClose = async ()=> {
    setOpenTaskDetailsPopup(false);
  };
  return (
    <>
     <CustomizedDialog
        title={props.task?.name}
        isOpen={isTaskDetailsOpen}
        setIsOpen={setOpenTaskDetailsPopup}
        handleClose={handleTaskDetailsPopUpClose}
        fullWidth
      >
        <TaskDetailsPopUp taskId={props.task.id} handleClose={handleTaskDetailsPopUpClose}/>
      </CustomizedDialog>
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
                    onClick={handleTaskDetailsView}
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
                  {props.task?.description}{" "}
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
                  {props.task?.owner}{" "}
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
                  {props.task.due ? moment(props.task.due).format("MMMM Do, YYYY"):"NA"}{" "}
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
function dispatch(arg0: { payload: any; type: string; }) {
  throw new Error("Function not implemented.");
}

