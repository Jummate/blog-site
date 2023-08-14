import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const Hero = () => {
  return (
    <section className="text-sky-900 p-10 bg-slate-100">
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
            placeholder="Enter your email address"
          />
          <Button
            text="Subscribe"
            extraStyles="md:rounded-s-none shadow-pref"
          />
        </div>
      </div>
      <div className="hidden md:block">hffhfhfhh</div>
    </section>
  );
};

export default Hero;
