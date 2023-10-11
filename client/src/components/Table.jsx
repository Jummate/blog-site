import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";
import { FaTrash } from "react-icons/fa";
import { alertDelete } from "../utils/alert";
import { notify } from "../utils/notify";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import baseUrl from "../config/baseUrl";

const deleteUser = async (id, axiosAuth, callback) => {
  try {
    const response = await axiosAuth.delete(
      `${baseUrl.serverBaseUrl}/users/${id}`
    );
    notify({ msg: response.data.message });
    callback();
  } catch (err) {
    console.log(err);
  }
};

const Table = ({ data, columns, setIsRoleChange }) => {
  const [openModal, setOpenModal] = useState(false);
  const [rowItems, setRowItems] = useState([]);
  const axiosAuth = useAxiosInterceptor();

  return (
    <div className="w-full overflow-auto">
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
          {data.length > 0 &&
            data.map((row, index) => (
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
                  <p className="w-full flex items-center justify-center gap-4">
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
                    <Button
                      extraStyles="bg-red-500 text-white w-30"
                      onClick={(e) =>
                        alertDelete(
                          JSON.parse(e.target.closest("tr").dataset.data)._id,
                          axiosAuth,
                          setIsRoleChange,
                          deleteUser
                        )
                      }
                    >
                      Delete User
                    </Button>
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {openModal && (
        <Modal
          rowItems={rowItems}
          onClose={() => setOpenModal(false)}
          setIsRoleChange={setIsRoleChange}
        />
      )}
    </div>
  );
};

export default Table;
