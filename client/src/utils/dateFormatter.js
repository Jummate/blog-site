export const formatDate = (rawDate) => {
  let date = new Date(rawDate);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
