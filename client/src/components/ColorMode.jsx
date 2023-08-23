import { BsSun, BsMoon } from "react-icons/bs";
import useRootElementClass from "../hooks/useRootElementClass";

const ColorMode = ({ colorMode, setColorMode }) => {
  useRootElementClass(colorMode);
  return (
    <>
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
    </>
  );
};

export default ColorMode;
