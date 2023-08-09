import { FaTimes } from "react-icons/fa";

const Menu = ({ onClick }) => {
  return (
    <nav className=" md:hidden fixed z-10 flex flex-col gap-5 w-full min-h-screen px-5 top-0 left-0 bg-slate-200 py-5">
      <div className="flex justify-end text-2xl">
        <FaTimes
          className="cursor-pointer text-2xl"
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg mb-2 font-bold">Main Menu</h3>
        <a
          href=""
          className=""
        >
          Home
        </a>
        <a
          href=""
          className=""
        >
          Log In
        </a>
        <a
          href=""
          className=""
        >
          Dashboard
        </a>
        <a
          href=""
          className=""
        >
          Log Out
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg mb-2 font-bold">Topics</h3>
        <a
          href=""
          className=""
        >
          Science & Nature
        </a>
        <a
          href=""
          className=""
        >
          Politics
        </a>
        <a
          href=""
          className=""
        >
          Environment
        </a>
      </div>
    </nav>
  );
};

export default Menu;
