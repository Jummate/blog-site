import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";

const Menu = ({ onClick }) => {
  const { token } = useContext(AuthContext);
  return (
    <nav className="md:hidden fixed z-10 font-sans flex flex-col gap-5 w-full min-h-screen px-5 top-0 left-0 bg-sky-100 text-sky-600 dark:bg-sky-800 dark:text-sky-100 py-5">
      <div className="flex justify-end text-2xl gap-3">
        <FaTimes
          className="cursor-pointer text-2xl bg-sky-800 dark:bg-sky-100 rounded-full text-sky-100 dark:text-sky-800 hover:bg-inherit dark:hover:bg-inherit hover:text-sky-800 dark:hover:text-sky-100"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-6 items-center">
        <h3 className="text-lg mb-2 text-sky-800 dark:text-sky-200">
          Main Menu
        </h3>
        <Link
          to="/"
          className="hover:underline"
          onClick={onClick}
        >
          Home
        </Link>
        {!token && (
          <Link
            to="login"
            className="hover:underline"
            onClick={onClick}
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Menu;
