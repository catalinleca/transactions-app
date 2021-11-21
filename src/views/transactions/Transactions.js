import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, selectTransactions } from "./transactionsSlice";
import { useEffect } from "react";

export const Transactions = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectTransactions);

  console.log("in Transaction - data: ", data);

  useEffect(() => {
    dispatch(fetchTransactions("small"));
  }, [dispatch]);

  return <div />;
};
