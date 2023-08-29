import { useState } from "react";

export function useFormInput(initialValue, inputType = undefined) {
  const [value, setValue] = useState(initialValue);
  const [content, setContent] = useState(initialValue);

  const handleChange = (e) =>
    !inputType ? setValue(e.target.value) : setValue(e.target.files);
  const handleContentChange = (newValue) => setContent(newValue);

  return {
    value,
    onChange: handleChange,
    content,
    onContentChange: handleContentChange,
  };
}
