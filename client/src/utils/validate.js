export const validateSingleField = (field) => (!field.value ? false : true);

export const validateMultipleFields = (fields) => {
  return [...fields].every((field) => validateSingleField(field));
};

export const validateEmail = (field) => /.*@[a-z0-9.-]*/i.test(field.value);
