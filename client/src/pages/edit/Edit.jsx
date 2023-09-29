import { useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import Form from "../../components/Form";
import axios from "axios";
import baseUrl from "../../config/baseUrl";
import clearFormContent from "../../utils/clearFormContent";
import { AuthContext } from "../../contexts/AuthProvider";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";
import { notify } from "../../utils/notify";
import {
  validateMultipleFields,
  validateFileUpload,
  validateQuill,
} from "../../utils/validate";

const EditPost = () => {
  const titleProps = useFormInput("");
  const summaryProps = useFormInput("");
  const tagProps = useFormInput("");
  const bannerProps = useFormInput("", "file");
  const contentProps = useFormInput("");

  const { id } = useParams();
  //   const { token } = useContext(AuthContext);
  const axiosAuth = useAxiosInterceptor();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${baseUrl.serverBaseUrl}/posts/${id}`
        );
        const { title, summary, content, tag } = response.data;
        titleProps.setValue(title);
        tagProps.setValue(tag);
        summaryProps.setValue(summary);
        contentProps.setContent(content);
        // bannerProps.setValue(bannerImage);
        // console.log(bannerImage);
      } catch (err) {
        console.log(err);
      }
    })();
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
      notify({ msg: response.data.message });
      clearFormContent({
        input: [titleProps, summaryProps, tagProps, bannerProps],
        quill: [contentProps],
      });
      navigate(`/post/${id}`);
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
    if (
      !validateMultipleFields([titleProps, summaryProps, tagProps]) ||
      !validateQuill(contentProps)
    ) {
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
        >
          <input
            type="file"
            className="p-3 text-sky-900 shadow-pref dark:bg-sky-100 rounded-md"
            onChange={bannerProps.onChange}
            aria-label="banner"
          ></input>
        </Form>
      </div>
    </section>
  );
};

export default EditPost;
