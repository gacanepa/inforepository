const getLocalizedValue = (arr, value) => {
  const localizedObj = arr.find(obj => Object.keys(obj)[0] === value);
  return Object.values(localizedObj)[0];
};

export default getLocalizedValue;
