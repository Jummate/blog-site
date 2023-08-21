import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const CreatePost = () => {
  return (
    <section className="p-3 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100">
      <h1 className="text-center text-xl p-3 font-extrabold">
        +Create New Post
      </h1>
      <form className="flex flex-col gap-2">
        <Input
          placeholder={"Title"}
          extraStyles={"shadow-pref rounded-md"}
          ariaLabel={"Title"}
        />
        <Input
          placeholder={"Summary"}
          extraStyles={"shadow-pref rounded-md"}
          ariaLabel={"Summary"}
        />
        <Input
          type={"file"}
          extraStyles={"shadow-pref dark:bg-sky-100 rounded-md"}
          ariaLabel={"Banner"}
        />
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          className="h-auto overflow-hidden border-2 dark:bg-sky-100 dark:text-sky-900 rounded-md"
        />
        <Button
          text="PUBLISH"
          extraStyles={"dark:bg-sky-600 font-extrabold"}
        />
      </form>
    </section>
  );
};

export default CreatePost;
