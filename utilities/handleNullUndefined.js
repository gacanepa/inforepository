const handleNullUndefined = value => {
  if (![null, undefined].includes(value)) return String(value);

  return value;
};

export default handleNullUndefined;
