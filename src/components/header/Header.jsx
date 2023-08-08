import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Menu from "../menu/Menu";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="w-full p-5 z-2 font-sans font-bold sticky top-0 bg-slate-200 text-sky-900">
      <nav className="flex justify-between">
        <h1 className="cursor-pointer"> Leo's Blog</h1>
        <FaBars
          className="md:hidden cursor-pointer text-xl"
          onClick={() => setOpenMenu(true)}
        />
        <div className="hidden md:flex">
          <a href="">Home</a>
          <a href="">Log In</a>
          <a href="">Dashboard</a>
        </div>
      </nav>
      {openMenu ? <Menu onClick={() => setOpenMenu(false)} /> : null}
    </header>
  );
};

export default Header;
