import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { loginPageData } from "../../data";
const LogIn = () => {
  return (
    <section className="h-96 p-6 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center gap-3 p-7 font-bold bg-sky-100 text-sky-900 w-full -mb-16 rounded-3xl">
        <h1 className="font-bold text-3xl">Sign in</h1>
        <h3 className="mb-7 text-sm">Login to your account</h3>
      </div>

      <form className="flex flex-col gap-4 w-full max-w-96 p-3">
        {loginPageData.map((data) => (
          <div className="flex text-sm">
            <label
              htmlFor={data.id}
              className="p-2 bg-sky-600 rounded-s-lg w-4/12 text-sky-100 font-bold text-center"
            >
              {data.label}
            </label>
            <Input
              id={data.id}
              extraStyles={"shadow-pref rounded-e-lg w-8/12"}
            />
          </div>
        ))}

        <Button
          text={"SIGN IN"}
          extraStyles={"bg-sky-700"}
        />
      </form>
    </section>
  );
};

export default LogIn;
