const Input = ({
  type = "text",
  placeholder,
  extraStyles,
  ariaLabel,
  id,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      id={`${id ? id : null}`}
      placeholder={placeholder}
      aria-label={`${ariaLabel ? ariaLabel : null}`}
      className={`p-3 text-sky-900 ${extraStyles ? extraStyles : ""}`}
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default Input;
