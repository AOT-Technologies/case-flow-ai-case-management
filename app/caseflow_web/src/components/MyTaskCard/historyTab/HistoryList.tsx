import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import "./historylist.scss";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { State } from "../../../interfaces/stateInterface";
import {
  GENERIC_NAME,
} from "../../../apiManager/endpoints/config";
import { TaskHistory } from "../../../interfaces/componentInterface";
import { getHistoryByApplicationId } from "../../../services/formsService";
import HistoryCard from "./HistoryCard";

const HistoryList = (props) => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const totalCount = useSelector(
      (state: State) => 10
    );
    
    const [dataForBreadCrumbs, setDataForBreadCrumbs] = useState([
      { text: "Home", link: "/private" },
      { text: GENERIC_NAME, link: "/private/individuals" },
    ]);

    useEffect(() => {
      if(!loaded) {
        fetchHistoryList(props?.applicationId);
        setLoaded(true)
      }
    }, [loaded]);
    async function fetchHistoryList(applicationId) {
      const history = await getHistoryByApplicationId(applicationId);
      setHistoryList(history.applications);
    }

    return (
      <div>
        <List>
          <Grid container spacing={1} sx={{ paddingBottom: 1.5 }}>
          <Grid
              item
              xs={3}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Status
                  </Typography>
                }
              />
              </Grid>
            <Grid
              item
              xs={3}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Created Date
                  </Typography>
                }
              />
              </Grid>
              <Grid
              item
              xs={3}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Submitted By
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={3}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    className="recent-individual-card-style"
                    sx={{ cursor: "pointer" }}
                  >
                    Submissions
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          <Divider sx={{ border: 1, color: "#606060" }} />
          {historyList?.length != 0 ? (
            historyList?.map((taskHistory: TaskHistory) => (
              <HistoryCard history={taskHistory} key={taskHistory.created} />
            ))
          ) : (
            <ListItem>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <ListItemText>
                    <Typography variant="body1" align="center">
                      {" "}
                      No History Found!{" "}
                    </Typography>
                  </ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          )}
        </List>
      </div>
    );
};

export default HistoryList;