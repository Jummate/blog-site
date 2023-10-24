import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useFormInput } from "../hooks/useFormInput";
import baseUrl from "../config/baseUrl";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { notify } from "../utils/notify";
import {
  validateMultipleFields,
  validatePasswordMatch,
} from "../utils/validate";
import Input from "../components/Input";
import Button from "../components/Button";

const ResetPassword = () => {
  const oldPasswordInput = useFormInput("");
  const newPasswordInput = useFormInput("");
  const confirmNewPasswordInput = useFormInput("");

  const { id } = useParams();
  const axiosAuth = useAxiosInterceptor();

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

      navigate(-1);
    } catch (err) {
      notify({
        msg:
          err.response.status >= 500
            ? "Something went wrong. Please check your connection or try again."
            : err?.response?.data?.message,
        type: "error",
        autoClose: false,
      });
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateMultipleFields([oldPasswordInput, newPasswordInput])) {
      notify({
        msg: "Empty fields detected!",
        type: "error",
        autoClose: false,
      });
      return;
    }
    if (!validatePasswordMatch(newPasswordInput, confirmNewPasswordInput)) {
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
          >
            RESET PASSWORD
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
