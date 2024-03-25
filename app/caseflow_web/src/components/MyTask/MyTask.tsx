import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import MyTaskCard from "../MyTaskCard/MyTaskCard";
import "./myTask.scss";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import {
  getTaksByUserId,
  getTaskCountByUserId,
} from "../../services/workflowService";
import {
  setUserTaskList,
  setTotalTaskCount,
  setPageSelected,
} from "../../reducers/taskReducer";
import { Pagination } from "@mui/material";
import { GENERIC_NAME, PAGINATION_TAKE } from "../../apiManager/endpoints/config";


const MyTask = () => {
  const dispatch = useDispatch();
  const [totalPCount, setTotalPCount] = useState(1);
  const userName = useSelector(
    (state: State) => state.auth.userDetails.userName
  );
  const taskList = useSelector((state: State) => state.tasks.userTasksList);
  const totalCount = useSelector((state: State) => state.tasks.totalTaskCount);
  const pageSelected = useSelector((state: State) => state.tasks.pageSelected);

  useEffect(() => {
    if (userName) {
      fetchUserTasks();
    }
  }, [userName, pageSelected]);
  const fetchUserTasks = async () => {
    const start = (pageSelected - 1) * Number(PAGINATION_TAKE);
    const tasks = await getTaksByUserId(
      userName,
      start,
      Number(PAGINATION_TAKE)
    );
    getTaskCountByUserId(userName).then((data) => {
      dispatch(setTotalTaskCount(data.count));
    });
    dispatch(setUserTaskList(tasks));
  };
  useEffect(() => {
    dispatch(setPageSelected(1));
    setTotalPgCount();
  }, [totalCount]);

  async function setTotalPgCount() {
    const totalPage = Math.ceil(totalCount / Number(PAGINATION_TAKE));
    setTotalPCount(totalPage);
  }

  const caseListpagination = (e, p) => {
    dispatch(setPageSelected(p));
  };

  return (
    <div className="myTaskStyle" style={{ padding: "2rem 4rem 0rem 4rem" }}>
      <Typography
        sx={{ padding: "1rem 1rem 1rem 0rem" }}
        variant="h6"
        className="myTaskStyle"
      >
        My Tasks
      </Typography>

      <ListItem sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                >
                  Task
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
                >
                  Date Created
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={3}>
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
          <Grid item xs={1.5}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                >
                  Owner
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
                >
                  Complete By
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={1.5} style={{ paddingLeft: "1.5rem" }}>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  className="recent-case-card-style"
                >
                  Status
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </ListItem>
      <Divider sx={{ border: 1, borderColor: "#606060" }} />

      {taskList?.length > 0 ? (
        taskList.map((eachTask, index) => (
          <MyTaskCard key={index} task={eachTask} />
        ))
      ) : (
        <ListItem>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ListItemText>
                <Typography variant="body1" align="center">
                  {" "}
                  No Task Found!{" "}
                </Typography>
              </ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      )}
      {totalPCount > 1 && (
        <Pagination
          count={totalPCount}
          shape="rounded"
          className="pagination-case-list"
          onChange={caseListpagination}
        />
      )}
    </div>
  );
};

export default MyTask;
