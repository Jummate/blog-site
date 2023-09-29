import Input from "../components/Input";
import Button from "../components/Button";
import { useFormInput } from "../hooks/useFormInput";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import clearFormContent from "../utils/clearFormContent";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { validateMultipleFields } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";
const Login = () => {
  const { setToken } = useContext(AuthContext);
  const emailProps = useFormInput("");
  const passwordProps = useFormInput("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateMultipleFields([emailProps, passwordProps])) {
      notify({
        msg: "Empty fields detected!",
        type: "error",
        autoClose: false,
      });
      return;
    }
    const loginFormData = new FormData();
    loginFormData.append("email", emailProps.value);
    loginFormData.append("password", passwordProps.value);

    try {
      const response = await axios.post(
        `${baseUrl.serverBaseUrl}/auth`,
        {
          email: emailProps.value,
          password: passwordProps.value,
        },
        { withCredentials: true }
      );

      notify({ msg: response.data.message });
      setToken(response.data.accessToken);

      clearFormContent({
        input: [emailProps, passwordProps],
      });
      navigate("/");
    } catch (err) {
      if (err.response.status === 401) {
        notify({
          msg: err.response.data.message,
          type: "error",
          autoClose: false,
        });
      }
      console.error(err.message);
    }
  };
  return (
    <section className="p-5 py-10 md:px-10 flex flex-col justify-center items-center dark:bg-sky-800">
      <div className="bg-sky-100 text-sky-900 rounded-3xl dark:bg-sky-200 w-full max-w-md">
        <form
          className="flex flex-col gap-4 p-7 sm:p-10 justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-4xl text-center">Sign In</h1>
          <h3 className="mb-7 text-md text-center">Login to your account</h3>
          <label
            htmlFor="email"
            className="text-sky-600 font-bold block"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            extraStyles={"shadow-pref rounded-lg block"}
            onChange={emailProps.onChange}
          />

          <label
            htmlFor="password"
            className="text-sky-600 font-bold block"
          >
            Password
          </label>

          <Input
            id="password"
            type="password"
            extraStyles={"shadow-pref rounded-lg block"}
            onChange={passwordProps.onChange}
          />

          <Button
            type="submit"
            extraStyles={"bg-sky-700 dark:bg-sky-600 dark:text-sky-100"}
          >
            SIGN IN
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
