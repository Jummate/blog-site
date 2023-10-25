import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import { useRef } from "react";
import { generateID } from "../utils/generateID";

let quillRef;
let contentID = generateID();

const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    try {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("files", file);
      formData.append("contentID", contentID);

      const quill = quillRef.current.getEditor();

      // Save current cursor state
      const range = quill.getSelection();

      // Move cursor to right side of image (easier to continue typing)
      quill.setSelection(range.index + 1);

      // upload to the server which uploads to cloudinary
      const res = await axios.post(
        `${baseUrl.serverBaseUrl}/upload/`,
        formData
      );

      // Insert uploaded image
      quill.insertEmbed(range.index, "image", res.data.src);
    } catch (err) {
      console.error(err);
    }
  };
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
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
  values: { titleProps, contentProps, summaryProps, tagProps },
  onSubmit,
  children,
}) => {
  quillRef = useRef(null);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        onSubmit(e), (contentID = generateID());
      }}
    >
      <Input
        placeholder="Title"
        extraStyles="shadow-pref rounded-md"
        ariaLabel="Title"
        value={titleProps.value}
        onChange={titleProps.onChange}
      />
      <TextArea
        placeholder="Summary"
        extraStyles="shadow-pref rounded-md"
        ariaLabel="Summary"
        value={summaryProps.value}
        onChange={summaryProps.onChange}
      />
      <Input
        placeholder="Tag"
        extraStyles="shadow-pref rounded-md"
        ariaLabel="Tag"
        value={tagProps.value}
        onChange={tagProps.onChange}
      />
      {children}
      <ReactQuill
        ref={quillRef}
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
