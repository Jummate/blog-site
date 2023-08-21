import { useEffect } from "react";

const addRootElementClass = (className) =>
  document.documentElement.classList.add(className);

const removeRootElementClass = (className) =>
  document.documentElement.classList.remove(className);

const useRootElementClass = (className) =>
  useEffect(() => {
    className === "dark" && addRootElementClass(className);

    return () => removeRootElementClass(className);
  }, [className]);

export default useRootElementClass;
