import { useState, useEffect, useContext } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import Menu from "./Menu";
import ProfileMenu from "./ProfileMenu";
import ColorMode from "./ColorMode";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { AuthContext } from "../contexts/AuthProvider";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { hasPermission } from "../utils/permission";
import { accessLevel } from "../config/accessLevel";

const logOut = async (navigate, setToken) => {
  try {
    await axios.get(`${baseUrl.serverBaseUrl}/logout`, {
      withCredentials: true,
    });
    setToken("");
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

const Header = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
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
            <span className="h-10 w-10 rounded-full bg-sky-600 text-yellow-300 dark:bg-yellow-300 dark:text-sky-600 text-2xl">
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
          {/* {token && hasPermission(accessLevel.CREATE_POST, decoded?.roles) && (
            <Link
              to="create"
              className="hover:underline"
            >
              Create New Post
            </Link>
          )} */}
          {/* {token && (
            <Button
              extraStyles="shadow-pref bg-sky-900 dark:bg-sky-600 dark:text-slate-50"
              onClick={() => logOut(navigate, setToken)}
            >
              Log Out
            </Button>
          )} */}
        </div>

        <div className="flex gap-3">
          {token &&
            (decoded?.avatar ? (
              <img
                src={decoded.avatar}
                alt={`The profile photo of the logged in user: ${decoded.firstName} ${decoded.lastName}`}
                className="h-7 w-7 rounded-full cursor-pointer"
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
      {openProfileMenu ? (
        <ProfileMenu
          // token={token}
          handleProfileMenu={() => setOpenProfileMenu(false)}
        />
      ) : null}
    </header>
  );
};

export default Header;
