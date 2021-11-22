import * as React from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  selectIsLoading,
  selectTransactions
} from "./transactionsSlice";
import { flattenObj } from "../../utils";
import { Table } from "../../components/Table";
import moment from "moment";

const flattenTransactions = (transactions) => {
  return Object.keys(transactions).map((key) => ({
    user: key,
    ...flattenObj(transactions[key])
  }));
};

const columns = [
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
  const isLoading = useSelector(selectIsLoading);

  console.log("in Transaction - data: ", allTransactions);

  useEffect(() => {
    dispatch(fetchTransactions("large"));
  }, [dispatch]);

  const flatUsersTransactions = useMemo(
    () => flattenTransactions(allTransactions),
    [allTransactions]
  );

  console.log("flatUsersTransactions: ", flatUsersTransactions);

  return !flatUsersTransactions.length ? (
    <div>Loading</div>
  ) : (
    <div>
      <Table rows={flatUsersTransactions} columns={columns} />
    </div>
  );
};
