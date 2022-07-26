const capitalizeFieldName = field => {
  if (field) {
    return `${field.charAt(0).toUpperCase()}${field.substring(1)}`;
  }
  return field;
};

export default capitalizeFieldName;
