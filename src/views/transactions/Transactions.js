import * as React from "react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, selectTransactions } from "./transactionsSlice";

const calculateNewCurrencies = (
  oldCurrencies,
  { currency: newCurrency, amount: newAmount }
) => {
  const finalCurrencies = {
    ...oldCurrencies
  };

  if (!(newCurrency in oldCurrencies)) {
    finalCurrencies[newCurrency] = +newAmount;
  } else {
    finalCurrencies[newCurrency] = finalCurrencies[newCurrency] + +newAmount;
  }

  return finalCurrencies;
};

const calculateNewData = (oldUserData, newUserData) => {
  const oldUserTimestamp = new Date(oldUserData.timestamp);
  const newUserTimestamp = new Date(newUserData.timestamp);
  const newTimestamp =
    oldUserTimestamp > newUserTimestamp ? oldUserTimestamp : newUserTimestamp;

  const newCurrencies = calculateNewCurrencies(
    oldUserData.currencies,
    newUserData
  );

  return {
    timestamp: newTimestamp,
    currencies: newCurrencies
  };
};

/**
 * Validate when data comes invalid
 */
const getFinalUsersTransactions = (allTransactions) => {
  return allTransactions.reduce((acc, currentTransaction) => {
    const { user_id, timestamp, currency, amount } = currentTransaction;

    debugger;
    if (!(user_id in acc)) {
      acc[user_id] = {
        timestamp,
        currencies: {
          [currency]: +amount
        }
      };
    } else {
      const oldUserData = acc[user_id];
      acc[user_id] = calculateNewData(oldUserData, {
        timestamp,
        currency,
        amount
      });
    }

    return acc;
  }, {});
};

export const Transactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectTransactions);

  console.log("in Transaction - data: ", allTransactions);

  useEffect(() => {
    dispatch(fetchTransactions("large"));
  }, [dispatch]);

  const finalUsersTransactions = useMemo(
    () => getFinalUsersTransactions(allTransactions),
    [allTransactions]
  );

  console.log("finalUsersTransactions: ", finalUsersTransactions);

  return <div>Mare div</div>;
};
