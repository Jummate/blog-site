import Table from "../components/Table";
import { useState, useEffect } from "react";
import baseUrl from "../config/baseUrl";
import axios from "axios";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
const data = [
  { _id: 1, firstName: "Bayo", lastName: 13, roles: ["Active", "Boom"] },
  { _id: 2, firstName: "Tunde", lastName: 12, roles: ["Inactive"] },
  { _id: 3, firstName: "Tolu", lastName: 11, roles: ["Software"] },
  { _id: 4, firstName: "Lolu", lastName: 12, roles: ["Frontender"] },
];

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
  const axiosAuth = useAxiosInterceptor();

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios.get(`${baseUrl.serverBaseUrl}/users/`, {
          cancelToken: source.token,
        });
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
  }, []);
  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col w-full max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          USERS AND ROLES
        </h1>
        <Table
          data={users}
          columns={columns}
        />
      </div>
    </section>
  );
};

export default ChangeStatus;
