import Input from "../components/Input";
import Button from "../components/Button";
import { useFormInput } from "../hooks/useFormInput";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import clearFormContent from "../utils/clearFormContent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { validateMultipleFields } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";
import { TimerContext } from "../contexts/TimerProvider";
import { autoLogOut } from "../helpers/autoLogOut";
import SERVER_ERR_MSG from "../config/errorMsg";

const Login = () => {
  const { token, setToken } = useContext(AuthContext);
  const { setTimerID } = useContext(TimerContext);
  const emailProps = useFormInput("");
  const passwordProps = useFormInput("");
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

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
    setIsSubmit(true);

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
      navigate(-1);
    } catch (err) {
      notify({
        msg:
          err.response.status >= 500
            ? SERVER_ERR_MSG
            : err?.response?.data?.message,
        type: "error",
        autoClose: false,
      });
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      const timer = autoLogOut(navigate, setToken);
      setTimerID(timer);
    }
  }, [token]);

  return (
    <section className="p-5 py-10 md:px-10 flex flex-col justify-center items-center min-h-screen dark:bg-sky-800">
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
