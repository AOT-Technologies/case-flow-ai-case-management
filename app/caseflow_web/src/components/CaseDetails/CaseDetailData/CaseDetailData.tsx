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
  contactName: String;
  individual: String;
  startDate: any;
  owner: String;
  caseDescription: String;
  tasks: any;
  dueDate: any;
  city: String;
  province: String;
  additionalInfo: String;
}

const CaseDetailData = ({
  contactName,
  individual,
  startDate,
  owner,
  caseDescription,
  tasks,
  dueDate,
  city,
  province,
  additionalInfo,
}: CaseDetailDataProps) => {
  return (
    <>
      <div className="case-details">
        <div className="case-detail-name">
          <Typography variant="subtitle1">Contact name</Typography>
          <Typography variant="body2">Samuel James</Typography>
        </div>
        <div className="case-detail-name">
          <Typography variant="subtitle1">Individual</Typography>
          <Typography variant="body2">Shruti James</Typography>
        </div>
        <div className="case-detail-date">
          <Typography variant="subtitle1">Start Date</Typography>

          <Typography variant="body2">
          <Typography variant="body2">2024-02-14</Typography>
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1">
              {GENERIC_NAME} Description
            </Typography>
          <Typography variant="body2">Request for 50-50 Child custody</Typography>
        </div>
        <div className="case-detail-owner">
          <Typography variant="subtitle1">Owner</Typography>
          <Typography variant="body2">{owner}</Typography>
        </div>
        <div className="case-detail-date">
        <Typography variant="subtitle1">Due Date</Typography>
        <Typography variant="body2">2025-02-14</Typography>

        </div>
        <div className="case-detail-city">
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="body2">Victoria</Typography>
        </div>
        <div className="case-detail-province">
          <Typography variant="subtitle1">Province</Typography>
          <Typography variant="body2">BC</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">
              Additional Information
            </Typography>
          <Typography variant="body2">parent needs custody of the child</Typography>
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
