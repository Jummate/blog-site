const convertToBase64 = (buffer, mimetype) => {
  const b64 = Buffer.from(buffer).toString("base64");
  let dataURI = "data:" + mimetype + ";base64," + b64;
  return dataURI;
};
module.exports = convertToBase64;
