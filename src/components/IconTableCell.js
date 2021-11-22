import * as React from "react";
import { Button, Grid, IconButton, TableCell, Typography } from "@mui/material";

export const IconTableCell = ({
  children,
  icon,
  sortHandler,
  flag,
  onClickColumn,
  ...rest
}) => (
  <TableCell align="center" {...rest}>
    <Grid container={true} wrap="nowrap" spacing={2} alignItems="center">
      <Grid item={true} onClick={onClickColumn}>
        <Button>
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {children}
          </Typography>
        </Button>
      </Grid>
      {flag && (
        <Grid
          item={true}
          sx={{
            paddingBottom: 0.5
          }}
        >
          <IconButton size="small" onClick={sortHandler}>
            <Typography>{icon}</Typography>
          </IconButton>
        </Grid>
      )}
    </Grid>
  </TableCell>
);
