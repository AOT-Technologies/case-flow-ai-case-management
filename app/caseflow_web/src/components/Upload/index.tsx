import React, { useEffect, useState } from "react";
import "./upload.scss";
import {
  uploadCMISfile,
  updateCMISdocument,
} from "../../apiManager/services/cmisService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FileViewer from "react-file-viewer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setDocumentList } from "../../reducers/documentsReducer";
import { getAllDocuments } from "../../services/DocumentManagementService";

import { v4 as uuidv4 } from "uuid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

const Upload = (props) => {
  //inital fields values for the documents
  const initialFieldValues = {
    documentID: 0,
    dms: 1,
    file: "",
    fileName: "",
    fileDescription: null,
    previewURL: "",
    filetypeUploaded: null,
    inputFields: null,
    expanded: false,
    dms_provider: 0,
    content: "",
  };

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

  const handleChanges = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //set values when document input fiels changes
  const handleDocumentInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (recordForEdit != null) {
      setExpanded(true);
      setValues(editFieldValues); //set the edit value to focument inputs
    } else {
      refreshDocumentList();
    }
  }, [recordForEdit]);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  async function fetchDocumentDetails() {
    let output = await getAllDocuments();
    output = output.map((element) => {
      return {
        ...element,
        creationdate: element.creationdate.split("T")[0],
        modificationdate: element.modificationdate.split("T")[0],
      };
    });
    dispatch(setDocumentList(output));
  }

  // set and show  the uploaded file details
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          file,
          fileName: file.name,
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

  //upload file action
  const onSubmitHandler = async () => {
    console.log(values.documentID);
    if (values.documentID == 0) {
      // check with docid exist or not id documentID=0 insert opertaion work
      const response = await uploadCMISfile(
        values.file,
        values.fileName,
        values.fileDescription,
        values.dms,
        JSON.stringify(inputFields)
      );
      console.log(response.data);
      if (response && response.data && response.data.status == "success") {
        fetchDocumentDetails();
        toast.success("Success");
        refreshDocumentList();
      } else toast.error("Error");
    } else {
      // for update

      updateCMISdocument(
        values.documentID,
        values.file,
        values.fileName,
        values.fileDescription,
        values.dms_provider
      );

      fetchDocumentDetails();
      toast.success("Success");
      refreshDocumentList();
    }
  };
  const onPreviewErrorhandler = (e) => {
    console.log(e);
  };

  //set the matadata fields
  const handleMetaDataChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };
  //metadata add operation
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), MetadataField: "", MetadataValue: "" },
    ]);
  };
  //metadata remove operation
  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };
  // refresh document
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
              <Button className="choose-file-btn-upload" variant="contained">
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
            ;
          </div>
         
             
            
        </div>
       
        {values.file !== "" && (
                < div className="hidden-inputs">
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
                
                {/* <div>
               <label>Metadata</label>
                <form>
                  {inputFields.map((inputField) => (
                    <div key={inputField.id}>
                      <TextField
                        id="outlined-multiline-static"
                        name="MetadataField"
                        label="Metadata Field"
                        variant="standard"
                        sx={{
                          "& .MuiInputLabel-root": { color: "#404040" },
                          borderBottom: "1px solid #404040",
                        }}
                        value={inputField.MetadataField}
                        onChange={(event) =>
                          handleMetaDataChangeInput(inputField.id, event)
                        }
                      />
                      <TextField
                        name="MetadataValue"
                        label="Metadata Value"
                        variant="standard"
                        sx={{
                          "& .MuiInputLabel-root": { color: "#404040" },
                          borderBottom: "1px solid #404040",
                        }}
                        value={inputField.MetadataValue}
                        onChange={(event) =>
                          handleMetaDataChangeInput(inputField.id, event)
                        }
                      />
                      <IconButton
                        disabled={inputFields.length === 1}
                        onClick={() => handleRemoveFields(inputField.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton onClick={handleAddFields}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  ))}
                </form>
              
            </div> */}
            
                </div>
                
              )}
              <div className="upload-button">
              <Button
                style={{
                  margin: "auto",
                  height: "3.4375rem",
                  width: "100%",
                }}
                variant="outlined"
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