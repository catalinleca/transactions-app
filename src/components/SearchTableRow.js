import { TableRow } from "@mui/material";
import * as React from "react";
import { SearchTableCell } from "./SearchTableCell";

export const SearchTableRow = ({ columns, handleSearch }) =>
  columns.find((column) => column.search) ? (
    <TableRow>
      {columns.map((column) => (
        <SearchTableCell
          key={`${column.value}${column.key}`}
          searchHandler={handleSearch(column)}
          placeholder={`Search ${column.value}`}
          flag={column.search}
        />
      ))}
    </TableRow>
  ) : null;
