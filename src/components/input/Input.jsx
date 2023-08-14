const Input = ({ type = "text", placeholder, extraStyles }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`p-3 text-sky-900 ${extraStyles ? extraStyles : ""}`}
    ></input>
  );
};

export default Input;
