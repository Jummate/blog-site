const clearFormContent = ({ input, quill = [] }) => {
  if (input) input.forEach((formInput) => formInput.setValue(""));
  if (quill) quill.forEach((formQuill) => formQuill.setContent(""));
};

export default clearFormContent;
