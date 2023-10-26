const cleanURL = (URLs) => {
  console.log("cleanurl ", { URLs });
  return URLs && URLs.length > 0 && URLs.every((url) => url)
    ? URLs.map((url) => url.toString().replace("src=", "").replaceAll('"', ""))
    : [];
};
module.exports = cleanURL;
