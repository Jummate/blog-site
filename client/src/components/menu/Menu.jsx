import { FaTimes } from "react-icons/fa";
import { mobileMenuData } from "../../data";
import { Link } from "react-router-dom";

const Menu = ({ onClick }) => {
  return (
    <nav className=" md:hidden fixed z-10 font-sans flex flex-col gap-5 w-full min-h-screen px-5 top-0 left-0 bg-sky-100 text-sky-600 dark:bg-sky-800 dark:text-sky-100 py-5">
      <div className="flex justify-end text-2xl">
        <FaTimes
          className="cursor-pointer text-2xl bg-sky-800 dark:bg-sky-100 rounded-full text-sky-100 dark:text-sky-800 hover:bg-inherit dark:hover:bg-inherit hover:text-sky-800 dark:hover:text-sky-100"
          onClick={onClick}
        />
      </div>
      {Object.keys(mobileMenuData).map((heading, index) => (
        <div
          key={index}
          className="flex flex-col gap-2"
        >
          <h3 className="text-lg mb-2 text-sky-800 dark:text-sky-200">
            {heading}
          </h3>
          {Object.keys(mobileMenuData[`${heading}`]).map((item) => (
            <Link
              key={`${index}${item}`}
              to={`${mobileMenuData[`${heading}`][`${item}`].link}`}
              className="dark:hover:underline"
              onClick={onClick}
            >
              {item}
            </Link>
          ))}
          {index === 0 ? (
            <hr className="mt-3 border-sky-800/20 dark:border-sky-200/20 border-2" />
          ) : null}
        </div>
      ))}
    </nav>
  );
};

export default Menu;
