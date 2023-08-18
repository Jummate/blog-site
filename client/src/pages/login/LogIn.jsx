import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { loginPageData } from "../../data";
const LogIn = () => {
  return (
    <section className="h-96 p-10 flex flex-col justify-center items-center gap-5">
      <h1 className="text-sky-900 font-bold text-3xl">LOG IN</h1>

      <form className="flex flex-col gap-4 w-full max-w-96">
        {loginPageData.map((data) => (
          <div className="flex text-sm">
            <label
              htmlFor={data.id}
              className="p-2 bg-sky-900 rounded-s-lg w-4/12 text-sky-100 font-bold text-center"
            >
              {data.label}
            </label>
            <Input
              id={data.id}
              extraStyles={"shadow-pref rounded-e-lg w-8/12"}
            />
          </div>
        ))}

        <Button text={"Sign In"} />
      </form>
    </section>
  );
};

export default LogIn;
