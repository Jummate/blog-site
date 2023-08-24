import { FaLinkedin, FaGlobe } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import IMAGE_THREE from "../../assets/image3.jpg";
import Input from "../input/Input";
import Button from "../button/Button";
const Footer = () => {
  return (
    <footer className="text-sky-100 p-5 pt-10 bg-sky-900 flex items-center justify-center">
      <div className="flex flex-col gap-20 md:gap-5 items-center justify-center md:grid md:grid-cols-4">
        <section className="flex flex-col justify-center items-center gap-2 px-3 col-span-2">
          <h1 className="text-2xl font-bold mb-3">NewsLetter</h1>
          <p className="text-slate-200 md:text-lg mb-5 leading-6 text-center">
            Be the first to get the latest post lorem ipsum lorem ipsum a lorem
          </p>
          <form className="flex flex-col justify-center items-center">
            <Input
              extraStyles="rounded-lg mb-2 shadow-pref"
              placeholder="Enter your email address"
            />
            <Button
              text="Subscribe"
              extraStyles="shadow-pref bg-sky-400 text-white"
            />
          </form>
        </section>
        <section className="flex flex-col justify-center items-center gap-2">
          <img
            src={IMAGE_THREE}
            alt=""
            className="h-24 w-24 rounded-full"
          ></img>
          <h1 className="text-xl font-bold">Olawale Jumat</h1>
          <h3 className="text-md mb-3">Content Writer</h3>
          <ul className="flex gap-5 text-2xl">
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

        <section className="flex flex-col justify-center gap-5 items-center opacity-60 text-center">
          <span className="text-md leading-8">
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
      </div>
    </footer>
  );
};
export default Footer;
