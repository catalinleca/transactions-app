import * as React from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MaterialTable,
  TablePagination
} from "@mui/material";
import { useState } from "react";
import { Pagination } from "./Pagination";

export const Table = ({ rows = [], columns = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const total = rows.length;
  const totalPages = Math.ceil(total / rowsPerPage);

  const activeRows = rows.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handlerSetPage = (event, newPage) => {
    console.log("newPage: ", newPage);
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <MaterialTable sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={`${column.value}${column.key}`} align="center">
                  {column.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {activeRows.map((row) => (
              <TableRow key={`${row.user}`}>
                {columns.map((column) => (
                  <TableCell key={column.key} align="left">
                    {column.format
                      ? column.format(row[column.key])
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={currentPage}
        onPageChange={handlerSetPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 10]}
      />
    </Paper>
  );
};
