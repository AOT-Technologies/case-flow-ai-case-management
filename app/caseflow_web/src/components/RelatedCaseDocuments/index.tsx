import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDocumentofCaseList } from "../../services/CaseService";


// function createData(
//   name: string,
//   size: number,
//   creationDate: Date,
//   lastUpdated: Date,
//   version: number,
// ) {
//   return { name, size, creationDate, lastUpdated, version };
// }


export default function RelatedCaseDocuments({id}) {


  async function fetchCaseDetails() {
    if(id){
      let output = await getDocumentofCaseList(id);
      (setdocDetail(output))
    }

  
  }
  const [docDetail, setdocDetail] :any = useState([]);
  useEffect(() => {
    fetchCaseDetails();
  }, [id]);


  return (
    <TableContainer component={Paper} sx={{ boxShadow : 0}}>
      <Table sx={{ minWidth: 650 ,border : 0}} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell  sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Name</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Size</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Creation Date</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Last Updated</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docDetail.map((row) => (
            <TableRow
              key={row.name}
              sx={{  border: 0 }}
            >
              <TableCell style={{borderBottom: "none"}} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.size ? row.size : "1kb"}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.creationdate}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.creationdate}</TableCell>
              <TableCell  style={{borderBottom: "none"}} align="right">{row.latestversion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}