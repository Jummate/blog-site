import { logOut } from "./logOut";
// import jwt_decode from "jwt-decode";

export const autoLogOut = (navigate, setToken) => {
  // const decoded = token && jwt_decode(token);
  // let expiryTime = Number(decoded.exp) - Number(decoded.iat);
  // expiryTime = expiryTime * 1000;
  const timeOut = import.meta.env.VITE_APP_AUTO_LOG_OUT_TIME;
  const timer = setTimeout(() => {
    logOut(navigate, setToken);
  }, timeOut);

  return timer;
};
