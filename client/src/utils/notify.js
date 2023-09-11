import { toast } from "react-toastify";

export const notify = ({ msg, type = "success" }) => {
  toast(msg, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type,
  });
};
