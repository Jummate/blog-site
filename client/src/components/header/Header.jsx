import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import Menu from "../menu/Menu";
import useRootElementClass from "../../hooks/useRootElementClass";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [colorMode, setColorMode] = useState(null);

  useRootElementClass(colorMode);

  return (
    <header className="w-full p-5 font-sans font-bold sticky top-0 left-0 bg-slate-100 text-sky-900 dark:bg-sky-900 dark:text-slate-100 z-10">
      <nav className="flex justify-between">
        <h1 className="cursor-pointer"> Leo's Blog</h1>
        <div className="hidden md:flex">
          <a href="">Home</a>
          <a href="">Log In</a>
          <a href="">Dashboard</a>
        </div>
        <div className="flex gap-3">
          {colorMode === "dark" ? (
            <BsMoon
              className="cursor-pointer text-xl"
              onClick={() => setColorMode(null)}
            />
          ) : (
            <BsSun
              className="cursor-pointer text-xl"
              onClick={() => setColorMode("dark")}
            />
          )}

          <FaBars
            className="md:hidden cursor-pointer text-xl"
            onClick={() => setOpenMenu(true)}
          />
        </div>
      </nav>
      {openMenu ? <Menu onClick={() => setOpenMenu(false)} /> : null}
    </header>
  );
};

export default Header;
