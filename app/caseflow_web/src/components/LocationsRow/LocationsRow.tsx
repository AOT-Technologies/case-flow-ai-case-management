import {
  Typography,
  Box,
  TableCell,
  TableRow,
  IconButton,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { searchCases } from "../../services/CaseService";
import { getContactDetailsByIds } from "../../services/ContactService";
import CaseList from "../CaseList/CaseList";

export default function LocationRow(props) {
  const location = props.location;
  const [open, setOpen] = useState(false);
  const postalCode = () => {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  };

  const caseListProps = {
    title: "Related Cases",
  };

  const [recentCases, setrecentCases] = useState([]);

  const [searchColumn] = useState("locationid");

  const relatedCaseList = async (locationid: string) => {
    console.log("output id is", locationid);

    let recentCases = await searchCases(
      locationid.toString(),
      "locationid",
      1,
      "id",
      true,
      true,
      null,
      null
    );
    let searchResultCases = recentCases?.Cases?.map((element) => {
      return { ...element, status: "Open" };
    });

    console.log("case results", searchResultCases);

    let contacts = await searchResultCases?.reduce(function (pV, cV) {
      pV.push(parseInt(cV.contactid));
      return pV;
    }, []);

    let contactsList =
      contacts.length > 0 ? await getContactDetailsByIds(contacts) : [];

    let contactsKey = new Map<string, string>();
    contactsList?.map((contact) => {
      contactsKey.set(contact.id, contact.firstname + " " + contact.lastname);
    });

    searchResultCases = searchResultCases?.map((element) => {
      element.contactname = contactsKey.get(element.contactid);
      // element.individualname = individualsKey.get(element.individualid);
      return element;
    });

    setrecentCases(searchResultCases);
  };

  const getCasesByLocation = () => {
    const locationid = location.id;
    console.log('location id is', locationid)
    relatedCaseList(locationid);
  };

  useEffect(() => {
    getCasesByLocation();
  }, []);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="body2" className="caseName-case-list" noWrap>
            {location.id}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" className="caseName-case-list" noWrap>
            {location.address}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" className="caseName-case-list" noWrap>
            {location.city}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" className="caseName-case-list" noWrap>
            BC
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" className="caseName-case-list" noWrap>
            Canada
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" className="caseName-case-list" noWrap>
            {postalCode()}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box margin={1}>
              <Typography variant="subtitle1" gutterBottom>
                Additional Details
              </Typography>
              <Typography variant="body2">
                More details about this location can go here.
              </Typography>
            </Box> */}
            <CaseList config={caseListProps} allRecentCases={recentCases} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
