import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import LocationRow from "../LocationsRow/LocationsRow";

export default function LocationsList({ locations }) {
  return (
    <TableContainer sx={{ marginTop: 4, padding: 2 }}>
      <div style={{ padding: "4rem 4rem 0rem 4rem" }}>
        <span className="recent-case-header">
          <Typography variant="h6" className="recent-case-header-font">
            Locations
          </Typography>
        </span>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="subtitle1" className="recent-case-card-style" sx={{ cursor: "pointer" }}>
                ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" className="recent-case-card-style" sx={{ cursor: "pointer" }}>
                Address
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" className="recent-case-card-style" sx={{ cursor: "pointer" }}>
                City
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" className="recent-case-card-style" sx={{ cursor: "pointer" }}>
                Province
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" className="recent-case-card-style">
                Country
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" className="recent-case-card-style" sx={{ cursor: "pointer" }}>
                Postal Code
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location) => (
            <LocationRow key={location.id} location={location} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
