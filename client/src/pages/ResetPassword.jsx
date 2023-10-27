import { FaEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useFormInput } from "../hooks/useFormInput";
import baseUrl from "../config/baseUrl";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { notify } from "../utils/notify";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import {
  validateMultipleFields,
  validatePasswordMatch,
} from "../utils/validate";
import Input from "../components/Input";
import Button from "../components/Button";
import { logOut } from "../helpers/logOut";
import SERVER_ERR_MSG from "../config/errorMsg";

const ResetPassword = () => {
  const oldPasswordInput = useFormInput("");
  const newPasswordInput = useFormInput("");
  const confirmNewPasswordInput = useFormInput("");

  const { id } = useParams();
  const axiosAuth = useAxiosInterceptor();
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const resetPassword = async () => {
    try {
      const response = await axiosAuth.put(
        `${baseUrl.serverBaseUrl}/users/reset-password/${id}`,
        {
          oldPassword: oldPasswordInput.value,
          newPassword: newPasswordInput.value,
        }
      );
      notify({ msg: response.data.message });
      setIsProcessing(true);
      logOut({ navigate, url: "/login", setToken });
    } catch (err) {
      setIsProcessing(false);
      notify({
        msg:
          err.response.status >= 500
            ? SERVER_ERR_MSG
            : err?.response?.data?.message,
        type: "error",
        autoClose: false,
      });
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateMultipleFields([oldPasswordInput, newPasswordInput])) {
      setIsProcessing(false);
      notify({
        msg: "Empty fields detected!",
        type: "error",
        autoClose: false,
      });
      return;
    }
    if (!validatePasswordMatch(newPasswordInput, confirmNewPasswordInput)) {
      setIsProcessing(false);
      notify({
        msg: "New password confirmation failed",
        type: "error",
        autoClose: false,
      });
      return;
    }

    resetPassword();
  };

  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col md:w-11/12 max-w-xl gap-4">
        <h1 className="text-center text-xl p-3 font-extrabold">
          <FaEdit className="inline text-md" /> Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label
            className="text-bold"
            htmlFor="old-password"
          >
            Old Password
          </label>
          <Input
            type="password"
            id="old-password"
            extraStyles="shadow-pref rounded-md"
            value={oldPasswordInput.value}
            onChange={oldPasswordInput.onChange}
          />
          <label
            className="text-bold"
            htmlFor="new-password"
          >
            New Password
          </label>
          <Input
            type="password"
            id="new-password"
            extraStyles="shadow-pref rounded-md"
            value={newPasswordInput.value}
            onChange={newPasswordInput.onChange}
          />
          <label
            className="text-bold"
            htmlFor="confirm-password"
          >
            Confirm New Password
          </label>
          <Input
            type="password"
            id="confirm-password"
            extraStyles="shadow-pref rounded-md"
            value={confirmNewPasswordInput.value}
            onChange={confirmNewPasswordInput.onChange}
          />

          <Button
            type="submit"
            extraStyles="bg-sky-900 dark:bg-sky-500 font-extrabold mt-10"
            onClick={() => setIsProcessing(true)}
          >
            {isProcessing ? "Processing..." : "RESET"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
