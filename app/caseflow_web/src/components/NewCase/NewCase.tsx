import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import {
  addCases,
  getCaseDetails,
  updateCases,
} from "../../services/CaseService";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  resetSelectedCase,
  setSelectedCaseType,
} from "../../reducers/newCaseReducer";
import "./NewCaseComponent.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { fetchCaseTypess } from "../../services/constantsService";
import { setCaseTypes } from "../../reducers/constantsReducer";
import { State } from "../../interfaces/stateInterface";
import { async } from "q";
import { publishMessage } from "../../services/NatsServices";
import { v4 as uuidv4 } from "uuid";

import {
  createDraft,
  getFormDetails,
  getFormsList,
  getFormsListByName,
  submitNewForm,
  submitNewFormDraft,
} from "../../services/formsService";
import { getTaksByProcessInstanceId } from "../../services/workflowService";
import { FORMSFLOW_APPLICATION_URL } from "../../apiManager/endpoints";
import { Form as FormIOForm, saveSubmission, Formio } from "react-formio";
import CustomizedDialog from "../Dialog/Dialog";
import { GENERIC_NAME } from "../../apiManager/endpoints/config";
const NewCase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialFieldValues = {
    id: 0,
    contactid: "",
    individualid: "",
    statusid: 1,
    typeid: 1,
    email: "",
    phonenumber: "",
    dateofbirth: new Date(),
    caseowner:"",
    city: "",
    region: "",
    issuetype:"",
    describetheissue:"",
    resolutionsought:"",
    lobcaseid:0,
  };

  const caseList = useSelector((state: State) => state.cases.selectedCase);
  const caseTypes = useSelector((state: State) => state.constants.caseTypes);
  const userName = useSelector(
    (state: State) => state.auth.userDetails.userName
  );
  const selectedCaseType = useSelector(
    (state: State) => state.cases.selectedCaseFormType
  );
  const [values, setValues] = useState(initialFieldValues);
  const [isEdit, setIsEdit] = useState(false);
  const { handleSubmit, control, register } = useForm();
  // const [caseList.isEdit,setIsCaseEdit] = useState(Boolean);
  const [selectedForm, setselectedForm]: any = useState("");
  const [selectedFormDetails, setSelectedFormDetails]: any = useState();
  const [selectedType, setSelectedType] = useState("");
  const [isOpenPopup, setOpenPopup] = useState(false);

  const onSubmit = async () => {
    let response;
    if (isEdit) {
      await updateCases(values).then((data) => {
        try {
          response = data;
          const SUBJECT = "CaseUpdate";
          // const MESSAGE = {
          //   eventId: String(uuidv4()),
          //   eventRef: String(values.id),
          //   eventOrigin: String("Caseflow"),
          //   eventCategory: String("Caseflow"),
          //   eventType: String(SUBJECT),
          //   eventDateTime: String(new Date()),
          //   eventPublisher: String(userName),
          // };
          // publishMessage(SUBJECT, MESSAGE);
        } catch (error) {
          console.log(error);
        }
      });
      navigate(
        "/private/cases/" + response.success.data.updateCase.id + "/details"
      );
    } else {
      await addCases(values).then((data) => {
        try {
          response = data;
          const SUBJECT = "CaseCreate";
          const MESSAGE = {
            eventId: String(uuidv4()),
            eventRef: String(values.id),
            eventOrigin: String("Caseflow"),
            eventCategory: String("Caseflow"),
            eventType: String(SUBJECT),
            eventDateTime: String(new Date()),
            eventPublisher: String(userName),
          };
          publishMessage(SUBJECT, MESSAGE);
        } catch (error) {
          console.log(error);
        }
      });
      navigate(
        "/private/cases/" + response.success.data.createCase.id + "/details"
      );
    }

    if (response && response.success && response.success.data) {
      toast.success("Success");
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchSelectedCaseDetails();
    getCaseTypes();
  }, []);

  useEffect(() => {
    getForm();
  }, [selectedCaseType]);

  const fetchSelectedCaseDetails = async () => {
    var matches = location.pathname.match(/(\d+)/);
    if (matches && matches[0] && caseList) {
      const data = await getCaseDetails(matches[0]);
      const InitialSelectedCaseDetails = {
        id: data.id,
        contactid: data.contactid,
        individualid: data.individualid,
        statusid: data.statusid,
        typeid: data.typeid,
        email: data.email,
        phonenumber: data.phonenumber,
        city: data.city,
        region: data.region,
        dateofbirth: data.dateofbirth,
        issuetype: data.issuetype,
        caseowner: data.caseowner,
        describetheissue: data.describetheissue,
        resolutionsought: data.resolutionsought,
        lobcaseid:data.lobcaseid,
      };
      setValues(InitialSelectedCaseDetails);
      setIsEdit(true);
    }
  };

  const getCaseTypes = async () => {
    const caseTypes = await fetchCaseTypess();
    dispatch(setCaseTypes(caseTypes));
  };

  const refreshCases = () => {
    dispatch(resetSelectedCase());
    setValues(initialFieldValues);
    navigate("/private/cases");
  };

  const resetCases = () => {
    dispatch(resetSelectedCase());
    setValues(initialFieldValues);
  };
  const handleBack = () => {
    if (isEdit) {
      navigate("/private/cases/" + values.id + "/details");
    } else {
      navigate("/private/cases");
    }
  };

  const getForm = async () => {
    if (selectedCaseType && !isEdit) {
      const formDetails = await getFormDetails(selectedCaseType);
      setSelectedFormDetails(formDetails);
    }
     else if (!selectedCaseType && !caseList) {
      setOpenPopup(true);
    }
  };
  const submitForm = (data) => {
    
    console.log(data, 'inside new case details');
    submitNewForm(selectedFormDetails._id, data).then((res) => {
      let submissionData = {
        formId: res.form,
        submissionId: res._id,
        formUrl:
          FORMSFLOW_APPLICATION_URL +
          "/form/" +
          res.form +
          "/submission/" +
          res._id,
        webFormUrl:
          FORMSFLOW_APPLICATION_URL +
          "/form/" +
          res.form +
          "/submission/" +
          res._id,
      };
      let createDraftData = { data: {}, formId: res.form };
      createDraft(createDraftData)
        .then((draftId) => {
          if (draftId) {
            return submitNewFormDraft(submissionData, draftId);
          }
        })
        .then((data) => {
          return getTaksByProcessInstanceId(data.processInstanceId);
        })
        .then((tasks) => {
          let task = tasks[0];
          if (task &&task["id"]) {
            try {
              const SUBJECT = "CaseCreate";
              // const MESSAGE = {
              //   eventId: String(uuidv4()),
              //   eventRef: String(task.caseInstanceId),
              //   eventOrigin: String("Caseflow"),
              //   eventCategory: String("Caseflow"),
              //   eventType: String(SUBJECT),
              //   eventDateTime: String(new Date()),
              //   eventPublisher: String(userName),
              // };
              // publishMessage(SUBJECT, MESSAGE);
            } catch (error) {
              console.log(error);
            }
            toast.success("New workflow started successfully");
            navigate("/private/cases");
          } else {
            toast.success("Failed to  start the workflow. Please try again!");
          }
        });
    });
  };
  const onChangehandler = (event) => {
    setSelectedType(event.target.value);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  const selectForm = () => {
    dispatch(setSelectedCaseType(selectedType));
    setOpenPopup(false);
  };

  useEffect(() => {
    if(!selectedFormDetails && !caseList){
      setOpenPopup(true)
    }
    else{
      setOpenPopup(false)

    }
  }, [selectedFormDetails]);

  return (
    <>
      <div
        style={{ padding: "2rem 4rem 0rem 4rem" }}
        className="newOrupdateCaseBlock"
      >
        {isEdit ? (
          <>
            <Typography
              sx={{ padding: "1rem 1rem 1rem 1rem" }}
              variant="h6"
              className="case-heading"
            >
              {isEdit ? "Update " + GENERIC_NAME : "New " + GENERIC_NAME}
            </Typography>
            <Divider sx={{ borderBottomWidth: 3, width: "75vw" }} />
            <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-name-tag"
                >
                 Contact Name :
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"contactid"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      rows={1}
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Contact Name"}
                      value={values.contactid}
                      onChange={(e) => {
                        setValues({ ...values, contactid: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Individual Name:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"individualid"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Individual Name"}
                      value={values.individualid}
                      onChange={(e) => {
                        setValues({ ...values, individualid: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"email"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"email"}
                      value={values.email}
                      onChange={(e) => {
                        setValues({ ...values, email: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Phone Number:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"phonenumber"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      // type="number"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Phone Number"}
                      value={values.phonenumber}
                      onChange={(e) => {
                        setValues({ ...values, phonenumber: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Date Of Birth:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"dateofbirth"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      type="date"
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Date of Birth"}
                      value={values.dateofbirth}
                      onChange={(e) => {
                        setValues({ ...values, dateofbirth: new Date(e.target.value) });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  City:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"city"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"City"}
                      value={values.city}
                      onChange={(e) => {
                        setValues({ ...values, city: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Region:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"region"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Region"}
                      value={values.region}
                      onChange={(e) => {
                        setValues({ ...values, region: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Issue Type:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"issuetype"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Issue Type"}
                      value={values.issuetype}
                      onChange={(e) => {
                        setValues({ ...values, issuetype: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Case Owner:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"caseowner"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Case Owner"}
                      value={values.caseowner}
                      onChange={(e) => {
                        setValues({ ...values, caseowner: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Describe the Issue:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"describetheissue"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={4}
                      multiline
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Describe the Issue"}
                      value={values.describetheissue}
                      onChange={(e) => {
                        setValues({ ...values, describetheissue: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={4}>
                <Typography
                  sx={{ padding: "1rem 1rem 0rem 0rem" }}
                  variant="body2"
                  className="case-desc-tag"
                >
                  Resolution Sought:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={"resolutionsought"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="standard-basic"
                      rows={1}
                      variant="standard"
                      sx={{
                        width: "100%",
                      }}
                      placeholder={"Resolution Sought"}
                      value={values.resolutionsought}
                      onChange={(e) => {
                        setValues({ ...values, resolutionsought: e.target.value });
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                padding: "2rem 1rem 1rem 1rem",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  alignItems: "center",
                  // margin: "auto",
                  height: "2.4375rem",
                  width: "20%",
                }}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                {isEdit ? "Update" : "Create"}
              </Button>
              <Button
                style={{
                  alignItems: "center",
                  marginLeft: "2rem",
                  height: "2.4375rem",
                  width: "20%",
                }}
                variant="outlined"
                onClick={() => handleBack()}
              >
                Back
              </Button>
            </div>
          </>
        ) : (
          <>
            {" "}
            <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
              <Grid item xs={8}>
                <Typography
                  sx={{ padding: "1rem 1rem 1rem 1rem" }}
                  variant="h6"
                  className="case-heading"
                >
                  {isEdit
                    ? "Update " + GENERIC_NAME 
                    : "New " + GENERIC_NAME }
                </Typography>
              </Grid>

              <Divider sx={{ borderBottomWidth: 3, width: "75vw" }} />
            </Grid>
            <div className="form-io">
              {selectedFormDetails ? (
                <FormIOForm
                  form={selectedFormDetails}
                  submission={undefined}
                  onSubmit={(data) => submitForm(data)}
                />
              ) : (
                <Typography variant="body1" className="no-details-found">
                  Please choose a case type!
                </Typography>
              )}
            </div>
          </>
        )}
      </div>
      <CustomizedDialog
        title={"Start New " + GENERIC_NAME}
        isOpen={isOpenPopup}
        setIsOpen={setOpenPopup}
        handleClose={handleClosePopup}
        fullWidth
      >
        <div className="workflow">
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel id="demo-simple-select-label">
              Select Case Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={selectedType}
              onChange={onChangehandler}
              className="dropDownStyle"
            >
              {caseTypes.map((option, index) => (
                <MenuItem key={index} value={option.formid}>
                  {option.displayname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="case-type-buttons">
            <FormControl>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "secondary.main",
                  borderColor: "primary.secondary",
                }}
                onClick={handleClosePopup}
              >
                Cancel
              </Button>
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  borderColor: "primary.main",
                }}
                onClick={selectForm}
              >
                Continue
              </Button>
            </FormControl>
          </div>
        </div>
      </CustomizedDialog>
    </>
  );
};

export default NewCase;
