const TextArea = ({
  placeholder,
  extraStyles,
  ariaLabel,
  id,
  value,
  onChange,
}) => {
  return (
    <textarea
      id={`${id ? id : null}`}
      placeholder={placeholder}
      aria-label={`${ariaLabel ? ariaLabel : null}`}
      className={`p-3 text-sky-900 ${extraStyles ? extraStyles : ""}`}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;
