import { BsSun, BsMoon } from "react-icons/bs";
import useRootElementClass from "../hooks/useRootElementClass";

const ColorMode = ({ colorMode, setColorMode }) => {
  useRootElementClass(colorMode);
  return (
    <>
      {colorMode === "dark" ? (
        <BsMoon
          className="cursor-pointer text-2xl hover:text-sky-300"
          onClick={() => setColorMode(null)}
        />
      ) : (
        <BsSun
          className="cursor-pointer text-2xl hover:text-sky-300"
          onClick={() => setColorMode("dark")}
        />
      )}
    </>
  );
};

export default ColorMode;
