import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "./input/Input";
import Button from "./button/Button";

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

const Form = ({ buttonText }) => {
  return (
    <form className="flex flex-col gap-4">
      <Input
        placeholder="Title"
        extraStyles="shadow-pref rounded-md"
        ariaLabel="Title"
      />
      <Input
        placeholder="Summary"
        extraStyles="shadow-pref rounded-md"
        ariaLabel="Summary"
      />
      <Input
        type="file"
        extraStyles="shadow-pref dark:bg-sky-100 rounded-md"
        ariaLabel="Banner"
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        className="h-auto overflow-hidden border-2 dark:bg-sky-100 dark:text-sky-900 rounded-md"
      />

      <Button extraStyles="bg-sky-900 dark:bg-sky-500 font-extrabold">
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
