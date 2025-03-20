import React from "react";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Container, Typography } from "@mui/material";

export default function DecisionForm() {
  const [formValues, setFormValues] = React.useState({
    rootDecisionDate: "",
    rootDecisionAgency: "",
    decisionMaker: "",
    referenceNumber: "",
    decisionDate: "",
    issue: "",
    eaoRole: "",
    outcome: "",
  });

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Root Decision Details
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* Root Decision Date */}
        <Grid item xs={3}><Typography>Root Decision Date:</Typography></Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select displayEmpty name="rootDecisionDate" value={formValues.rootDecisionDate} onChange={handleChange}>
              <MenuItem value="">Select a date</MenuItem>
              <MenuItem value="Date 1">Date 1</MenuItem>
              <MenuItem value="Date 2">Date 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Root Decision Agency */}
        <Grid item xs={3}><Typography>Root Decision Agency:</Typography></Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select displayEmpty name="rootDecisionAgency" value={formValues.rootDecisionAgency} onChange={handleChange}>
              <MenuItem value="">Select an agency</MenuItem>
              <MenuItem value="Agency 1">Agency 1</MenuItem>
              <MenuItem value="Agency 2">Agency 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Decision Maker */}
        <Grid item xs={3}><Typography>Decision Maker:</Typography></Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select displayEmpty name="decisionMaker" value={formValues.decisionMaker} onChange={handleChange}>
              <MenuItem value="">Select a decision maker</MenuItem>
              <MenuItem value="Person A">Person A</MenuItem>
              <MenuItem value="Person B">Person B</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Reference Number */}
        <Grid item xs={3}><Typography>Reference #:</Typography></Grid>
        <Grid item xs={9}><TextField fullWidth name="referenceNumber" value={formValues.referenceNumber} onChange={handleChange} /></Grid>
        
        {/* Decision Date */}
        <Grid item xs={3}><Typography>Decision Date:</Typography></Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select displayEmpty name="decisionDate" value={formValues.decisionDate} onChange={handleChange}>
              <MenuItem value="">Select a date</MenuItem>
              <MenuItem value="Date 1">Date 1</MenuItem>
              <MenuItem value="Date 2">Date 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Issues and Outcomes
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* Issue */}
        <Grid item xs={3}><Typography>Issue:</Typography></Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select displayEmpty name="issue" value={formValues.issue} onChange={handleChange}>
              <MenuItem value="">Select an issue</MenuItem>
              <MenuItem value="Issue 1">Issue 1</MenuItem>
              <MenuItem value="Issue 2">Issue 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* EAO Role */}
        <Grid item xs={3}><Typography>EAO Role:</Typography></Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select displayEmpty name="eaoRole" value={formValues.eaoRole} onChange={handleChange}>
              <MenuItem value="">Select a role</MenuItem>
              <MenuItem value="Role 1">Role 1</MenuItem>
              <MenuItem value="Role 2">Role 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Outcome */}
        <Grid item xs={3}><Typography>Outcome:</Typography></Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select displayEmpty name="outcome" value={formValues.outcome} onChange={handleChange}>
              <MenuItem value="">Select an outcome</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Denied">Denied</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                borderColor: "primary.main",
                width: "100%",
                marginTop: 5
              }}
            //   onClick={submitCommunication}
            >
              Submit
            </Button>
    </Container>
  );
};