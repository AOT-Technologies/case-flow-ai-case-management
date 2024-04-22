import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./RelatedWorkflowActivities.scss";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../interfaces/stateInterface";
import moment from "moment";
import { Link } from "@mui/material";
import { FORMSFLOW_WEB_URL } from "../../apiManager/endpoints/config";
import { useNavigate } from "react-router";

export default function RelatedWorkflowActivities({ id, activitiesList }) {
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SelectedDocId = useSelector(
    (state: store) => state.documents.seletedDocument
  );
  const totalDocCount = useSelector(
    (state: store) => state.cases.selectedCase.totalDocCount
  );
  const userName = useSelector(
    (state: store) => state.auth.userDetails.userName
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        {activitiesList && activitiesList.length !== 0 ? (
          <Table
            sx={{ minWidth: 650, border: 0 }}
            aria-label="simple table"
            className="case-document-table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    color: "#404040",
                    fontSize: 16,
                    fontWeight: 600,
                    borderBottom: 2,
                    borderBottomColor: "#606060",
                    paddingLeft: 0,
                  }}
                >
                  Task Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#404040",
                    fontSize: 16,
                    fontWeight: 600,
                    borderBottom: 2,
                    borderBottomColor: "#606060",
                    paddingLeft: 0,
                  }}
                >
                  Creation Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#404040",
                    fontSize: 16,
                    fontWeight: 600,
                    borderBottom: 2,
                    borderBottomColor: "#606060",
                    paddingLeft: 0,
                  }}
                >
                  Form Name
                </TableCell>
                <TableCell
                 align="left"
                 sx={{
                   color: "#404040",
                   fontSize: 16,
                   fontWeight: 600,
                   borderBottom: 2,
                   borderBottomColor: "#606060",
                   paddingLeft: 0,
                 }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activitiesList.map((row: any, index) => (
                <TableRow key={row.id}>
                  <TableCell
                    sx={{
                      border: 0,
                      borderBottom: 1,
                      borderBottomColor: "#E2E2E2",
                      paddingInline: 0,
                    }}
                    align="left"
                  >
                    {row.status=='New' ? 
                  <Link
                    target="_blank"
                    href={FORMSFLOW_WEB_URL + `/task/${row.taskid}`}
                  >
                    {" "}
                    {row.taskname}{" "}
                  </Link> : row.taskname}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: 1,
                      borderBottomColor: "#E2E2E2",
                      paddingLeft: 0,
                    }}
                    align="left"
                  >
                    {moment(row.creationdate).format(
                      "YYYY-MM-DD"
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: 1,
                      borderBottomColor: "#E2E2E2",
                      paddingLeft: 0,
                    }}
                    align="left"
                  >
                    <Link
                    target="_blank"
                    href={row.formurl}
                  >
                    {" "}
                    {row.selectedform}{" "}
                  </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: 1,
                      borderBottomColor: "#E2E2E2",
                      paddingLeft: 0,
                    }}
                    align="left"
                  >
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1" className="no-case-doc-found">
            No Workflow Activities Found !
          </Typography>
        )}
      </TableContainer>
    </>
  );
}
