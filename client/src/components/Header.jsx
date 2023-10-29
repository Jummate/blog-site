import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import jwt_decode from "jwt-decode";

import Menu from "./Menu";
import ProfileMenu from "./ProfileMenu";
import ColorMode from "./ColorMode";
import { AuthContext } from "../contexts/AuthProvider";
import transformImage from "../utils/transformImage";
import { transformConfig } from "../config/imgTransform";

const Header = () => {
  const { token } = useContext(AuthContext);
  const decoded = token && jwt_decode(token);
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [colorMode, setColorMode] = useState(
    localStorage.hasOwnProperty("colorMode")
      ? localStorage.getItem("colorMode")
      : null
  );

  useEffect(() => localStorage.setItem("colorMode", colorMode), [colorMode]);

  return (
    <header className="w-full p-5 md:px-10 font-sans font-bold sticky top-0 left-0 bg-slate-100 text-sky-900 dark:bg-sky-900 dark:text-slate-100 z-10">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <h1 className="cursor-pointer text-sky-600 dark:text-yellow-300 font-bold tracking-wider">
            {" "}
            <span className="h-10 w-10 rounded-full bg-sky-600 text-yellow-300 dark:bg-yellow-300 dark:text-sky-600">
              m
            </span>
            acro
          </h1>
        </Link>

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
        </div>

        <div className="flex gap-3">
          {token &&
            (decoded?.avatar ? (
              <img
                src={transformImage(
                  decoded.avatar,
                  transformConfig.AUTHOR_AVATAR
                )}
                alt={`The profile photo of the logged in user: ${decoded.firstName} ${decoded.lastName}`}
                className="h-7 w-7 rounded-full cursor-pointer text-xs"
                onClick={() => setOpenProfileMenu(true)}
              />
            ) : (
              <FaUserCircle
                className="text-2xl cursor-pointer hover:text-sky-300"
                onClick={() => setOpenProfileMenu(true)}
              />
            ))}

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
      {openMenu ? <Menu onClick={() => setOpenMenu(false)} /> : null}
      {openProfileMenu && token ? (
        <ProfileMenu handleProfileMenu={() => setOpenProfileMenu(false)} />
      ) : null}
    </header>
  );
};

export default Header;
