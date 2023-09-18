import Button from "../button/Button";
import Input from "../input/Input";
import IMAGE_ONE from "../../assets/image1.jpg";

const Hero = () => {
  return (
    <section className="bg-slate-100 text-sky-900 dark:bg-sky-900 dark:text-slate-100 p-10 md:flex gap-5 justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-5 py-5">
        <h1 className="text-2xl">
          Hi, I'm <span className="font-bold text-3xl">Olawale Jumat</span>
        </h1>
        <p className="w-full max-w-xs text-md leading-6">
          Lorem ipsum kddhdh dhdhd dgdgd gdg dhdhdh dd dhdh dhd dhdh
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          <Input
            extraStyles="rounded-lg shadow-pref"
            placeholder="Enter your email"
            ariaLabel={"Email address"}
          />
          <Button extraStyles="shadow-pref bg-sky-900 dark:bg-sky-600 dark:text-slate-50">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center max-w-screen-sm">
        <img
          src={IMAGE_ONE}
          alt=""
          className="w-3/4 h-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
