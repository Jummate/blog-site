import { notify } from "./notify";
import axios from "axios";

export const subscribeToNewsletter = async (email) => {
  const options = {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": import.meta.env.VITE_APP_BREVO_API_KEY,
    },
  };
  const data = {
    email,
    updateEnabled: true,
    emailBlacklisted: false,
    smsBlacklisted: false,
  };

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/contacts",
      data,
      options
    );
    if (response.status === 201) {
      notify({ msg: "Successful!. Thanks for your interest!" });
    }
    if (response.status === 204) {
      notify({
        msg: "You have already subscribed!",
        type: "info",
        autoClose: false,
      });
    }
  } catch (error) {
    if (error.response.status === 400) {
      notify({
        msg: error.response.data.message,
        type: "error",
        autoClose: false,
      });
    }

    console.log(error);
  }
};
