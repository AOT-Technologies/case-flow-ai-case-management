import React, { useEffect, useState } from "react";
import "./upload.scss";
import {
  uploadCMISfile,
  updateCMISdocument,
} from "../../apiManager/services/cmisService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FileViewer from "react-file-viewer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";

import { store } from "../../interfaces/stateInterface";
import { CASEFLOW_DMS } from "../../constants/constants";

const Upload = (props) => {
  const initialFieldValues = {
    documentID: 0,
    dms: 1,
    file: "",
    fileName: "",
    fileSize: null,
    fileDescription: null,
    previewURL: "",
    filetypeUploaded: null,
    inputFields: null,
    expanded: false,
    dms_provider: 0,
    content: "",
  };
  const [isSumbitted, setSubmitted] = useState(false);
  const [progressBarColor, setProgressBarColor] = useState("success");

  const [values, setValues] = useState(initialFieldValues);
  const [expanded, setExpanded] = useState(false);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), MetadataField: "", MetadataValue: "" },
  ]);

  const recordForEdit = props.documentDetailsForEdit;
  let editFieldValues;

  if (recordForEdit != null) {
    const {
      dms_provider,
      content,
      description,
      docname,
      name,
      documentid,
      downloadurl,
    } = recordForEdit;
    editFieldValues = {
      dms: dms_provider,
      file: name,
      fileName: docname,
      fileDescription: description,
      previewURL: downloadurl,
      filetypeUploaded: null,
      inputFields: null,
      documentID: documentid,
      content: content,
    };
  }
  let selectedCase = useSelector((state: store) => state.cases.selectedCase);
  const progress = useSelector((state: store) => state.app.progressBarStatus);

  const handleChanges = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDocumentInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setExpanded(true);
      setValues(editFieldValues);
    } else {
      refreshDocumentList();
    }
  }, [recordForEdit]);

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          file,
          fileName: file.name,
          fileSize: file.size,
          filetypeUploaded: file.type.split("/")[1],
          previewURL: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    } else {
      setValues({
        ...values,
        file: "",
        fileName: "",
      });
    }
  };

  const onSubmitHandler = async () => {
    if (values.documentID == 0) {
      setSubmitted(true);

      let bodyFormData = new FormData();
      bodyFormData.append("file", values.file, values.fileName);
      bodyFormData.append("name", values.fileName);
      bodyFormData.append("desc", values.fileDescription);
      bodyFormData.append("caseId", selectedCase.id);
      bodyFormData.append("dmsprovider", 4);
      bodyFormData.append("metaData", JSON.stringify(inputFields));
      bodyFormData.append("type", values.file.type);
      bodyFormData.append("size", values.fileSize);

      await uploadCMISfile(bodyFormData).then((response) => {
        if (response && response.data && response.data.id) {
          props.onSuccess();
          setSubmitted(false);
          refreshDocumentList();
        } else if (response.data.status == 409) {
          setProgressBarColor("error");
          toast.error("File name already exists");
        } else {
          setProgressBarColor("error");
          toast.error("Error");
        }
      });
    } else {
      setSubmitted(true);
      updateCMISdocument(
        values.documentID,
        values.file,
        values.fileName,
        values.fileDescription,
        values.dms_provider
      );

      toast.success("Success");
      refreshDocumentList();
    }
  };
  const onPreviewErrorhandler = (e) => {};

  const handleMetaDataChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };
  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number }
  ) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color={props.color}>{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  };
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), MetadataField: "", MetadataValue: "" },
    ]);
  };
  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };
  const refreshDocumentList = () => {
    setValues(initialFieldValues);
  };

  return (
    <>
      <div className="accordion">
        <div className="upload-grid">
          <div className="upload-left">
            <div className="upload-row">
              <input
                type="file"
                id="actual-btn"
                onChange={showPreview}
                hidden
              />
              <Button
                className="choose-file-btn-upload"
                variant="contained"
                sx={{ backgroundColor: "primary.main" }}
              >
                <label
                  htmlFor="actual-btn"
                  className="choose-file-btn-label-upload"
                >
                  Choose File
                </label>
              </Button>

              <TextField
                id="disabled-basic"
                sx={{
                  "& .MuiInputLabel-root": { color: "#404040" },
                  borderBottom: "1px solid #404040",
                }}
                InputProps={{ disableUnderline: true }}
                label="File Name"
                variant="standard"
                className="file-name-text-field-upload"
                name="fileName"
                value={values.fileName}
                onChange={handleDocumentInputChange}
                placeholder="File Name..."
              />
            </div>
          </div>

          <div className="upload-right">
            {values.documentID == 0 &&
              values.file &&
              values.filetypeUploaded !== "plain" && (
                <div className="display-upload-result">
                  <FileViewer
                    key={Math.random()}
                    fileType={values.filetypeUploaded}
                    filePath={values.previewURL}
                    onError={onPreviewErrorhandler}
                  ></FileViewer>
                </div>
              )}
            {values.documentID != 0 &&
              values.file &&
              values.filetypeUploaded !== "plain" && (
                <div className="display-upload-result">
                  <img
                    className="pdf-file-img"
                    src={`data:image/jpeg;base64,${values.content}`}
                    alt="uploaded image"
                  />
                </div>
              )}
          </div>
        </div>

        {values.file !== "" && (
          <div className="hidden-inputs">
            <div
              style={{
                paddingTop: "1rem",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="standard"
                sx={{
                  "& .MuiInputLabel-root": { color: "#404040" },
                  borderBottom: "1px solid #404040",
                  width: "100%",
                }}
                InputProps={{ disableUnderline: true }}
                value={values.fileDescription}
                name="fileDescription"
                onChange={handleDocumentInputChange}
                placeholder="My text document description..."
              />
            </div>
          </div>
        )}
        <div className="upload-button">
          {isSumbitted && values.file && values.fileName ? (
            <LinearProgressWithLabel
              value={progress}
              color={progressBarColor}
            />
          ) : (
            ""
          )}
          <Button
            className={
              values.file && values.fileName
                ? "upload-btn-abled"
                : "upload-btn-disabled"
            }
            disabled={values.file && values.fileName ? false : true}
            variant="contained"
            sx={{ backgroundColor: "primary.main" }}
            onClick={onSubmitHandler}
          >
            {values.documentID == 0 ? "Upload file" : "Update File"}
          </Button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Upload;
