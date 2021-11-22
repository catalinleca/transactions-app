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
import { useEffect, useMemo, useState } from "react";
import { searchRows, sortRows } from "../views/transactions/utils";
import { IconTableCell } from "./IconTableCell";
import { SearchTableRow } from "./SearchTableRow";

export const Table = ({ rows = [], columns = [], onClickColumnHandler }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchObject, setSearchObject] = useState({});
  const [sortObj, setSortObj] = useState({ order: "asc", orderBy: "id" });

  const searchedRows = useMemo(
    () => searchRows(rows, searchObject, columns),
    [rows, searchObject, columns]
  );
  const sortedRows = useMemo(
    () => sortRows(searchedRows, sortObj),
    [searchedRows, sortObj]
  );
  const activeRows = sortedRows.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const total = searchedRows.length;

  useEffect(() => {}, [columns]);

  const handlerSetPage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleSearch = (column) => (event) => {
    const value = event.target.value;
    setCurrentPage(0);

    if (value) {
      setSearchObject((prevSearchObject) => ({
        ...prevSearchObject,
        [column.key]: value
      }));
    } else {
      const newSearchObject = { ...searchObject };
      delete newSearchObject[column.key];
      setSearchObject(newSearchObject);
    }
  };

  const handleSort = (column) => {
    setCurrentPage(0);
    setSortObj((prevState) => ({
      orderBy: column,
      order: prevState.order === "asc" ? "desc" : "asc"
    }));
  };

  const upArrow = <span>&#8593;</span>;
  const downArrow = <span>&#8595;</span>;
  const currentArrow = sortObj.order === "asc" ? upArrow : downArrow;

  return (
    <Paper sx={{ width: "100%", mb: 2 }} elevation={3}>
      <TableContainer>
        <MaterialTable sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <IconTableCell
                  key={`${column.key}`}
                  icon={currentArrow}
                  sortHandler={() => handleSort(column.key)}
                  flag={column.sort}
                  onClickColumn={() => onClickColumnHandler(column)}
                >
                  {column.value}
                </IconTableCell>
              ))}
            </TableRow>

            <SearchTableRow columns={columns} handleSearch={handleSearch} />
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
