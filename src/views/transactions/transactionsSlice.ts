import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction, TransactionsTypes } from "../../client";
import apiClient from "../../app/client";
import { getFinalUsersTransactions } from "./utils";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (transactionType: TransactionsTypes) => {
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
    const allTransactions = response.data;
    return getFinalUsersTransactions(allTransactions);
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
    [fetchTransactions.pending.type]: (state) => {
      if (state.loading) {
        state.loading = true;
      }
    },
    [fetchTransactions.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    [fetchTransactions.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export const selectTransactions = (state: any) =>
  state.transactions.transactions;

export const selectIsLoading = (state: any) => state.transactions.loading;

export default transactionsSlice.reducer;
