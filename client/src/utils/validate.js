export const validateSingleField = (field) => (!field.value ? false : true);

export const validateMultipleFields = (fields) => {
  return [...fields].every((field) => validateSingleField(field));
};

export const validateEmail = (field) => /.*@[a-z0-9.-]*/i.test(field.value);

export const validateQuill = (quill) => (!quill.content ? false : true);

export const validateFileUpload = (file) =>
  file.value.length < 1 ? false : true;

export const validatePasswordMatch = (newPassword, confirmPassword) =>
  newPassword.value === confirmPassword.value;
