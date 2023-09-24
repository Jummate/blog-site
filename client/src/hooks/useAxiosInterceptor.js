import axios from "axios";
import baseUrl from "../config/baseUrl";
import { notify } from "../utils/notify";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAxiosInterceptor = () => {
  const { token, setToken } = useContext(AuthContext);
  const axiosAuth = axios.create({
    baseURL: baseUrl.serverBaseUrl,
    withCredentials: true,
  });

  axiosAuth.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosAuth.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // alert("No token detected from response");
        notify({
          msg: error.response.data.message,
          type: "error",
          autoClose: false,
        });
      }
      if (error.response.status === 403) {
        return axiosAuth
          .get(`${baseUrl.serverBaseUrl}/refresh`)
          .then((response) => {
            setToken(response.data.accessToken);
            error.config.headers[
              "Authorization"
            ] = `Bearer ${response.data.accessToken}`;
            return axios(error.config);
          })
          .catch((err) => console.log(err));
      }
      return Promise.reject(error);
    }
  );
  return axiosAuth;
};

export default useAxiosInterceptor;
