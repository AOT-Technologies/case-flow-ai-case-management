import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Box,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getCaseDecisionByCaseId } from "../../services/DecisionService";

interface CaseDecisionData {
  rootDecision: {
    id: number;
    decisionMaker: string;
    referenceNumber: string;
    rootDecisionDate: string;
    decisionDate: string;
    rootDecisionAgency: string;
  };
  issueDecisions: {
    id: number;
    issue: string;
    eaoRole: string;
    outcome: string;
    impact: number;
  }[];
}

export default function Decision(props) {
  const caseId = props.caseId;
  const decisionData = props.decisionData

  if (
    !decisionData ||
    !decisionData.rootDecision ||
    decisionData.issueDecisions?.length === 0
  ) {
    return (
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Typography variant="body1" className="no-case-doc-found">
          No Decisions Found !
        </Typography>
      </TableContainer>
    );
  }

  const { rootDecision, issueDecisions } = decisionData;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Root Decision Summary
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Decision Maker</Typography>
            <Typography>{rootDecision.decisionMaker}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Reference Number</Typography>
            <Typography>{rootDecision.referenceNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Root Decision Date</Typography>
            <Typography>{rootDecision.rootDecisionDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Decision Date</Typography>
            <Typography>{rootDecision.decisionDate}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Agency</Typography>
            <Typography>{rootDecision.rootDecisionAgency}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Issues and Outcomes
      </Typography>

      {issueDecisions.map((issue, index) => (
        <Box key={issue.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {issue.issue}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body2">EAO Role</Typography>
              <Typography>{issue.eaoRole}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Outcome</Typography>
              <Typography>{issue.outcome}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Impact ($)</Typography>
              <Typography>${issue.impact}</Typography>
            </Grid>
          </Grid>

          {index !== issueDecisions.length - 1 && <Divider sx={{ my: 3 }} />}
        </Box>
      ))}
    </Container>
  );
}
