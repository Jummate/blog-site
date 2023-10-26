const extractURL = (text) => {
  return text && text.match(/src\s*=\s*"(.+?)"/g);
};

module.exports = extractURL;
