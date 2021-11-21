import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction, TransactionsTypes } from "../../client";
import apiClient from "../../app/client";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (transactionType: TransactionsTypes) => {
    console.log("in fetchTransaction: ", transactionType);
    let call;

    // usually I would've implemented one function for each type but for the sake
    // of simplicity I will use a switch
    switch (transactionType) {
      case "small":
        call = apiClient.transactions.getSmall();
        break;
      case "medium":
        call = apiClient.transactions.getMedium();
        break;
      case "large":
        call = apiClient.transactions.getLarge();
        break;
    }

    const response = await call;

    console.log("response: ", response);

    return response.data;
  }
);

type TransactionsState = {
  transactions: Transaction[];
  loading: boolean;
  error: any;
};

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTransactions.pending.type]: (state, action) => {
      console.log("PENDING current state: ", state);
      console.log("PENDING current action: ", action);
    },
    [fetchTransactions.fulfilled.type]: (state, action) => {
      console.log("FULFILLED current state: ", state.loading);
      console.log("FULFILLED current action: ", action.payload);

      state.transactions = action.payload;
    },
    [fetchTransactions.rejected.type]: (state, action) => {
      console.log("REJECTED current state: ", state);
      console.log("REJECTED current action: ", action);
    }
  }
});

export const selectTransactions = (state: any) => state.transactions;

export default transactionsSlice.reducer;
