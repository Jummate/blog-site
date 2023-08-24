const Button = ({ type = "button", text, extraStyles }) => {
  return (
    <button
      type={type}
      className={`${
        extraStyles && extraStyles
      } p-3 font-bold text-gray-200 block rounded-lg hover:opacity-80`}
    >
      {text}
    </button>
  );
};

export default Button;
