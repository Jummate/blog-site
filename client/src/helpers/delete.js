import SERVER_ERR_MSG from "../config/errorMsg";
import baseUrl from "../config/baseUrl";
import { notify } from "../utils/notify";

const deleteItem = async ({ id, axiosAuth, type }) => {
  try {
    const response = await axiosAuth.delete(
      `${baseUrl.serverBaseUrl}/${type}/${id}`
    );
    notify({ msg: response.data.message });
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

export default deleteItem;
