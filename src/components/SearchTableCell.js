import { Grid, TableCell, TextField } from "@mui/material";
import * as React from "react";

export const SearchTableCell = ({ searchHandler, flag, ...rest }) => (
  <TableCell align="left" {...rest}>
    <Grid container={true}>
      <Grid item={true}>
        {flag ? (
          <TextField
            placeholder="Search"
            onChange={searchHandler}
            variant="standard"
            fullWidth={true}
            inputProps={{
              style: {
                fontSize: 12
              }
            }}
            style={{
              width: "6rem"
            }}
          />
        ) : (
          <br />
        )}
      </Grid>
    </Grid>
  </TableCell>
);
