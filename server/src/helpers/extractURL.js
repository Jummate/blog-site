const extractURL = (text) => {
  return text.match(/src\s*=\s*"(.+?)"/g);
};

module.exports = extractURL;
