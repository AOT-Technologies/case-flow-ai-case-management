import React, { useEffect, useState } from "react";
import NoData from "./nodashboard";
import {  fetchDashboardDetails, fetchUserDashboards, } from "../../services/reportService";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";

const Reports = () => {
  const userName = useSelector(
    (state: State) => state.auth.userDetails.userName
  );

  const [dashboardSelected, setDashboardSelected] = useState<any>();
  const [options, setOptions] = useState([]);
  const [dashboards, setDashboards] = useState<any>();
  const [activeDashboard, setActiveDashboard] = useState<any>();

  useEffect(() => {
    async function fetchDashboards() {
      let response = await fetchUserDashboards();
      setDashboards(response)
    }
    fetchDashboards()
  }, [])
  useEffect(() => {
      if (dashboards?.length > 0) {
        let options = dashboards.map((item) => ({
          label: item.resourceDetails.name,
          value: item.resourceId,
        }));
        setOptions(options);
        setDashboardSelected(options[0]);
      }
  }, [dashboards]);

  useEffect(() => {
      
    async function getDashboardDetails() {
        if (dashboardSelected) {
        let dashboardDetails =  await fetchDashboardDetails(dashboardSelected.value)
        setActiveDashboard(dashboardDetails)
      }
    }
    getDashboardDetails()
  }, [dashboardSelected]);
  
  const NoPublicUrlMessage = () => (
    <div className="h-100 col-12 text-center div-middle">
      <i className="fa fa-tachometer fa-lg" />
      <br></br>
      <br></br>
      <label>
        No Public url found
      </label>
    </div>
  );

  return (
    <div>
      <div className="header-search">
        <Typography variant="body1" className="title">
          CaseFlow
        </Typography>
      </div>
      <div className="insights-body" style={{"paddingLeft":"5%"}}>
              <div className="case-document-list">
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ padding: "1rem 1rem 1rem 0rem" }}
                      variant="h6"
                      className="case-document-title"
                    >
                      Insights
                    </Typography>
                  </Grid>
                </Grid>
                <div>
                {options.length > 0 && (
                  <Select
                    aria-label="Select Dashboard"
                    onChange={(e)=>setDashboardSelected(e.target)}
                    placeholder="Select Dashboard"
                    value={activeDashboard?.id.toString()}
                    style={{"width": '50%', "marginBottom":'5%'}}
                  >
                    {options.map(dashboard => (
                    <MenuItem value={dashboard.value}>{dashboard.label}</MenuItem>
                    ))}
                  </Select>
                )}
                </div>
                {options.length > 0 ? (
                  <>
                    {activeDashboard?.public_url ? (
                      <iframe
                        
                        style={{"position":'absolute',"height":"-webkit-fill-available",
                        "width":"-webkit-fill-available"}}
                        title="dashboard"
                        className="w-100 min-vh-60 overflow-visible border-none"
                        src={activeDashboard?.public_url}
                      />
                    ) : (
                      <NoPublicUrlMessage />
                    )
                    }
                  </>
                )
                : (
                  <NoData />
                )}
              </div>
          </div>
    </div>
  );
};

export default Reports;
