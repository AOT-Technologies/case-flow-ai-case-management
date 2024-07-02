import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Box, Button, Card, CardActionArea, Chip, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField } from "@mui/material";
import CustomizedDialog from "../Dialog/Dialog";
import { addBPMGroup, claimTask, fetchUserList, getProcessDefinitionById, getTaskById, getTaskIdentityLinksById, getTaskVariablesById, onBPMTaskFormSubmit, removeBPMGroup, unClaimTask, updateTaksById, updateTaskAssignee } from "../../services/workflowService";
import { getFormIdSubmissionIdFromURL } from "../../services/formatterService";
import { getFormDetailsByFormAndSubmmisionId, getFormDetailsById } from "../../services/formsService";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import HistoryList from "./historyTab/HistoryList";
import ProcessDiagram from "./processDiagram/ProcessDiagram";
import { Form as FormIOForm } from "react-formio";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import "./mytaskcard.scss";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TaskDetailsPopUp = (props) => {
  const userName = useSelector(
    (state: State) => state.auth.userDetails.userName
  );
  const { taskId,handleClose } = props;
  const [value, setValue] = useState('0');
  const [task, setTask] = useState<any>({});
  const [isTaskDetailsOpen, setOpenTaskDetailsPopup] = useState(false);
  const [isManageGroupOpen, setIsManageGroupOpen] = useState(false);
  const [taskFormDetails, setTaskFormDetails] = useState({})
  const [taskFormMetaDetails, setTaskFormMetaDetails] = useState({})
  const [taskVariables, setTaskVariables] = useState<any>({});
  const [groups, setGroups] = useState<any>([]);
  const [isSetFollowUpOpen, setIsSetFollowOpen] = useState(false);
  const [isDueDateOpen, setIsDueDateOpen] = useState(false);
  const [isSelectAssigneeOpen, setIsSelectAssigneeOpen] = useState(false);
  const [process, setProcess] = useState({});
  const [userList, setUserList] = useState<any>([]);
  const [groupToAdd, setGroupToAdd] = useState("");
  const [assignee, setAssignee] = useState();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue+'');
  };
  
  useEffect(() => {
    async function fetchTaskAPI() {
      let response = await getTaskById(taskId)
      setTask(response)
      setAssignee(response?.assignee)
      const variables = await getTaskVariablesById(taskId);
      setTaskVariables(variables);
      const identityLinks =await getTaskIdentityLinksById(taskId);
      setGroups(identityLinks);
      const {formId, submissionId} = getFormIdSubmissionIdFromURL(variables?.formUrl?.value);
      const formDetails = await getFormDetailsById(formId);
      setTaskFormDetails(formDetails)
      const formMetadata = await getFormDetailsByFormAndSubmmisionId(formId, submissionId);
      setTaskFormMetaDetails(formMetadata)
      const process = await getProcessDefinitionById(response?.processDefinitionId)
      setProcess(process[0]); 
    }
    fetchTaskAPI()
  }, [])
  const handleManageGroupPopUpClose = ()=> {
    setIsManageGroupOpen(false);
  };
  const getTaskSubmitFormReq = (formUrl, applicationId, actionType, webFormUrl) => {
    let formRequestFormat = {
      variables: {
        formUrl: {
          value: formUrl,
        },
        applicationId: {
          value: applicationId,
        },
        webFormUrl:{
          value: webFormUrl
        },
      },
    };
    return formRequestFormat;
  };
  const onFormSubmitCallback =async (actionType = "") => {
      let submissionData = getTaskSubmitFormReq(
        taskVariables?.formUrl?.value,
        taskVariables?.applicationId?.value,
        actionType,
        taskVariables?.webFormUrl?.value,
      )
        
      await onBPMTaskFormSubmit(
        task?.id,
        submissionData
      ).then(()=>{
        handleClose()
      })
};
  const handleSetFollowUpDate = () => {
    setIsSetFollowOpen(!isSetFollowUpOpen)
  }
  const handleFollowUpDate = (fDate)=> {
    let taskUpdateRequest = {
      ...task,
      followUp: moment(fDate).format("yyyy-MM-DDTHH:mm:ss.SSSZZ")
    }
    updateTaksById(task.id, taskUpdateRequest)
    setIsSetFollowOpen(!isSetFollowUpOpen)
    setTask(taskUpdateRequest);
  };
  const handleSetDueUpDate = () => {
    setIsDueDateOpen(!isDueDateOpen)
  }
  const handleDueDate = (dDate)=> {
    let taskUpdateRequest = {
      ...task,
      due: moment(dDate).format("yyyy-MM-DDTHH:mm:ss.SSSZZ")
    }
    updateTaksById(task.id, taskUpdateRequest)
    setIsDueDateOpen(!isDueDateOpen)
    setTask(taskUpdateRequest);
  };
  const handleManageGroupPopup = () => {
    setIsManageGroupOpen(true)
  }
  const onAddGroup = async () => {
    const group = { groupId: groupToAdd, type: "candidate" };
    await addBPMGroup(task.id, group)
    const identityLinks =await getTaskIdentityLinksById(task.id);
    setGroups(identityLinks);
    setGroupToAdd("")
  };
  const onDeleteGroup = async (group) => {
    await removeBPMGroup(task.id, group);
    const identityLinks =await getTaskIdentityLinksById(task.id);
    setGroups(identityLinks);
  };
  const handleClaimTask = async () => {
    let req = {userId:userName}
    await claimTask(task.id, req)
    setAssignee(userName)
  }
  const handleAssignee = async () => {
    let users  = await fetchUserList("formsflow/formsflow-reviewer")
    setUserList(users)
    await setIsSelectAssigneeOpen(true)
  }
  const handleUnClaimTask = async () => {
    await unClaimTask(task.id)
    setAssignee("")
  }
  const handleTaskAssignee = async (assignee)=>{
    await setIsSelectAssigneeOpen(false)
    var reqBody = {userId:assignee}
    await updateTaskAssignee(task.id, reqBody);
    setAssignee(assignee);
  }
  return (
    <>
    <div className="service-task-details">
        <Card className="me-2 bg-light">
          <CardActionArea>
            <Box sx={{ display: 'flex', gap: 2, margin: 1}}>
              <Chip variant="outlined" color="primary" label={process?.name}/>
              <Chip variant="outlined" color="primary" label={'Submission Id#  '+taskVariables?.applicationId?.value}/>
              <div>{assignee ? <Chip avatar = {<PersonIcon/>} color="primary" 
              label={assignee}  onClick={handleAssignee} onDelete={handleUnClaimTask}/>:<Chip avatar = {<PersonIcon/>} color="primary" 
              label={'Claim'}  onClick={handleClaimTask}/>}
              {isSelectAssigneeOpen&&
              <FormControl 
              style={{display:"flex"}}>
              <InputLabel id="assignee">Assign To</InputLabel><Select
    labelId="assignee"
    id="assignee"
    label="User"
    onChange={v=>handleTaskAssignee(v.target.value)}
  >
   {userList.map((user) => (
          <MenuItem key={user.username} value={user.username}>{user.username}</MenuItem>
        ))}
  </Select>
  </FormControl>}
              </div>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 , margin:1, marginTop:3}}>
              <div><Chip avatar = {<CalendarMonthIcon/>} color="primary" 
                  label={task.followUp?'Follow up in '+moment(task?.followUp).diff(new Date(), 'days')+' days':'Set follow-up date'}  onClick={handleSetFollowUpDate}/>
              {isSetFollowUpOpen && <DatePicker minDate={new Date()} onChange={handleFollowUpDate} selected={new Date()} inline />}</div>
              <div><Chip avatar = {<NotificationsIcon/>} color="primary" label={task.due?'Due in '+moment(task?.due).diff(new Date(), 'days')+' days':'Set due date'}  onClick={handleSetDueUpDate}/>
              {isDueDateOpen && <DatePicker minDate={new Date()} onChange={handleDueDate} selected={new Date()} inline />}</div>
              <div><Chip avatar = {<GroupsIcon/>} color="primary" label={'Add Groups'}  onClick={handleManageGroupPopup}/>
              {groups?.map((group) => (<span className="word-break">{group.groupId}, </span>))}</div>
              
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Form" value="0" />
                  <Tab label="History" value="1" />
                  <Tab label="Diagram" value="2" />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index="0">
               {task?.assignee === userName ? (
                  <FormIOForm
                    form={taskFormDetails}
                    submission={taskFormMetaDetails}
                    onSubmit={(data) => onFormSubmitCallback(data)}
                  />
                ) : (
                  <FormIOForm
                    form={taskFormDetails}
                    submission={taskFormMetaDetails}
                    onSubmit={(data) => onFormSubmitCallback(data)}
                    Disabled
                  />
                )}
                 
              </CustomTabPanel>
              <CustomTabPanel value={value} index="1">
                <HistoryList applicationId={taskVariables?.applicationId?.value} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index="2">
                <div>
                  <ProcessDiagram
                    processKey={process?.key}
                    processInstanceId={task?.processInstanceId}
                  />
                </div>
              </CustomTabPanel>
            </Box>
          </CardActionArea>
        </Card>   
      </div>
    
      <CustomizedDialog
        title="Manage Groups"
        isOpen={isManageGroupOpen}
        setIsOpen={setIsManageGroupOpen}
        handleClose={handleManageGroupPopUpClose}
        fullWidth
      >
          <div className="modal-text">
            <i className="fa fa-info-circle me-2" />
            {(
              "You can add a group by typing a group ID into the input field and afterwards "
              + "clicking the button with the plus sign."
            )}
            <div style={{display: 'flex', margin:'3%'}}>
                <Button style={{width:'30%', textTransform: 'none'}} 
                  endIcon={<GroupAddIcon/>} 
                  disabled={!groupToAdd}
                  onClick={onAddGroup}
                >
                  Add a group 
                </Button>
                <TextField
                    id="outlined-multiline-flexible"
                    value={groupToAdd}
                    onChange={(e) => setGroupToAdd(e.target.value)}
                />
            </div>
              <div>
              {groups?.length ? (
                <div style={{float:'inline-end'}}>
                  {groups.map((group, index) => (
                    <Box >
                      <Button startIcon={<GroupRemoveIcon/>} key={index} onClick={()=>onDeleteGroup(group)} />
                      <span className="word-break">{group.groupId}</span>
                    </Box>
                  ))}
                </div>
              ) : null}
              </div>
            <button type="button" className="btn btn-default" onClick={handleManageGroupPopUpClose}>
              {("Close")}
            </button>
          </div>
        </CustomizedDialog>
    </>
  );
};

export default TaskDetailsPopUp;
function dispatch(arg0: { payload: any; type: string; }) {
  throw new Error("Function not implemented.");
}

