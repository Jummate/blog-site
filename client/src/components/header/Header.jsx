import { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import Menu from "../menu/Menu";
import ColorMode from "../ColorMode";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { AuthContext } from "../../contexts/AuthProvider";

const Header = () => {
  const { token } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  const [colorMode, setColorMode] = useState(
    localStorage.hasOwnProperty("colorMode")
      ? localStorage.getItem("colorMode")
      : null
  );

  useEffect(() => localStorage.setItem("colorMode", colorMode), [colorMode]);

  return (
    <header className="w-full p-5 md:px-10 font-sans font-bold sticky top-0 left-0 bg-slate-100 text-sky-900 dark:bg-sky-900 dark:text-slate-100 z-10">
      <nav className="flex justify-between items-center">
        <h1 className="cursor-pointer"> Leo's Blog</h1>
        <div className="hidden md:flex md:text-md gap-6 items-center">
          <Link
            to="/"
            className="hover:underline"
          >
            Home
          </Link>
          {!token && (
            <Link
              to="login"
              className="hover:underline"
            >
              Log In
            </Link>
          )}
          {token && (
            <Link
              to="create"
              className="hover:underline"
            >
              Create New Post
            </Link>
          )}
          {token && (
            <Button extraStyles="shadow-pref bg-sky-900 dark:bg-sky-600 dark:text-slate-50">
              Log Out
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          <ColorMode
            colorMode={colorMode}
            setColorMode={setColorMode}
          />

          <FaBars
            className="md:hidden cursor-pointer text-2xl hover:text-sky-300"
            onClick={() => setOpenMenu(true)}
          />
        </div>
      </nav>
      {openMenu ? (
        <Menu
          // ColorMode={
          //   <ColorMode
          //     colorMode={colorMode}
          //     setColorMode={setColorMode}
          //   />
          // }
          onClick={() => setOpenMenu(false)}
        />
      ) : null}
    </header>
  );
};

export default Header;
