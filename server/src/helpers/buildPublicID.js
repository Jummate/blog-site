const path = require("path");

const buildPublicID = (URLs, root = undefined) => {
  console.log("buildpid ", { URLs });
  return URLs && URLs.length > 0 && URLs.every((url) => url)
    ? URLs.map((url) => {
        const imageID = path.parse(url).name;
        const pathToImageFolder = path.parse(url).dir;
        const imageFolder = pathToImageFolder.split("/").slice(-1).toString();
        return root
          ? `${root}/${imageFolder}/${imageID}`
          : `${imageFolder}/${imageID}`;
      })
    : [];
};

module.exports = buildPublicID;
