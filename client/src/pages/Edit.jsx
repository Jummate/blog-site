import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { useFormInput } from "../hooks/useFormInput";
import Form from "../components/Form";
import baseUrl from "../config/baseUrl";
import clearFormContent from "../utils/clearFormContent";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { notify } from "../utils/notify";
import { validateMultipleFields, validateQuill } from "../utils/validate";
import SERVER_ERR_MSG from "../config/errorMsg";

const EditPost = () => {
  const titleProps = useFormInput("");
  const summaryProps = useFormInput("");
  const tagProps = useFormInput("");
  const bannerProps = useFormInput("", "file");
  const contentProps = useFormInput("");

  const { id } = useParams();
  const axiosAuth = useAxiosInterceptor();

  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const { title, summary, content, tag } = data;
    titleProps.setValue(title);
    tagProps.setValue(tag);
    summaryProps.setValue(summary);
    contentProps.setContent(content);
  }, []);

  const editPost = async () => {
    const postFormData = new FormData();
    postFormData.append("title", titleProps.value);
    postFormData.append("summary", summaryProps.value);
    postFormData.append("tag", tagProps.value);
    postFormData.append("content", contentProps.content);
    if (bannerProps.value.length > 0) {
      postFormData.append("banner", bannerProps.value[0]);
    }

    try {
      const response = await axiosAuth.put(
        `${baseUrl.serverBaseUrl}/posts/${id}`,
        postFormData
      );
      setIsSubmit(true);
      notify({ msg: response.data.message });
      clearFormContent({
        input: [titleProps, summaryProps, tagProps, bannerProps],
        quill: [contentProps],
      });
      navigate(`/post/${id}`, { state: response.data.result });
    } catch (err) {
      setIsSubmit(false);
      console.error(err);
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

    editPost();
  };

  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col md:w-11/12 max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          <FaEdit className="inline text-md" /> Edit Post
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

export default EditPost;
