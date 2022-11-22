// Return the unlocalized key for backend calls in the search filters
const getUnlocalizedKey = (arr, value) => {
  const localizedObj = arr.find(obj => Object.values(obj)[0] === value);
  return Object.keys(localizedObj)[0];
};

export default getUnlocalizedKey;
