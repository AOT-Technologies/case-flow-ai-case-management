import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import RecentCasecard from "../RecentCaseCard";
import { SortCasesByField } from "../../helper/SortCases";
import "./caselist.scss"
import { setCaseList, setPageSelected } from "../../reducers/newCaseReducer";
import {useDispatch, useSelector} from "react-redux";
import { Case } from "../../interfaces/componentInterface";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import { State } from "../../interfaces/stateInterface";
import { PAGINATION_TAKE } from "../../apiManager/endpoints/config";






// let  sortingkeysOfAllRecentCases:SortValue[] =[]
// for( let field in allRecentCases[0]){
//   // sortingkeysOfAllRecentCases = [...sortingkeysOfAllRecentCases,{value:field,sortOrder:true}]
//   sortingkeysOfAllRecentCases.push({value:field,sortOrder:true})
// }


const CaseList =React.memo( ({config,allRecentCases}:any) => {
 

  // const [sortValue,setSortValue] = useState({value:"",sortOrder:null})
  // const [recentCases,setRecentCases] = useState([...allRecentCases])
  // const [sortSelectValue,setSortSelectValues] = useState(sortingkeysOfAllRecentCases)
  const [pageNo,setPageNo]= useState(1);
  const dispatch = useDispatch();
  const [totalPCount,setTotalPCount] = useState(0);
  const totalCount = useSelector((state:State)=>state.cases.totalCaseCount);

  // useEffect(()=>{ 
  //  const updatedSortedData = SortCasesByField(sortValue,recentCases)
  //  setRecentCases(updatedSortedData)
  // },[sortValue])

  // const onSortingValueChangeHandler = (e:any) =>{
  //   let tempSelectedValue = e.target.value;

  //   const updatedSortValueState =sortSelectValue.map(sortValue =>{
  //     if(sortValue.value === tempSelectedValue){
  //       let sortedDummyvalue = {value:tempSelectedValue,sortOrder:!sortValue.sortOrder}
  //       tempSelectedValue = sortedDummyvalue
  //        return sortedDummyvalue
  //       }else return sortValue
      
  //   }) 
  //   setSortSelectValues(updatedSortValueState) 
  //   setSortValue(tempSelectedValue)    
  // }


 // to fetch the case list and set the state of cases 
 useEffect(() => {
  dispatch(setPageSelected(1))
  fetchCaseDetails();   

}, [totalCount]);
  
async function fetchCaseDetails() {       
  let output = allRecentCases;    
  const TotalPage = Math.ceil(totalCount/ Number (PAGINATION_TAKE)) 
  setTotalPCount(TotalPage)
  // output = output.map((element) => {
  //   return {
  //     id :element.id,
  //     name:element.name,
  //     description:element.desc,
  //     status:'open'    //need to change in future
  //   };
  // });   
} 


const caseListpagination = (e,p) =>{ 
  dispatch(setPageSelected(p))
}
  
  return (
    <div style={{ padding: "2rem 3rem 0rem 5rem" }}>
      <span className="recent-case-header">
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
        className="recent-case-header-font "
      >
        {config.title}
      </Typography>     
      {/* { config.isShowSort ? <FormControl sx={{ m: 1, minWidth: 120, }}>
        <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sorting"
            value={sortValue.value}
            onChange={onSortingValueChangeHandler}
          >
            {sortSelectValue.map((sortField,index) =>{
              return <MenuItem value={sortField.value} key={index} >{sortField.value} </MenuItem>
            })}
           
         </Select>
        </FormControl> : "" } */}
      </span>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <div >

      <List
       
        className="superbassClass"
        component="nav"
        aria-label="mailbox folders"

         >

        {allRecentCases.length!=0 ? allRecentCases.map((eachcases:Case) => (
          <RecentCasecard
            case = {eachcases}
            key={eachcases.id}            
          />
        )):
        <ListItem >
          <Grid container spacing={1}  >
          <Grid item xs={12} >
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" ,"textAlign":"center","color":"rgba(0, 0, 0, 0.6)"}}>
                  No Recent Cases Found!
                </Typography>
              }             
            />
          </Grid>
          </Grid>
        </ListItem>
        }
      </List>
        {(config.pagination && totalPCount >1) &&  <Pagination count={totalPCount} shape="rounded" className="pagination-case-list" onChange={caseListpagination} />}
      </div>

    </div>
  );
});

export default CaseList;