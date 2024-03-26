import { Link, Typography } from "@mui/material";
import React from "react";
import "./CaseDetailData.scss";
import {
  FORMSFLOW_APP_URL,
  FORMSFLOW_WEB_URL,
  GENERIC_NAME,
} from "../../../apiManager/endpoints/config";
import moment from "moment";
interface CaseDetailDataProps {
  contactid: String;
  individualid: String;
  startDate: any;
  owner: String;
  tasks: any;
  dueDate: any;
  email: String;
  caseowner: String;
  city: String;
  region: String;
  dateofbirth: any;
  describetheissue: String;
  resolutionsought: String;
  issuetype: String;
  phonenumber: String;
}

const CaseDetailData = ({
  contactid,
  individualid,
  startDate,
  owner,
  tasks,
  dueDate,
  email,
  caseowner,
  city,
  region,
  dateofbirth,
  describetheissue,
  resolutionsought,
  issuetype,
  phonenumber,
}: CaseDetailDataProps) => {
  return (
    <>
      <div className="case-details">
        <div className="case-detail-name">
          <Typography variant="subtitle1">Contact name</Typography>
          <Typography variant="body2">{contactid}</Typography>
        </div>
        <div className="case-detail-name">
          <Typography variant="subtitle1">Individual</Typography>
          <Typography variant="body2">{individualid}</Typography>
        </div>
        <div className="case-detail-email">
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="body2">{email}</Typography>
        </div>
        <div className="case-detail-phonenumber">
          <Typography variant="subtitle1">Phone Number</Typography>
          <Typography variant="body2">{phonenumber}</Typography>
        </div>
        <div className="case-detail-dateofbirth">
          <Typography variant="subtitle1">Date of Birth</Typography>
          <Typography variant="body2">{dateofbirth}</Typography>
        </div>
        {/* <div className="case-detail-date">
          <Typography variant="subtitle1">Start Date</Typography>

          <Typography variant="body2">
          <Typography variant="body2">{startDate}</Typography>
          </Typography>
        </div> */}
        <div className="case-detail-owner">
          <Typography variant="subtitle1">Owner</Typography>
          <Typography variant="body2">{caseowner}</Typography>
        </div>
        {/* <div className="case-detail-date">
        <Typography variant="subtitle1">Due Date</Typography>
        <Typography variant="body2">{dueDate}</Typography>

        </div> */}
        <div className="case-detail-city">
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="body2">{city}</Typography>
        </div>
        <div className="case-detail-province">
          <Typography variant="subtitle1">Region</Typography>
          <Typography variant="body2">{region}</Typography>
        </div>
        <div className="case-detail-issuetype">
          <Typography variant="subtitle1">Issue Type</Typography>
          <Typography variant="body2">{issuetype}</Typography>
        </div>
        <div className="case-detail-describetheissue">
          <Typography variant="subtitle1">Describe the Issue</Typography>
          <Typography variant="body2">{describetheissue}</Typography>
        </div>
        <div className="case-detail-resolutionsought">
          <Typography variant="subtitle1">Resolution Sought</Typography>
          <Typography variant="body2">{resolutionsought}</Typography>
        </div>
      </div>

      <div className="case-tasks">
        <Typography variant="subtitle1">
          Current Task{tasks?.length > 1 ? "s" : ""}
        </Typography>
        {tasks && tasks.length ? (
          tasks.map((task: any, index: any) => (
            <Link target="_blank" href={FORMSFLOW_WEB_URL + `/task/${task.id}`}>
              {" "}
              <Typography variant="body2" key={index}>
                {task.name}
              </Typography>
            </Link>
          ))
        ) : (
          <Typography variant="body2" style={{ "padding-bottom": "1rem" }}>
            No Tasks
          </Typography>
        )}
      </div>
    </>
  );
};

export default CaseDetailData;
