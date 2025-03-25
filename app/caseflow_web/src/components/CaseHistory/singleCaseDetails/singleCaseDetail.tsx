import React, { useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./SingleCaseDetail.scss";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { State } from "../../../interfaces/stateInterface";

const SingleCaseDetail = ({ caseHistoryData, userInfo, progress }) => {
  let date = caseHistoryData.date.split(" ");
  const [expand, setExpand] = useState(false);
  const caseNotes = useSelector((state: State) => state.cases.selectedCase.notes);
  const expandDetailhandler = () => {
    setExpand((prevState) => {
      return !prevState;
    });
  };

  const getNote = () => {
    let note = caseNotes.find(note=>note.id == caseHistoryData.artifactId);
    return (note && note["notetext"]) ? note["notetext"] : "";
  }

  const getType = () => {
    try {
      let note = caseNotes.find(note=>note.id == caseHistoryData.artifactId);
      if (note && note["notetext"] && note["notetext"].includes("Activity Added:")) {
        return "Activity Added"
      } else if (note && note["notetext"] && note["notetext"].includes("Email received from")) {
        return "Email - Received"
      } else if (note && note["notetext"] && note["notetext"].includes("Email sent to")) {
        return "Email - Sent"
      }
      return caseHistoryData.caseHistoryType
    } catch {
      return caseHistoryData.caseHistoryType
    }
  }
  return (
    <div className="case-grid-container">
      <span className="case-grid-date">
        {date[0]}
        <br />
        {date[1]}
      </span>
      {progress ? (
        <span className="case-grid-line">
          <Typography
            sx={{ backgroundColor: "#404040" }}
            className="case-grid-line-ball"
          ></Typography>
        </span>
      ) : (
        <span className="case-grid-line" style={{ borderLeft: "None" }}>
          <Typography
            sx={{ backgroundColor: "#404040" }}
            className="case-grid-line-ball"
            style={{ right: "-9.9px" }}
          ></Typography>
        </span>
      )}
      <span className="case-gird-details">
        <h3 onClick={expandDetailhandler} className="case-gird-details-header">
          {/* <span>{caseHistoryData.caseHistoryType}</span> */}
          <span>{getType()}</span>

          {expand ? (
            <KeyboardArrowUpRoundedIcon />
          ) : (
            <KeyboardArrowDownRoundedIcon />
          )}
        </h3>
        {expand && (
          <div>
            {/* Quick workaround for demo for displaying email content */}
            <p style={{ whiteSpace: "pre-line"}}>{( caseNotes && caseNotes.length && (caseHistoryData.eventtypeId == 4 || caseHistoryData.eventtypeId == 14 || caseHistoryData.eventtypeId == 15)) ? getNote() : (caseHistoryData.caseHistoryWorkflowType ? caseHistoryData.caseHistoryWorkflowType : caseHistoryData.caseHistoryType)}</p>
            <p>User - {userInfo.userName}</p>
          </div>
        )}
      </span>
    </div>
  );
};

export default SingleCaseDetail;
