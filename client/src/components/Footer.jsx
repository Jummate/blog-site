import IMAGE_THREE from "../assets/image3.jpg";
import Input from "./Input";
import Button from "./Button";
import { profile } from "../data";
import SocialMedia from "./SocialMedia";
import { useFormInput } from "../hooks/useFormInput";
import { notify } from "../utils/notify";
import { validateEmail, validateSingleField } from "../utils/validate";
import { subscribeToNewsletter } from "../utils/newsletterSub";

const Footer = () => {
  const emailProps = useFormInput("");

  const handleClick = () => {
    if (!validateSingleField(emailProps)) {
      notify({
        msg: "Email field cannot be empty",
        type: "error",
        autoClose: false,
      });
      return;
    }
    if (!validateEmail(emailProps)) {
      notify({ msg: "Invalid email", type: "error", autoClose: false });
      return;
    }
    subscribeToNewsletter(emailProps.value);
  };
  return (
    <footer className="text-sky-100 p-5 pt-10 bg-sky-900 flex items-center justify-center">
      <div className="flex flex-col gap-20 md:gap-5 items-center justify-center md:grid md:grid-cols-4">
        <section className="flex flex-col justify-center items-center gap-2 px-3 col-span-2">
          <h1 className="text-2xl font-bold mb-3">Newsletter</h1>
          <p className="text-slate-200 md:text-lg mb-5 leading-6 text-center">
            Don't miss out on anything. Be the first to get the latest posts.
            Subcribe to get them directly to your mailbox.
          </p>
          <form className="flex flex-col justify-center items-center">
            <Input
              extraStyles="rounded-lg mb-2 shadow-pref"
              placeholder="Enter your email"
              onChange={emailProps.onChange}
            />
            <Button
              extraStyles="shadow-pref bg-sky-400 text-white"
              onClick={handleClick}
            >
              Subscribe
            </Button>
          </form>
        </section>
        <section className="flex flex-col justify-center items-center gap-2">
          <img
            src={IMAGE_THREE}
            alt=""
            className="h-24 w-24 rounded-full"
          ></img>
          <h1 className="text-xl font-bold">{profile.user.fullName}</h1>
          <h3 className="text-sm mb-3 text-center">
            Content Writer, Realtor, Educator{" "}
          </h3>
          <SocialMedia userType="user" />
        </section>

        <section className="flex flex-col justify-center gap-5 items-center opacity-60 text-center">
          <span className="text-md leading-8">
            Designed & Built By <b>{profile.developer.fullName}</b>
          </span>
          <SocialMedia userType="developer" />
        </section>
      </div>
    </footer>
  );
};
export default Footer;
