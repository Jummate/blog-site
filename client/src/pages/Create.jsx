import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useFormInput } from "../hooks/useFormInput";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import Form from "../components/Form";
import baseUrl from "../config/baseUrl";
import { AuthContext } from "../contexts/AuthProvider";
import { notify } from "../utils/notify";
import {
  validateMultipleFields,
  validateFileUpload,
  validateQuill,
} from "../utils/validate";
import SERVER_ERR_MSG from "../config/errorMsg";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const titleProps = useFormInput("");
  const summaryProps = useFormInput("");
  const tagProps = useFormInput("");
  const bannerProps = useFormInput("", "file");
  const contentProps = useFormInput("");

  const axiosAuth = useAxiosInterceptor();

  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const createNewPost = async () => {
    const decoded = token && jwt_decode(token);
    const postFormData = new FormData();

    postFormData.append("title", titleProps.value);
    postFormData.append("tag", tagProps.value);
    postFormData.append("summary", summaryProps.value);
    postFormData.append("content", contentProps.content);
    postFormData.append("banner", bannerProps.value[0]);
    postFormData.append("firstName", decoded?.firstName);
    postFormData.append("lastName", decoded?.lastName);
    postFormData.append("avatar", decoded?.avatar);

    try {
      const response = await axiosAuth.post(
        `${baseUrl.serverBaseUrl}/posts`,
        postFormData
      );
      setIsSubmit(true);
      notify({ msg: response.data.message });
      navigate("/");
    } catch (err) {
      setIsSubmit(false);
      console.log(err);
      notify({
        msg:
          err.response.status >= 500
            ? SERVER_ERR_MSG
            : err?.response?.data?.message,
        type: "error",
        autoClose: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validateMultipleFields([titleProps, summaryProps, tagProps]) ||
      !validateQuill(contentProps)
    ) {
      setIsSubmit(false);
      notify({
        msg: "Empty fields detected!",
        type: "error",
        autoClose: false,
      });
      return;
    }
    if (!validateFileUpload(bannerProps)) {
      notify({
        msg: "No image selected!",
        type: "error",
        autoClose: false,
      });
      return;
    }

    createNewPost();
  };

  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col md:w-11/12 max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          +Create New Post
        </h1>
        <Form
          values={{ titleProps, summaryProps, contentProps, tagProps }}
          onSubmit={handleSubmit}
          isSubmit={isSubmit}
          setIsSubmit={() => setIsSubmit(true)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="banner">
              Banner (<small>image only</small>)
            </label>
            <input
              type="file"
              className="p-3 text-sky-900 shadow-pref dark:bg-sky-100 rounded-md"
              onChange={bannerProps.onChange}
              aria-label="banner"
              id="banner"
            />
          </div>
        </Form>
      </div>
    </section>
  );
};

export default CreatePost;
