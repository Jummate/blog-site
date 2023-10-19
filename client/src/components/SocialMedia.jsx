import { profile } from "../data";

import { FaLinkedin, FaGlobe, FaTwitter } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const icons = {
  linkedin: <FaLinkedin />,
  website: <FaGlobe />,
  email: <BiLogoGmail />,
  twitter: <FaTwitter />,
};

const SocialMedia = ({ userType }) => {
  const data = profile[`${userType}`];
  return (
    <ul className="flex gap-5 text-2xl">
      {Object.keys(data).map((item, index) => (
        <li key={index}>
          <a
            href={data[`${item}`].href}
            title={data[`${item}`].title}
          >
            {icons[item]}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
