import Table from "../components/Table";
import { useState, useEffect } from "react";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import { columns } from "../data";
import { notify } from "../utils/notify";
import SERVER_ERR_MSG from "../config/errorMsg";

const ChangeStatus = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // this is required to cause the Table to re-render to reflect update immediately
  const [isRoleChange, setIsRoleChange] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios.get(`${baseUrl.serverBaseUrl}/users/`, {
          cancelToken: source.token,
        });
        setIsLoading(false);
        response.data.length > 0
          ? setUsers(response.data)
          : setUsers(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Axios request aborted");
        } else {
          console.log(err);
          notify({
            msg:
              !err.response || err?.response?.status >= 500
                ? SERVER_ERR_MSG
                : err?.response?.data?.message,
            type: "error",
            autoClose: false,
          });
        }
      }
    })();

    return () => {
      source.cancel();
    };
  }, [isRoleChange]);

  return (
    <section className="flex justify-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 min-h-screen">
      <div className="flex flex-col w-full max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          USERS AND ROLES
        </h1>

        {isLoading ? (
          <p className="text-center mt-18">Loading...</p>
        ) : users.length < 1 ? (
          <p className="text-center">No data to display</p>
        ) : (
          <Table
            data={users}
            columns={columns}
            setIsRoleChange={() => setIsRoleChange(!isRoleChange)}
          />
        )}
      </div>
    </section>
  );
};

export default ChangeStatus;
