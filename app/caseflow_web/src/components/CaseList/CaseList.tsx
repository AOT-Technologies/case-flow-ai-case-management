import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import RecentCasecard from "../RecentCaseCard/RecentCaseCard";
import "./caselist.scss";
import { setPageSelected } from "../../reducers/newCaseReducer";
import { useDispatch, useSelector } from "react-redux";
import { Case } from "../../interfaces/componentInterface";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";
import { State } from "../../interfaces/stateInterface";
import { GENERIC_NAME, PAGINATION_TAKE } from "../../apiManager/endpoints/config";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

// let  sortingkeysOfAllRecentCases:SortValue[] =[]
// for( let field in allRecentCases[0]){
//   // sortingkeysOfAllRecentCases = [...sortingkeysOfAllRecentCases,{value:field,sortOrder:true}]
//   sortingkeysOfAllRecentCases.push({value:field,sortOrder:true})
// }

const CaseList = React.memo(
  ({ config, allRecentCases, setSortSetting, sortSetting }: any) => {
    // const [sortValue,setSortValue] = useState({value:"",sortOrder:null})
    // const [recentCases,setRecentCases] = useState([...allRecentCases])
    // const [sortSelectValue,setSortSelectValues] = useState(sortingkeysOfAllRecentCases)
    // const [pageNo,setPageNo]= useState(1);
    const dispatch = useDispatch();
    const [totalPCount, setTotalPCount] = useState(0);
    const totalCount = useSelector(
      (state: State) => state.cases.totalCaseCount
    );
    const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
      { text: "Home", link: "/private" },
      { text: GENERIC_NAME, link: "/private/cases" },
    ]);

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
      dispatch(setPageSelected(1));
      fetchCaseDetails();
    }, [totalCount]);

    async function fetchCaseDetails() {
      // let output = allRecentCases;
      const totalPage = Math.ceil(totalCount / Number(PAGINATION_TAKE));
      setTotalPCount(totalPage);
      // output = output.map((element) => {
      //   return {
      //     id :element.id,
      //     name:element.name,
      //     description:element.desc,
      //     status:'open'    //need to change in future
      //   };
      // });
    }

    const caseListpagination = (e, p) => {
      dispatch(setPageSelected(p));
    };

    return (
      <div style={{ padding: "2rem 4rem 0rem 4rem" }}>
        {/* <BreadCrumbs dataForBreadCrumbs={dataForBreadCrumbs}/> */}

        <span className="recent-case-header">
          <Typography variant="h6" className="recent-case-header-font ">
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

        <List>
          <Grid container spacing={1} sx={{ paddingBottom: 1.5 }}>
            <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "id",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                {GENERIC_NAME}
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              onClick={() =>
                setSortSetting({
                  orderBy: "name",
                  orderType: !sortSetting.orderType,
                })
              }
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Name
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Type
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                  >
                    Description
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={2} style={{ "padding-left": "1.5rem" }}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-case-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Status
                  </Typography>
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{ border: 1, color: "#606060" }} />
          {allRecentCases.length != 0 ? (
            allRecentCases.map((eachcases: Case) => (
              <RecentCasecard case={eachcases} key={eachcases.id} />
            ))
          ) : (
            <ListItem>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <ListItemText>
                    <Typography variant="body1" align="center">
                      {" "}
                      No Recent {" "+GENERIC_NAME+ " "} Found!{" "}
                    </Typography>
                  </ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          )}
        </List>
        {config.pagination && totalPCount > 1 && (
          <Pagination
            count={totalPCount}
            shape="rounded"
            className="pagination-case-list"
            onChange={caseListpagination}
          />
        )}
      </div>
    );
  }
);

export default CaseList;
