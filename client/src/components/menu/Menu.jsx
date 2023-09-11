import { FaTimes } from "react-icons/fa";
// import { menuData } from "../../data";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";
import Button from "../button/Button";

const Menu = ({ onClick }) => {
  const { token } = useContext(AuthContext);
  return (
    <nav className="md:hidden fixed z-10 font-sans flex flex-col gap-5 w-full min-h-screen px-5 top-0 left-0 bg-sky-100 text-sky-600 dark:bg-sky-800 dark:text-sky-100 py-5">
      <div className="flex justify-end text-2xl gap-3">
        {/* {ColorMode} */}
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
        {token && (
          <Link
            to="create"
            className="hover:underline"
            onClick={onClick}
          >
            Create New Post
          </Link>
        )}
        {token && (
          <Button extraStyles="shadow-pref bg-sky-900 dark:bg-sky-600 dark:text-slate-50 px-10">
            Log Out
          </Button>
        )}
      </div>
      {/* {Object.keys(menuData).map((heading, index) => (
        <div
          key={index}
          className="flex flex-col gap-2"
        >
          <h3 className="text-lg mb-2 text-sky-800 dark:text-sky-200">
            {heading}
          </h3>
          {Object.keys(menuData[`${heading}`]).map((item) => (
            <Link
              key={`${index}${item}`}
              to={`${menuData[`${heading}`][`${item}`].link}`}
              className="hover:underline"
              onClick={onClick}
            >
              {item}
            </Link>
          ))}
          {index === 0 ? (
            <hr className="mt-3 border-sky-800/20 dark:border-sky-200/20 border-2" />
          ) : null}
        </div>
      ))} */}
    </nav>
  );
};

export default Menu;
