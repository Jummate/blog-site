import IMAGE_TWO from "./assets/image2.jpg";

export const menuData = {
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

export const socialMedia = {
  user: {
    linkedin: {
      href: "https://www.linkedin.com/in/omololu-jumat-1405",
      title: "Developer's LinkedIn Profile",
    },
    website: {
      href: "https://omololujumat.netlify.app",
      title: "Developer's Portfolio Website",
    },
    email: {
      href: "mailto:omololujumat@gmail.com",
      title: "Developer's Email Address",
    },
    twitter: {
      href: "mailto:omololujumat@gmail.com",
      title: "Developer's Email Address",
    },
  },

  developer: {
    linkedin: {
      href: "https://www.linkedin.com/in/omololu-jumat-1405",
      title: "Developer's LinkedIn Profile",
    },
    website: {
      href: "https://omololujumat.netlify.app",
      title: "Developer's Portfolio Website",
    },
    email: {
      href: "mailto:omololujumat@gmail.com",
      title: "Developer's Email Address",
    },
  },
};

// module.exports = { mobileMenuData, tagData };
