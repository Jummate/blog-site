import Form from "../../components/Form";

const CreatePost = () => {
  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col md:w-11/12 max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          +Create New Post
        </h1>
        <Form buttonText="PUBLISH" />
      </div>
    </section>
  );
};

export default CreatePost;
