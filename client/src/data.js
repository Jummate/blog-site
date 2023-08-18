import IMAGE_TWO from "./assets/image2.jpg";
import IMAGE_ONE from "./assets/image1.jpg";

export const mobileMenuData = {
  "Main Menu": {
    Home: { link: "/" },
    "Log In": { link: "login" },
    "Log Out": { link: "" },
    "Create New Post": { link: "create" },
  },
  Topics: {
    "Science & Nature": { link: "" },
    Politics: { link: "" },
    Environment: { link: "" },
  },
};

export const tagData = [
  "science",
  "nature",
  "technology",
  "wildlife",
  "politics",
  "travel",
];

export const topicData = {
  Science: IMAGE_TWO,
  Nature: IMAGE_TWO,
  Technology: IMAGE_TWO,
};

export const loginPageData = [
  { element: "input", label: "Email", type: "text", id: "email" },
  { element: "input", label: "Password", type: "password", id: "email" },
];

export const postData = [
  {
    id: "qaAb23456ZCVhjk",
    tag: "Science",
    title: "My First Foray Into Lazy Loading With JavaScript",
    summary:
      " Lazy Loading is a performance-improvement technique which seeks to lorem ipsum when the lorem ipsum is the lorem ipsum within the lorem ipsum...",
    readTime: "4min",
    author: "Olawale Jumat",
    createdAt: "April 20, 2023",
    bannerImage: IMAGE_ONE,
    authorImage: IMAGE_ONE,
  },

  {
    id: "xaAb109836ZCVzct",
    tag: "Nature",
    title: "My First Foray Into Nature",
    summary:
      " Lazy Loading is a performance-improvement technique which seeks to lorem ipsum when the lorem ipsum is the lorem ipsum within the lorem ipsum...",
    readTime: "6min",
    author: "Olawale Jumat",
    createdAt: "April 20, 2023",
    bannerImage: IMAGE_TWO,
    authorImage: IMAGE_TWO,
  },
];
// module.exports = { mobileMenuData, tagData };
