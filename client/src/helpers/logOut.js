import axios from "axios";
import baseUrl from "../config/baseUrl";
import { notify } from "../utils/notify";

export const logOut = async (
  navigate,
  setToken,
  handleProfileMenu = undefined,
  timerID = undefined
) => {
  try {
    await axios.get(`${baseUrl.serverBaseUrl}/logout`, {
      withCredentials: true,
    });
    handleProfileMenu && handleProfileMenu();
    timerID && clearTimeout(timerID);
    setToken("");
    navigate("/");
  } catch (err) {
    console.log(err);
    notify({
      msg:
        err.response.status >= 500
          ? "Something went wrong. Please check your connection or try again."
          : err?.response?.data?.message,
      type: "error",
      autoClose: false,
    });
  }
};
