import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
const CreatePost = () => {
  return (
    <section>
      <form>
        <Input placeholder={"Enter the title"} />
        <Input placeholder={"Enter the summary"} />
        <Input
          type={"file"}
          placeholder={"Enter the summary"}
        />
        <ReactQuill theme="snow" />
      </form>
    </section>
  );
};

export default CreatePost;
