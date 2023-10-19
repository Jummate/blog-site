import Button from "./Button";
import { FaTimes } from "react-icons/fa";
import Input from "./Input";
import { useRef, useState } from "react";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { notify } from "../utils/notify";

import baseUrl from "../config/baseUrl";

const handleChange = (refInput, setUserRoles) => {
  const arr = [];
  refInput.current.forEach((elem) => {
    if (elem.checked) {
      arr.push(elem.value);
    }
  });

  setUserRoles([...arr]);
};

const changeRole = async (axiosAuth, onClose, setIsRoleChange, id, roles) => {
  try {
    const response = await axiosAuth.put(
      `${baseUrl.serverBaseUrl}/users/change-role/${id}`,
      { roles }
    );
    onClose();
    setIsRoleChange();
    notify({ msg: response.data.message });
  } catch (err) {
    if (err.response.status === 400) {
      notify({
        msg: err.response.data.message,
        type: "error",
        autoClose: false,
      });
    }
    console.error(err);
  }
};

const Modal = ({ rowItems, onClose, setIsRoleChange }) => {
  const [userRoles, setUserRoles] = useState([]);
  const axiosAuth = useAxiosInterceptor();
  const inputRef = useRef([]);

  return (
    <article className="fixed z-10 font-sans overflow-auto flex flex-col gap-6 w-5/6 max-w-xs h-4/5 max-h-xs px-5 top-20 right-5 bg-sky-100 text-sky-600 dark:bg-sky-600 dark:text-sky-100 py-6 rounded-3xl shadow-pref">
      <div className="flex justify-between gap-3">
        <h1 className="text-lg">Change Roles</h1>
        <FaTimes
          className="cursor-pointer text-2xl bg-sky-800 dark:bg-sky-100 rounded-full text-sky-100 dark:text-sky-800 hover:bg-inherit dark:hover:bg-inherit hover:text-sky-800 dark:hover:text-sky-100"
          onClick={onClose}
        />
      </div>
      <div className="flex flex-col items-center">
        <form className="flex flex-col gap-3">
          <label
            className="text-bold"
            htmlFor="first-name"
          >
            First Name:
          </label>
          <Input
            id="first-name"
            extraStyles="shadow-pref rounded-md"
            value={rowItems.firstName}
            disabled={true}
          />
          <label
            className="text-bold"
            htmlFor="last-name"
          >
            Last Name:
          </label>
          <Input
            id="last-name"
            extraStyles="shadow-pref rounded-md"
            value={rowItems.lastName}
            disabled={true}
          />
          <label
            className="text-bold"
            htmlFor="email"
          >
            Email:
          </label>
          <Input
            type="email"
            id="email"
            extraStyles="shadow-pref rounded-md"
            value={rowItems.email}
            disabled={true}
          />
          <label
            className="text-bold"
            htmlFor="email"
          >
            Roles:
          </label>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="admin"
                name="admin"
                value="ADMIN"
                ref={(elem) => (inputRef.current[0] = elem)}
                onChange={() => handleChange(inputRef, setUserRoles)}
              />
              <label htmlFor="admin">ADMIN</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="editor"
                name="editor"
                value="EDITOR"
                ref={(elem) => (inputRef.current[1] = elem)}
                onChange={() => handleChange(inputRef, setUserRoles)}
              />
              <label htmlFor="editor">EDITOR</label>
            </div>
          </div>
          <div className="flex gap-3 px-5 mt-6">
            <Button
              extraStyles="shadow-pref bg-green-600 text-sky-50 px-7"
              onClick={() =>
                changeRole(
                  axiosAuth,
                  onClose,
                  setIsRoleChange,
                  rowItems._id,
                  userRoles
                )
              }
            >
              Save
            </Button>
            <Button
              extraStyles="shadow-pref bg-red-600 text-sky-50 px-7"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </article>
  );
};
export default Modal;
