const validateSingleField = (field) => (!field.value ? false : true);

export const validateMultipleFields = (fields) => {
  return [...fields].every((field) => validateSingleField(field));
};
