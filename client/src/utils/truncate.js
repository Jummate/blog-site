import { constant } from "../config/constant";
const truncate = (text) => {
  const splitText = text && text.split(" ");
  if (splitText.length > constant.SUMMARY_LENGTH) {
    return splitText.slice(0, constant.SUMMARY_LENGTH).join(" ") + "...";
  }
  return splitText.join(" ") + "...";
};

export default truncate;
