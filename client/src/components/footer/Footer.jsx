import { FaLinkedin, FaGlobe } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import IMAGE_THREE from "../../assets/image3.jpg";
import Input from "../input/Input";
import Button from "../button/Button";
const Footer = () => {
  return (
    <footer className="text-sky-100 p-5 bg-sky-900 flex flex-col gap-10 items-center">
      <section className="flex flex-col justify-center items-center">
        <img
          src={IMAGE_THREE}
          alt=""
          className="h-20 w-20 rounded-full z-0"
        ></img>
        <h1 className="text-lg font-bold">Olawale Jumat</h1>
        <h3 className="text-sm mb-3">Content Writer</h3>
        <ul className="flex gap-3 text-2xl">
          <li>
            {" "}
            <a
              href="https://www.linkedin.com/in/omololu-jumat-1405"
              title="Developer's LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          </li>

          <li>
            {" "}
            <a
              href="https://omololujumat.netlify.app"
              title="Developer's Portfolio Website"
            >
              <FaGlobe />
            </a>
          </li>
          <li>
            {" "}
            <a
              href="mailto:omololujumat@gmail.com"
              title="Developer's Email Address"
            >
              <BiLogoGmail />
            </a>
          </li>
        </ul>
      </section>
      <section className="flex flex-col justify-center gap-2">
        <h1 className="text-xl font-bold mb-3">NewsLetter</h1>
        <p className="text-slate-200 text-sm mb-5 leading-6">
          Be the first to get the latest post lorem ipsum lorem ipsum a lorem
        </p>
        <form>
          <Input
            extraStyles="rounded-lg mb-2 shadow-pref"
            placeholder="Enter your email address"
          />
          <Button
            text="Subscribe"
            extraStyles="md:rounded-s-none shadow-pref bg-sky-400 text-white"
          />
        </form>
      </section>
      <section className="flex flex-col justify-center gap-3 items-center opacity-60">
        <span className="text-md">
          Designed & Built By <b>Omololu Jumat</b>
        </span>
        <ul className="flex gap-3 text-2xl">
          <li>
            {" "}
            <a
              href="https://www.linkedin.com/in/omololu-jumat-1405"
              title="Developer's LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          </li>

          <li>
            {" "}
            <a
              href="https://omololujumat.netlify.app"
              title="Developer's Portfolio Website"
            >
              <FaGlobe />
            </a>
          </li>
          <li>
            {" "}
            <a
              href="mailto:omololujumat@gmail.com"
              title="Developer's Email Address"
            >
              <BiLogoGmail />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};
export default Footer;
