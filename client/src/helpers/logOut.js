import axios from "axios";
import baseUrl from "../config/baseUrl";
import { notify } from "../utils/notify";
import SERVER_ERR_MSG from "../config/errorMsg";

export const logOut = async ({
  navigate,
  url = "/",
  setToken,
  handleProfileMenu = undefined,
  timerID = undefined,
}) => {
  try {
    await axios.get(`${baseUrl.serverBaseUrl}/logout`, {
      withCredentials: true,
    });
    handleProfileMenu && handleProfileMenu();
    timerID && clearTimeout(timerID);
    setToken("");
    navigate(url);
  } catch (err) {
    console.log(err);
    notify({
      msg:
        err.response.status >= 500
          ? SERVER_ERR_MSG
          : err?.response?.data?.message,
      type: "error",
      autoClose: false,
    });
  }
};
