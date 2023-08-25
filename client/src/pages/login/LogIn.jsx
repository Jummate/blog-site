import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { loginPageData } from "../../data";
const Login = () => {
  return (
    <section className="p-5 py-10 md:px-10 flex flex-col justify-center items-center gap-5 dark:bg-sky-800">
      <div>
        <div className="flex flex-col justify-center items-center gap-3 p-7 font-bold bg-sky-100 text-sky-900 w-full -mb-12 rounded-3xl dark:bg-sky-200">
          <h1 className="font-bold text-3xl">Sign in</h1>
          <h3 className="mb-7 text-sm text-center">Login to your account</h3>
        </div>

        <form className="flex flex-col gap-4 w-full max-w-96 p-3">
          {loginPageData.map((data, index) => (
            <div
              className="flex text-sm"
              key={index}
            >
              <label
                htmlFor={data.id}
                className="p-2 bg-sky-600 rounded-s-lg w-4/12 text-sky-100 font-bold text-center"
              >
                {data.label}
              </label>
              <Input
                id={data.id}
                type={data.type}
                extraStyles={"shadow-pref rounded-e-lg w-8/12"}
              />
            </div>
          ))}

          <Button extraStyles={"bg-sky-700 dark:bg-sky-600 dark:text-sky-100"}>
            SIGN IN
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
