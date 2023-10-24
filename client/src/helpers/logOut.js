import axios from "axios";
import baseUrl from "../config/baseUrl";

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
    console.error(err);
  }
};
