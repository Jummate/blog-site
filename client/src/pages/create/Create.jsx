import { useFormInput } from "../../hooks/useFormInput";
import Form from "../../components/Form";
import { v4 as uuid } from "uuid";
import axios from "axios";
import baseUrl from "../../config/baseUrl";

const CreatePost = () => {
  const titleProps = useFormInput("");
  const summaryProps = useFormInput("");
  const bannerProps = useFormInput("", "file");
  const contentProps = useFormInput("");

  const createNewPost = async (e) => {
    e.preventDefault();
    const postFormData = new FormData();
    postFormData.append("id", uuid());
    postFormData.append("title", titleProps.value);
    postFormData.append("summary", summaryProps.value);
    postFormData.append("content", contentProps.content);
    postFormData.append("banner", bannerProps.value[0]);

    try {
      const response = await axios.post(
        `${baseUrl.serverBaseUrl}/posts`,
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
          +Create New Post
        </h1>
        <Form
          values={{ titleProps, summaryProps, contentProps }}
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
