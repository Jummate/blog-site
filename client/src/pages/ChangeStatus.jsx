import Table from "../components/Table";
import { useState, useEffect } from "react";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";

const columns = [
  {
    field: "firstName",
    header: "First Name",
  },
  {
    field: "lastName",
    header: "Last Name",
  },
  {
    field: "avatar",
    header: "Avatar",
  },
  {
    field: "email",
    header: "Email",
  },
  {
    field: "roles",
    header: "Roles",
  },
];

const ChangeStatus = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRoleChange, setIsRoleChange] = useState(false);
  const axiosAuth = useAxiosInterceptor();

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios.get(`${baseUrl.serverBaseUrl}/users/`, {
          cancelToken: source.token,
        });
        setIsLoading(false);
        setUsers(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Axios request aborted");
        } else {
          console.log(err);
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
