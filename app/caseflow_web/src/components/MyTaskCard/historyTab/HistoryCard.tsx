import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Link, Typography } from "@mui/material";
import "../../../styles.scss";
import CustomizedDialog from "../../Dialog/Dialog";
import { Form as FormIOForm } from "react-formio";
import { getFormDetailsByFormAndSubmmisionId, getFormDetailsById } from "../../../services/formsService";

const HistoryCard = (props) => {

  const [isTaskHistoryOpen, setOpenTaskHistoryPopup] = useState(false);
  const [taskFormDetails, setTaskFormDetails] = useState({})
  const [taskFormMetaDetails, setTaskFormMetaDetails] = useState({})
  const handleTaskHistoryPopUpClose = ()=> {
    setOpenTaskHistoryPopup(false);
  };
  const openTaskHistory = async () =>{
    const formDetails = await getFormDetailsById( props?.history?.formId);
    setTaskFormDetails(formDetails)
    const formMetadata = await getFormDetailsByFormAndSubmmisionId( props?.history?.formId,  props?.history?.submissionId);
    setTaskFormMetaDetails(formMetadata)
    setOpenTaskHistoryPopup(true);
  }
  return (
    <>
    <CustomizedDialog
        title=""
        isOpen={isTaskHistoryOpen}
        setIsOpen={setOpenTaskHistoryPopup}
        handleClose={handleTaskHistoryPopUpClose}
        fullWidth
      >
        <FormIOForm
            form={taskFormDetails}
            submission={taskFormMetaDetails}
          Disabled
                  />
      </CustomizedDialog>
      <ListItem button sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid
          container
          spacing={1}
        >
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
                  { props?.history?.applicationStatus}{" "}
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
                  {props?.history?.created}{" "}
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
                  {props?.history?.submittedBy}{" "}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
            onClick={openTaskHistory}
              primary={
                <Link target="_blank">
                  View Submission
                </Link>
              }
            />
         </Grid>   
        </Grid>
      </ListItem>
      <Divider sx={{ color: "E2E2E2" }} />
    </>
  );
};

export default HistoryCard;
