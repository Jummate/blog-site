const Input = ({
  type = "text",
  placeholder,
  extraStyles,
  ariaLabel,
  id,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      id={`${id ? id : null}`}
      placeholder={placeholder}
      aria-label={`${ariaLabel ? ariaLabel : null}`}
      className={`p-3 text-sky-900 ${extraStyles ? extraStyles : ""}`}
      value={value}
      disabled={disabled}
      onChange={onChange}
    ></input>
  );
};

export default Input;
