import { FaTimes } from "react-icons/fa";
import { mobileMenuData } from "../../data";
import { Link } from "react-router-dom";

const Menu = ({ onClick }) => {
  return (
    <nav className=" md:hidden fixed z-10 font-sans flex flex-col gap-5 w-full min-h-screen px-5 top-0 left-0 bg-slate-200 text-sky-600 py-5">
      <div className="flex justify-end text-2xl">
        <FaTimes
          className="cursor-pointer text-2xl"
          onClick={onClick}
        />
      </div>
      {Object.keys(mobileMenuData).map((heading, index) => (
        <div
          key={index}
          className="flex flex-col gap-2"
        >
          <h3 className="text-lg mb-2 text-sky-800">{heading}</h3>
          {Object.keys(mobileMenuData[`${heading}`]).map((item) => (
            <Link
              key={`${index}${item}`}
              to={`${mobileMenuData[`${heading}`][`${item}`].link}`}
              className=""
              onClick={onClick}
            >
              {item}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default Menu;
