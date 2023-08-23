import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Menu from "../menu/Menu";
import ColorMode from "../ColorMode";
import { Link } from "react-router-dom";
import { menuData } from "../../data";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [colorMode, setColorMode] = useState(null);
  return (
    <header className="w-full p-5 font-sans font-bold sticky top-0 left-0 bg-slate-100 text-sky-900 dark:bg-sky-900 dark:text-slate-100 z-10">
      <nav className="flex justify-between">
        <h1 className="cursor-pointer"> Leo's Blog</h1>
        <div className="hidden md:flex md:text-lg gap-6">
          {/* <Link to="/">Home</Link>
          <Link to="login">Log In</Link>
          <Link to="">Log Out</Link>
          <Link to="/create">Create New Post</Link> */}
          {Object.keys(menuData["Main Menu"]).map((item, index) => (
            <Link
              key={index}
              to={menuData["Main Menu"][`${item}`].link}
              className="hover:underline"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <ColorMode
            colorMode={colorMode}
            setColorMode={setColorMode}
          />

          <FaBars
            className="md:hidden cursor-pointer text-xl"
            onClick={() => setOpenMenu(true)}
          />
        </div>
      </nav>
      {openMenu ? (
        <Menu
          // ColorMode={
          //   <ColorMode
          //     colorMode={colorMode}
          //     setColorMode={setColorMode}
          //   />
          // }
          onClick={() => setOpenMenu(false)}
        />
      ) : null}
    </header>
  );
};

export default Header;
