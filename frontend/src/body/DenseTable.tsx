import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";


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
