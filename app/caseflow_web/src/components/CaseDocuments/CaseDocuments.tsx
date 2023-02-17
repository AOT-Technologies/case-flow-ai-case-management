import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import CaseDocumentCard from "../CaseDocumentCard";
import { useEffect, useState } from "react";
import Search from "../Search/Search";
import Grid from "@mui/material/Grid";
import "./CaseDocuments.scss";
import jpeg from "../../assets/jpeg.png";
import png from "../../assets/png.png";
import pdf from "../../assets/pdf.png";
import txt from "../../assets/txt.png";
import {useDispatch} from "react-redux";
import { getAllDocuments,getDocument,searchCaseDocument } from "../../services/DocumentManagementService";
import { setDocumentList } from "../../reducers/documentsReducer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import moment from "moment";



const CaseDocuments = () => {
  const [filteredDocumentDetails, setFilteredDocumentDetails] = useState([]);
  // const [documentDetailsForEdit, setDocumentDetailsForEdit] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("Name");
  const dropDownArray = ["Name","Description"];
   const dispatch = useDispatch();
  const getFileIcon = (fileName:any) => {
    let ext = fileName.split(".").pop();
    ext = ext.toLowerCase();
    switch (ext) {
      case "jpeg":
        return jpeg;
      case "pdf":
        return pdf;
      case "png":
        return png;
      case "txt":
        return txt;
    }
  };


  const filterDocumentDetails = async () => {
    let searchResult = await searchCaseDocument(searchField,searchColumn)
    // searchResult = searchResult.map((element) => {

    // });
    if(searchResult)
    setFilteredDocumentDetails(searchResult)
  };



  useEffect(() => {
    fetchDocumentDetailsList()
    filterDocumentDetails();
  }, [searchField]);


  
  async function fetchDocumentDetailsList() {
    let output = await getAllDocuments();
    // output = output.map((element) => {
    //   return {
    //     ...element,
    //     creationdate: element.creationdate.split("T")[0],
    //     modificationdate: element.modificationdate.split("T")[0],
    //   };
    // });
    dispatch(setDocumentList(output));
  }

//  const  fetchDocumentDetails=(data:any)=>{
// setDocumentDetailsForEdit(data)
//   }
  
  const previewDocument = async (id,type) => {
    let response = await getDocument(id)
    let newWindow = window.open('/')!
        newWindow.onload = () => {
          newWindow.location = window.URL.createObjectURL(
            new Blob([response["data"]], {type: type})
          );
        }

}


  return (
    <section className="dashboard">
      <div className="header-search">
      <Typography variant="body1" className="title">CaseFlow</Typography>
      <div className="search">
        <Search
        setSearchField={setSearchField}
        dropDownArray={dropDownArray}
        setSearchColumn={setSearchColumn}
        ></Search>
      </div>
      </div>
      <div className="recent-cases">
        {" "}
        <div className="background">
          <div className="file-card">
            <div>
              {/* <Upload selectedDMS = "dms1" documentDetailsForEdit={documentDetailsForEdit}  /> */}
              <div className="case-document-list">
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ padding: "1rem 1rem 1rem 1rem" }}
                      variant="h6"
                    >
                      Case Documents
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
          ></Search> */}
                  </Grid>
                </Grid>

                <Divider sx={{ borderBottomWidth: 3 }} />
               <List component="nav"
        aria-label="mailbox folders">

          { (filteredDocumentDetails &&filteredDocumentDetails.length!==0)?            
            filteredDocumentDetails.map(document =>{
              return (
                <>
                  <ListItem key={document.id}>
                    <Grid
                      container
                      spacing={1}
                      onClick={() => {
                        previewDocument(document.id, document.type);
                      }}
                    >
                      <Grid item xs={1}>
                        <ListItemText
                          primary={<Typography variant="subtitle1">ID</Typography>}
                          secondary={
                            <Typography variant="body2">
                              {document.id}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">Case ID</Typography>
                          }
                          secondary={
                            <Typography variant="body2">
                              {document.caseId}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">Name</Typography>
                          }
                          secondary={
                            <Typography variant="body2">
                              {document.name}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">Description</Typography>
                          }
                          secondary={
                            <Typography variant="body2">
                              {document.desc}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" noWrap>
                              Creation Date
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2">
                              {moment(document.creationdate).format(
                                "MMMM Do YYYY"
                              )}
                            </Typography>
                          }
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </>
              );
              
            }):
             <ListItem >
            <Grid container spacing={1}  >
            <Grid item xs={12} >
              <ListItemText
                primary={
                  <Typography 
                  variant="subtitle1"
                  style={{"textAlign":"center","color":"rgba(0, 0, 0, 0.6)"}}>
                    No Case Document Found!
                  </Typography>
                }             
              />
            </Grid>
            </Grid>
          </ListItem>

          }

               </List>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="my-task"><MyTask></MyTask></div> */}
    </section>
  );
};

export default CaseDocuments;
