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
    finalCurrencies[newCurrency] = +(
      finalCurrencies[newCurrency] + +newAmount
    ).toFixed(2);
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
    timestamp: newTimestamp.toISOString(),
    currencies: newCurrencies
  };
};

/**
 * Validate when data comes invalid
 */
export const getFinalUsersTransactions = (allTransactions) => {
  return allTransactions.reduce((acc, currentTransaction) => {
    const { user_id, timestamp, currency, amount } = currentTransaction;

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
