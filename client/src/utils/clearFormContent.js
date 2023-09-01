const clearFormContent = ({ input, quill }) => {
  input.forEach((formInput) => formInput.setValue(""));
  quill.forEach((formQuill) => formQuill.setContent(""));
};

export default clearFormContent;
