import { READING_SPEED } from "../config/readingSpeed";
import { removeTag } from "./removeTag";
export const calculateReadingSpeed = (str) => {
  let text = removeTag(str);

  return Math.floor(text.split(" ").length / READING_SPEED);
};
