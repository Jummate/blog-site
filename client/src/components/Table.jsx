import Button from "./Button";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import baseUrl from "../config/baseUrl";
import axios from "axios";

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

const Table = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rowItems, setRowItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);
  return (
    <div className="w-full overflow-auto">
      {isLoading ? (
        <p className="text-center mt-18">Loading...</p>
      ) : users.length < 1 ? (
        <p className="text-center">No data to display</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead className="bg-sky-700 text-sky-50 p-5">
            <tr>
              <th className="font-bold cursor-pointer text-center"></th>
              {columns &&
                columns.map((head) => (
                  <th
                    key={head.header}
                    className="p-3 font-bold cursor-pointer text-center"
                  >
                    {head.header}
                  </th>
                ))}
              <th className="font-bold cursor-pointer text-center"></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((row, index) => (
                <tr
                  key={index}
                  data-data={JSON.stringify(row)}
                >
                  <td className="p-3 font-bold cursor-pointer text-center">
                    {index + 1}
                  </td>
                  {columns.map((col) => {
                    if (col.field === "avatar" && row[col.field]) {
                      return (
                        <td
                          key={col.field}
                          className="p-3 font-bold cursor-pointer text-center"
                        >
                          <img
                            src={row[col.field]}
                            className="h-8 w-8 rounded-full"
                          />
                        </td>
                      );
                    }
                    return (
                      <td
                        key={col.field}
                        className="p-3 font-bold cursor-pointer text-center"
                      >
                        {Array.isArray(row[col.field])
                          ? row[col.field].join(", ")
                          : row[col.field]}
                      </td>
                    );
                  })}
                  <td className="p-3 font-bold cursor-pointer text-center">
                    {/* <FaEdit className="w-full" /> */}
                    <p className="w-full flex items-center justify-center">
                      <Button
                        extraStyles="bg-sky-500 text-white w-30"
                        onClick={(e) => {
                          setOpenModal(true),
                            setRowItems(
                              JSON.parse(e.target.closest("tr").dataset.data)
                            );
                        }}
                      >
                        Change Roles
                      </Button>
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {openModal && (
        <Modal
          rowItems={rowItems}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Table;
