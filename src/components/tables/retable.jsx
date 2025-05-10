// src/components/ReTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';


export default function ReTable({ columns, rows, actions: Actions}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="reusable table">
        <TableHead>
          <TableRow>
            {columns.map(col => <TableCell key={col.field}>{col.headerName}</TableCell>)}
            {Actions && <TableCell>Actions</TableCell>}            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row[columns[0].field]}>
              {columns.map(col => (               
                <TableCell key={col.field}>
                  {row[col.field]}
                </TableCell>))}
              {Actions && (<TableCell><Actions row={row} /></TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
