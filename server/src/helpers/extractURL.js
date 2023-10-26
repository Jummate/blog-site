const extractURL = (text) => {
  console.log({ text });
  return text && text.match(/src\s*=\s*"(.+?)"/g);
};

module.exports = extractURL;
