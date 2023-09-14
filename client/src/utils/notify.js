import { toast } from "react-toastify";

export const notify = ({ msg, type = "success", autoClose = 1000 }) => {
  toast(msg, {
    position: "top-center",
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type,
  });
};
