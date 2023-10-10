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
  const axiosAuth = useAxiosInterceptor();

  return (
    <section className="flex justify-center items-center p-5 pb-10 text-sky-900 dark:bg-sky-800 dark:text-sky-100 ">
      <div className="flex flex-col w-full max-w-4xl">
        <h1 className="text-center text-xl p-3 font-extrabold">
          USERS AND ROLES
        </h1>

        <Table />
      </div>
    </section>
  );
};

export default ChangeStatus;
