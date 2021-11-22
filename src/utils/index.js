export const flattenObj = (obj, acc = {}) => {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      flattenObj(obj[key], acc);
    } else {
      acc[key] = obj[key];
    }
  }

  return acc;
};
