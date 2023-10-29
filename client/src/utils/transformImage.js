const transformImage = (imageURL, transformation) => {
  return !transformation
    ? imageURL
    : imageURL.split("upload").join(`upload/${transformation}`);
};

export default transformImage;
