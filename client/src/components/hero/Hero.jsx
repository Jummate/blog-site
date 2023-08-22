import Button from "../button/Button";
import Input from "../input/Input";

const Hero = () => {
  return (
    <section className="bg-slate-100 text-sky-900 dark:bg-sky-900 dark:text-slate-100 p-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl">
          Hi, I'm <span className="font-bold text-3xl">Olawale Jumat</span>
        </h1>
        <p className="w-full max-w-xs text-md leading-6">
          Lorem ipsum kddhdh dhdhd dgdgd gdg dhdhdh dd dhdh dhd dhdh
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          <Input
            extraStyles="rounded-lg shadow-pref"
            placeholder="abc@gmail.com"
            ariaLabel={"Email address"}
          />
          <Button
            text="Subscribe"
            extraStyles="md:rounded-s-none shadow-pref dark:bg-sky-600 dark:text-slate-50"
          />
        </div>
      </div>
      <div className="hidden md:block">hffhfhfhh</div>
    </section>
  );
};

export default Hero;
