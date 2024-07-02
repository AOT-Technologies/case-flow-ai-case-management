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
import moment from "moment";
import CustomizedDialog from "../Dialog/Dialog";
import TaskDetailsPopUp from "../MyTaskCard/TaskDetailsPopup";
import { getFormDetailsByFormAndSubmmisionId, getFormDetailsById } from "../../services/formsService";
import { Form as FormIOForm } from "react-formio";
import { getFormIdSubmissionIdFromURL } from "../../services/formatterService";
import { getWorkflowActivities } from "../../services/workflowActivityService";

export default function RelatedWorkflowActivities({ activitiesList }) {
  const [workflowActivities, setWorkflowActivities] = useState<any>(activitiesList);
  const [isTaskDetailsPopupOpen, setIsTaskDetailsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow]=useState<any>({})
  const handleTaskDetailsView = async (row)=> {
    setSelectedRow(row);
    setIsTaskDetailsPopupOpen(true);
  };
  const handleTaskDetailsPopUpClose = async ()=> {
    setWorkflowActivities(await getWorkflowActivities(selectedRow.caseid))
    setIsTaskDetailsPopupOpen(false);
  };
  const [isTaskHistoryOpen, setOpenTaskHistoryPopup] = useState(false);
  const [taskFormDetails, setTaskFormDetails] = useState({})
  const [taskFormMetaDetails, setTaskFormMetaDetails] = useState({})
  const handleTaskHistoryPopUpClose = ()=> {
    setOpenTaskHistoryPopup(false);
  };
  const openTaskHistory = async (row) =>{
    setSelectedRow(row);
    const {formId, submissionId} = getFormIdSubmissionIdFromURL(row.formurl);
    const formDetails = await getFormDetailsById(formId);
    setTaskFormDetails(formDetails)
    const formMetadata = await getFormDetailsByFormAndSubmmisionId(formId, submissionId);
    setTaskFormMetaDetails(formMetadata)
    setOpenTaskHistoryPopup(true);
  }

  return (
    <>
    <CustomizedDialog
        title={selectedRow.taskname}
        isOpen={isTaskDetailsPopupOpen}
        setIsOpen={setIsTaskDetailsPopupOpen}
        handleClose={handleTaskDetailsPopUpClose}
        fullWidth
      >
        <TaskDetailsPopUp taskId={selectedRow.taskid} handleClose={handleTaskDetailsPopUpClose}/>
      </CustomizedDialog>
      
    <CustomizedDialog
        title=""
        isOpen={isTaskHistoryOpen}
        setIsOpen={setOpenTaskHistoryPopup}
        handleClose={handleTaskHistoryPopUpClose}
        fullWidth
      >
        <FormIOForm
          title={selectedRow.selectedform}
            form={taskFormDetails}
            submission={taskFormMetaDetails}
          Disabled
          
                  />
      </CustomizedDialog>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        {(workflowActivities || activitiesList) && (workflowActivities.length !== 0 || activitiesList.length !==0) ? (
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
              {(workflowActivities.length !== 0 ?workflowActivities:activitiesList).map((row: any) => (
                <TableRow key={row.id} >
                  {row.status==='New'?<TableCell
                    sx={{
                      border: 0,
                      borderBottom: 1,
                      borderBottomColor: "#E2E2E2",
                      paddingInline: 0,
                      textDecoration: 'underline',
                      cursor: "pointer",
                    }}
                    align="left"
                    onClick={()=>handleTaskDetailsView(row)}
                  >
                  { row.taskname}
                  </TableCell>:<TableCell
                    sx={{
                      border: 0,
                      borderBottom: 1,
                      borderBottomColor: "#E2E2E2",
                      paddingInline: 0,
                    }}
                    align="left"
                  >
                  { row.taskname}
                  </TableCell>}
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
                      textDecoration: 'underline',
                      cursor: "pointer",
                    }}
                    align="left"
                    onClick={()=>openTaskHistory(row)}
                  >
                   {row.selectedform}
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
