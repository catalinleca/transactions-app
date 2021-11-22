import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, selectTransactions } from "./transactionsSlice";
import { flattenObj } from "../../utils";
import { Table } from "../../components/Table";
import moment from "moment";
import { Grid } from "@mui/material";

const flattenTransactions = (transactions) => {
  return Object.keys(transactions).map((key) => ({
    user: key,
    ...flattenObj(transactions[key])
  }));
};

const initColumns = [
  {
    key: "user",
    value: "User"
  },
  {
    key: "GBP",
    value: "GBP"
  },
  {
    key: "EUR",
    value: "EUR"
  },
  {
    key: "USD",
    value: "USD"
  },
  {
    key: "timestamp",
    value: "Last Transaction",
    format: (value) => moment(value).format("DD-MM-YYYY, h:mm:ss a")
  }
];

export const Transactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectTransactions);
  const [columns, setColumns] = useState(initColumns);

  useEffect(() => {
    dispatch(fetchTransactions("large"));
  }, [dispatch]);

  /**
   * Just playing around real quick
   */
  const onClickColumnHandler = ({ key }) => {
    const foundColumn = columns.find(
      ({ key: currentColumnKey }) => currentColumnKey === key
    );

    if (foundColumn.count === undefined) {
      foundColumn.count = 1;
    } else if (foundColumn.count >= 3) {
      foundColumn.count = 0;
    } else {
      foundColumn.count++;
    }

    const updatedColumns = columns.map((column) => {
      if (column.key === foundColumn.key) {
        return foundColumn;
      } else {
        return column;
      }
    });

    const columnsWithFilter = updatedColumns.map((column) => {
      const newColumn = {
        ...column
      };

      switch (column.count) {
        case 0:
          newColumn.sort = false;
          newColumn.search = false;
          break;
        case 1:
          newColumn.sort = true;
          newColumn.search = false;
          break;
        case 2:
          newColumn.sort = false;
          newColumn.search = true;
          break;
        case 3:
          newColumn.sort = true;
          newColumn.search = true;
          break;
      }

      return newColumn;
    });

    setColumns(columnsWithFilter);
  };

  const flatUsersTransactions = useMemo(
    () => flattenTransactions(allTransactions),
    [allTransactions]
  );

  return flatUsersTransactions.length ? (
    <Grid
      container={true}
      sx={{
        marginTop: 2
      }}
    >
      <Table
        rows={flatUsersTransactions}
        columns={columns}
        onClickColumnHandler={onClickColumnHandler}
      />
    </Grid>
  ) : null;
};
