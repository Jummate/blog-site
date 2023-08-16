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
    <section className="p-3 mb-10 text-sky-900">
      <h1 className="text-center text-xl p-3">+Create New Post</h1>
      <form className="flex flex-col gap-2">
        <Input
          placeholder={"Title"}
          extraStyles={"shadow-pref"}
          ariaLabel={"Title"}
        />
        <Input
          placeholder={"Summary"}
          extraStyles={"shadow-pref"}
          ariaLabel={"Summary"}
        />
        <Input
          type={"file"}
          extraStyles={"shadow-pref"}
          ariaLabel={"Banner"}
        />
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          className="h-auto overflow-hidden border-2"
        />
        <Button text="Publish" />
      </form>
    </section>
  );
};

export default CreatePost;
