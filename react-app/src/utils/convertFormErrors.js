const convertFormErrors = (errorsObj) => {
  const errors = [];
  for (const field in errorsObj) {
    errors.push(`${field[0].toUpperCase() + field.slice(1)}: ${errorsObj[field]}`)
  }
  return errors;
};

export default convertFormErrors;
