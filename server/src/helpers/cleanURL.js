const cleanURL = (URLs) => {
  return URLs.map((url) =>
    url.toString().replace("src=", "").replaceAll('"', "")
  );
};
module.exports = cleanURL;
