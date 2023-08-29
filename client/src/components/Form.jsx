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

const Form = ({
  values: { titleProps, bannerProps, contentProps, summaryProps },
  onSubmit,
  children,
}) => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <Input
        placeholder="Title"
        extraStyles="shadow-pref rounded-md"
        ariaLabel="Title"
        value={titleProps.value}
        onChange={titleProps.onChange}
      />
      <Input
        placeholder="Summary"
        extraStyles="shadow-pref rounded-md"
        ariaLabel="Summary"
        value={summaryProps.value}
        onChange={summaryProps.onChange}
      />
      {/* <Input
        type="file"
        extraStyles="shadow-pref dark:bg-sky-100 rounded-md"
        ariaLabel="Banner"
        value={bannerProps.value}
        onChange={bannerProps.onChange}
      /> */}
      {children}
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        className="h-auto overflow-hidden border-2 dark:bg-sky-100 dark:text-sky-900 rounded-md"
        value={contentProps.content}
        onChange={contentProps.onContentChange}
      />

      <Button
        type="submit"
        extraStyles="bg-sky-900 dark:bg-sky-500 font-extrabold"
      >
        PUBLISH
      </Button>
    </form>
  );
};

export default Form;
