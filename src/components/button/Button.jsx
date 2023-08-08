const Button = ({ type = "text", text, extraStyles }) => {
  return (
    <button
      type={type}
      className={`p-3 font-bold bg-sky-900 text-gray-300 block rounded-lg hover:opacity-80 ${
        extraStyles ? extraStyles : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
