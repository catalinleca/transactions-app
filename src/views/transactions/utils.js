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

export const sortRows = (rows, { order, orderBy }) => {
  return rows.sort((A, B) => {
    const a = A[orderBy];
    const b = B[orderBy];

    // eslint-disable-next-line eqeqeq
    if (a == null || b == null) return 0;

    if (typeof a === "number" && typeof b === "number") {
      if (order === "asc") {
        return a - b;
      } else if (order === "desc") {
        return b - a;
      }
    }

    if (typeof a === "string" && typeof b === "string") {
      if (order === "asc") {
        return a.localeCompare(b);
      } else if (order === "desc") {
        return b.localeCompare(a);
      }
    }

    const dateA = Date.parse(a);
    const dateB = Date.parse(b);
    if (!isNaN(dateA) && !isNaN(dateB)) {
      if (order === "asc") {
        return dateA - dateB;
      } else if (order === "desc") {
        return dateB - dateA;
      }
    }
  });
};

/**
 * searchObject will be an object like
 * {
 *   userId: "asd" - where asd is the value to search for
 *   date: "x-y-z"
 * }
 */

export const searchRows = (rows, searchObject, columns) => {
  const searchObjectCopy = { ...searchObject };

  if (Object.keys(searchObjectCopy).length === 0) {
    return rows;
  }

  columns.forEach((column) => {
    if (!column.search) {
      delete searchObjectCopy[column.key];
    }
  });

  return rows.filter((row) => {
    return Object.entries(searchObjectCopy).every(([key, searchedValue]) => {
      const currentValue = row[key];

      if (
        typeof currentValue === "string" &&
        typeof searchedValue === "string"
      ) {
        return currentValue.toUpperCase().includes(searchedValue.toUpperCase());
      }

      if (
        typeof currentValue === "number" &&
        typeof searchedValue === "number"
      ) {
        return currentValue === searchedValue;
      }

      /**
       * Extra case for comparing dates.
       */

      return false;
    });
  });
};
