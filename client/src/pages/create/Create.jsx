import { useFormInput } from "../../hooks/useFormInput";
import Form from "../../components/Form";
import { v4 as uuid } from "uuid";
import axios from "axios";
import baseUrl from "../../config/baseUrl";
import clearFormContent from "../../utils/clearFormContent";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";
// import { useNavigate, Navigate } from "react-router-dom";
// import { useState } from "react";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const titleProps = useFormInput("");
  const summaryProps = useFormInput("");
  const tagProps = useFormInput("");
  const bannerProps = useFormInput("", "file");
  const contentProps = useFormInput("");

  // const [redirect, setRedirect] = useState(false);
  // const navigate = useNavigate();

  const createNewPost = async (e) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    e.preventDefault();
    // const id = uuid();
    const postFormData = new FormData();
    postFormData.append("id", uuid());
    postFormData.append("title", titleProps.value);
    postFormData.append("tag", tagProps.value);
    postFormData.append("summary", summaryProps.value);
    postFormData.append("content", contentProps.content);
    postFormData.append("banner", bannerProps.value[0]);

    try {
      const response = await axios.post(
        `${baseUrl.serverBaseUrl}/posts`,
        postFormData,
        { headers }
      );
      // console.log(response.data);
      if (response.status === 201) {
        // titleProps.setValue("");
        // summaryProps.setValue("");
        // tagProps.setValue("");
        // contentProps.setContent("");
        clearFormContent({
          input: [titleProps, summaryProps, tagProps, bannerProps],
          quill: [contentProps],
        });
        // setRedirect(true);
        // navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // if (redirect) {
  //   return <Navigate to={`/post/${id}`} />;
  // }

  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col md:w-11/12 max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          +Create New Post
        </h1>
        <Form
          values={{ titleProps, summaryProps, contentProps, tagProps }}
          onSubmit={createNewPost}
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

export default CreatePost;
