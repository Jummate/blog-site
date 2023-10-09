import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useFormInput } from "../hooks/useFormInput";
import Form from "../components/Form";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import clearFormContent from "../utils/clearFormContent";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { notify } from "../utils/notify";
import { validateMultipleFields, validateQuill } from "../utils/validate";
import Input from "../components/Input";
import Button from "../components/Button";

const EditProfile = () => {
  const firstNameInput = useFormInput("");
  const lastNameInput = useFormInput("");
  const emailInput = useFormInput("");
  //   const password = useFormInput("");
  //   const confirmPassword = useFormInput("");
  const avatarInput = useFormInput("", "file");

  const { id } = useParams();
  const axiosAuth = useAxiosInterceptor();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${baseUrl.serverBaseUrl}/users/${id}`
        );
        const { firstName, lastName, email } = response.data;
        firstNameInput.setValue(firstName);
        lastNameInput.setValue(lastName);
        emailInput.setValue(email);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const editProfile = async () => {
    const postFormData = new FormData();
    postFormData.append("firstName", firstNameInput.value);
    postFormData.append("lastName", lastNameInput.value);
    postFormData.append("email", emailInput.value);
    // postFormData.append("password", password.value);
    if (avatarInput.value.length > 0) {
      postFormData.append("avatar", avatarInput.value[0]);
    }

    try {
      const response = await axiosAuth.put(
        `${baseUrl.serverBaseUrl}/users/${id}`,
        postFormData
      );
      notify({ msg: response.data.message });
      //   clearFormContent({
      //     input: [firstName, lastName, email, password],
      //   });
      //   navigate(`/post/${id}`);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (
    //   !validateMultipleFields([firstName, lastName, email]) ||
    //   !validateQuill(contentProps)
    // ) {
    //   notify({
    //     msg: "Empty fields detected!",
    //     type: "error",
    //     autoClose: false,
    //   });
    //   return;
    // }

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

          {/* <label
            className="text-bold"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            extraStyles="shadow-pref rounded-md"
            value={password.value}
            onChange={password.onChange}
          />

          <label
            className="text-bold"
            htmlFor="confirm-password"
          >
            Confirm Password:
          </label>
          <Input
            type="password"
            id="confirm-password"
            extraStyles="shadow-pref rounded-md"
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
          /> */}

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
          >
            UPDATE PROFILE
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;