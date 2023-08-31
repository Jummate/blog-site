import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useFormInput } from "../../hooks/useFormInput";
import Form from "../../components/Form";
import { v4 as uuid } from "uuid";
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const EditPost = () => {
  const titleProps = useFormInput("");
  const summaryProps = useFormInput("");
  const bannerProps = useFormInput("", "file");
  const contentProps = useFormInput("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl.serverBaseUrl}/posts/${id}`
        );
        const { title, summary, content } = response.data[0];
        titleProps.setValue(title);
        summaryProps.setValue(summary);
        contentProps.setContent(content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    const postFormData = new FormData();
    postFormData.append("title", titleProps.value);
    postFormData.append("summary", summaryProps.value);
    postFormData.append("content", contentProps.content);
    postFormData.append("banner", bannerProps.value[0]);

    console.log("anvnnc");
    try {
      const response = await axios.put(
        `${baseUrl.serverBaseUrl}/posts/${id}`,
        postFormData
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col md:w-11/12 max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          <FaEdit className="inline text-md" /> Edit Post
        </h1>
        <Form
          values={{ titleProps, summaryProps, contentProps }}
          onSubmit={editPost}
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
