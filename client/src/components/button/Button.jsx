const Button = ({ type = "button", extraStyles, children, onClick }) => {
  return (
    <button
      type={type}
      className={`${
        extraStyles && extraStyles
      } p-3 font-bold text-gray-200 block rounded-lg hover:opacity-80`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
