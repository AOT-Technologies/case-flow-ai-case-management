import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Box,
  Select,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { createRootDecisionService, createIssueDecisionService, createCaseDecisionService } from "../../services/DecisionService";

export default function DecisionForm(props) {
  const issues = props.issues
  const caseId = props.caseId
  const closeDecisionPopUp = props.closeDecisionPopUp
  const submitDecision = props.submitDecision
  // const issues = ["Penalties"];
  const eaoRoles = ["Appellant", "Cross Appeal", "Respondant"];
  const decisionAgency = ["WorkSafeBC", "RD", "WCAT", "Board of Directors"];
  const decisionMakers = ["RD", "WSBC"];
  const outcomes = [
    "Pending",
    "Denied",
    "Allowed",
    "Varied",
    "Settled at Mediation",
    "Return to WSBC",
    "Suspended",
    "Withdrawn",
  ];

  const handleSubmit = async() => {
    submitDecision(formValues)
  }

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (index !== undefined) {
      const updatedIssues = [...formValues.issues];
      updatedIssues[index] = { ...updatedIssues[index], [name]: value };
      setFormValues({ ...formValues, issues: updatedIssues });
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const issuesArray = Array.isArray(issues) ? issues : [issues];

  const initializeIssues = issuesArray.map((issue) => ({
    issue: issue,
    eaoRole: "",
    outcome: "",
    impact: "",
  }));

  // const initializeIssues = issues.map((issue) => ({
  //   issue: issue,
  //   eaoRole: "",
  //   outcome: "",
  //   impact: "",
  // }));

  const [formValues, setFormValues] = React.useState({
    rootDecisionDate: "",
    rootDecisionAgency: "",
    decisionMaker: "",
    referenceNumber: "",
    decisionDate: "",
    issues: initializeIssues,
  });

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Root Decision Details
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography>Root Decision Date:</Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <TextField
              type="date"
              name="rootDecisionDate"
              value={formValues.rootDecisionDate}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Typography>Root Decision Agency:</Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <Select
              displayEmpty
              name="rootDecisionAgency"
              value={formValues.rootDecisionAgency}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="">Select an agency</MenuItem>
              {decisionAgency.map((agency) => (
                <MenuItem key={agency} value={agency}>
                  {agency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Typography>Decision Maker:</Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <TextField
              name="decisionMaker"
              value={formValues.decisionMaker}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Typography>Reference #:</Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            name="referenceNumber"
            value={formValues.referenceNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography>Decision Date:</Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="outlined">
            <TextField
              type="date"
              name="decisionDate"
              value={formValues.decisionDate}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
        Issues and Outcomes
      </Typography>
      {formValues.issues.map((issue, index) => (
        <Box key={index}>
          {index > 0 && (
            <hr style={{ margin: "20px 0", border: "1px solid #ccc" }} />
          )}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography>Issue:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body1">{issue.issue}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>EAO Role:</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant="outlined">
                <Select
                  displayEmpty
                  name="eaoRole"
                  value={issue.eaoRole}
                  onChange={(e) => handleChange(e, index)}
                >
                  <MenuItem value="">Select a role</MenuItem>
                  {eaoRoles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Typography>Outcome:</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant="outlined">
                <Select
                  displayEmpty
                  name="outcome"
                  value={issue.outcome}
                  onChange={(e) => handleChange(e, index)}
                >
                  <MenuItem value="">Select an outcome</MenuItem>
                  {outcomes.map((outcome) => (
                    <MenuItem key={outcome} value={outcome}>
                      {outcome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Typography>Impact ($):</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                type="number"
                name="impact"
                value={issue.impact}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter amount"
                inputProps={{ step: "0.01", min: "0" }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "primary.main",
          borderColor: "primary.main",
          width: "100%",
          marginTop: 5,
        }}
      >
        Submit
      </Button>
    </Container>
  );
}
