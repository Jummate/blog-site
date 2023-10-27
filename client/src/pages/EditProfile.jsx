import { useEffect, useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormInput } from "../hooks/useFormInput";
import baseUrl from "../config/baseUrl";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { notify } from "../utils/notify";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthProvider";
import { logOut } from "../helpers/logOut";
import SERVER_ERR_MSG from "../config/errorMsg";

const EditProfile = () => {
  const firstNameInput = useFormInput("");
  const lastNameInput = useFormInput("");
  const emailInput = useFormInput("");

  const avatarInput = useFormInput("", "file");

  const { id } = useParams();
  const axiosAuth = useAxiosInterceptor();

  const { setToken } = useContext(AuthContext);

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const { firstName, lastName, email } = data;
    firstNameInput.setValue(firstName);
    lastNameInput.setValue(lastName);
    emailInput.setValue(email);
  }, []);

  const editProfile = async () => {
    const postFormData = new FormData();
    postFormData.append("firstName", firstNameInput.value);
    postFormData.append("lastName", lastNameInput.value);
    postFormData.append("email", emailInput.value);
    if (avatarInput.value.length > 0) {
      postFormData.append("avatar", avatarInput.value[0]);
    }

    try {
      const response = await axiosAuth.put(
        `${baseUrl.serverBaseUrl}/users/${id}`,
        postFormData
      );
      setIsProcessing(true);
      notify({ msg: response.data.message });
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
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editProfile();
  };

  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col md:w-11/12 max-w-xl gap-4">
        <h1 className="text-center text-xl p-3 font-extrabold">
          <FaEdit className="inline text-md" /> Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label
            className="text-bold"
            htmlFor="first-name"
          >
            First Name
          </label>
          <Input
            id="first-name"
            extraStyles="shadow-pref rounded-md"
            value={firstNameInput.value}
            onChange={firstNameInput.onChange}
          />
          <label
            className="text-bold"
            htmlFor="last-name"
          >
            Last Name
          </label>
          <Input
            id="last-name"
            extraStyles="shadow-pref rounded-md"
            value={lastNameInput.value}
            onChange={lastNameInput.onChange}
          />
          <label
            className="text-bold"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            extraStyles="shadow-pref rounded-md"
            value={emailInput.value}
            onChange={emailInput.onChange}
          />

          <label
            className="text-bold"
            htmlFor="avatar"
          >
            Profile Photo
          </label>
          <Input
            type="file"
            id="avatar"
            extraStyles="shadow-pref rounded-md dark:bg-sky-100"
            onChange={avatarInput.onChange}
          />

          <Button
            type="submit"
            extraStyles="bg-sky-900 dark:bg-sky-500 font-extrabold mt-10"
            onClick={() => setIsProcessing(true)}
          >
            {isProcessing ? "Processing..." : "UPDATE"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
