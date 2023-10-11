import { FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import jwt_decode from "jwt-decode";
import baseUrl from "../config/baseUrl";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { hasPermission } from "../utils/permission";
import { accessLevel } from "../config/accessLevel";
import axios from "axios";

const logOut = async (navigate, setToken, handleProfileMenu) => {
  try {
    await axios.get(`${baseUrl.serverBaseUrl}/logout`, {
      withCredentials: true,
    });
    handleProfileMenu();
    setToken("");
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

const ProfileMenu = ({ handleProfileMenu }) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const decoded = token && jwt_decode(token);

  return (
    <section className="fixed z-10 font-sans overflow-auto flex flex-col gap-6 w-5/6 max-w-xs h-4/5 px-5 top-20 right-5 bg-sky-100 text-sky-600 dark:bg-sky-600 dark:text-sky-100 py-6 rounded-3xl shadow-pref">
      <div className="flex justify-between gap-3">
        <p className="text-sm">{decoded.email}</p>
        <FaTimes
          className="cursor-pointer text-2xl bg-sky-100 dark:bg-sky-600 rounded-full text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-sky-500"
          onClick={handleProfileMenu}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        {decoded?.avatar ? (
          <a
            href={decoded.avatar}
            target="_blank"
          >
            <img
              src={decoded.avatar}
              alt={`The profile photo of the logged in user: ${decoded.firstName} ${decoded.lastName}`}
              className="h-32 w-32 rounded-full cursor-pointer"
            />
          </a>
        ) : (
          <FaUserCircle className="text-8xl" />
        )}
        <p className="text-lg mb-2 text-sky-800 dark:text-sky-200">
          {`${decoded?.firstName} ${decoded?.lastName}`}
        </p>
      </div>
      <hr className="border-sky-200 dark:border-sky-900" />

      <nav className="flex flex-col gap-6 items-center text-sm">
        {token && hasPermission(accessLevel.EDIT_USER, decoded?.roles) && (
          <Link
            to={`edit-profile/${decoded?.userId}`}
            className="hover:underline"
            state={decoded}
            onClick={handleProfileMenu}
          >
            Edit Profile
          </Link>
        )}
        <Link
          to={`reset-password/${decoded?.userId}`}
          className="hover:underline"
          onClick={handleProfileMenu}
        >
          Reset Password
        </Link>
        {token && hasPermission(accessLevel.CHANGE_ROLE, decoded?.roles) && (
          <Link
            to="change-status"
            className="hover:underline"
            onClick={handleProfileMenu}
          >
            Change User's Role
          </Link>
        )}

        {token && hasPermission(accessLevel.CREATE_POST, decoded?.roles) && (
          <Link
            to="create"
            className="hover:underline"
            onClick={handleProfileMenu}
          >
            Create New Post
          </Link>
        )}
        {token && (
          <Button
            extraStyles="shadow-pref bg-sky-900 dark:text-slate-50 px-10"
            onClick={() => logOut(navigate, setToken, handleProfileMenu)}
          >
            Log Out
          </Button>
        )}
      </nav>
    </section>
  );
};

export default ProfileMenu;
