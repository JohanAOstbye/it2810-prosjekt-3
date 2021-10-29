import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";


// DenseTable, takes in a parameter array of rows, returns a Dense Table
function DenseTable(props: any) {

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          {props.rows.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Typography variant="body2">{row.name}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">{row.value}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default DenseTable;
