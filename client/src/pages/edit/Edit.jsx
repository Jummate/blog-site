import { FaEdit } from "react-icons/fa";
import Form from "../../components/Form";

const EditPost = () => {
  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100">
      <div className="flex flex-col md:w-11/12 max-w-4xl">
        <h1 className="text-xl text-center p-3 font-extrabold">
          <FaEdit className="inline text-md" /> Edit Post
        </h1>
        <Form buttonText="PUBLISH" />
      </div>
    </section>
  );
};

export default EditPost;
