import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

import Modal from "./Modal";
import { alertDelete } from "../utils/alert";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import transformImage from "../utils/transformImage";
import { transformConfig } from "../config/imgTransform";

const Table = ({ data, columns, setIsRoleChange }) => {
  const [openModal, setOpenModal] = useState(false);
  const [rowItems, setRowItems] = useState([]);
  const axiosAuth = useAxiosInterceptor();

  return (
    <div className="w-full max-h-52 overflow-auto">
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
                          src={transformImage(
                            row[col.field],
                            transformConfig.AUTHOR_AVATAR
                          )}
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
                  <p className="w-full flex items-center justify-center gap-4">
                    <FaEdit
                      className="text-sky-500 text-lg"
                      onClick={(e) => {
                        setOpenModal(true),
                          setRowItems(
                            JSON.parse(e.target.closest("tr").dataset.data)
                          );
                      }}
                    />
                    <FaTrash
                      className="text-red-500 text-lg"
                      onClick={(e) =>
                        alertDelete({
                          id: JSON.parse(e.target.closest("tr").dataset.data)
                            ._id,
                          axiosAuth,
                          type: "users",
                          callback: setIsRoleChange,
                        })
                      }
                    />
                    {/* <Button
                      extraStyles="bg-sky-500 text-white w-30"
                      onClick={(e) => {
                        setOpenModal(true),
                          setRowItems(
                            JSON.parse(e.target.closest("tr").dataset.data)
                          );
                      }}
                    >
                      Change Roles
                    </Button> */}
                    {/* <Button
                      extraStyles="bg-red-500 text-white w-30"
                      onClick={(e) =>
                        alertDelete({
                          id: JSON.parse(e.target.closest("tr").dataset.data)
                            ._id,
                          axiosAuth,
                          type: "users",
                          callback: setIsRoleChange,
                        })
                      }
                    >
                      Delete User
                    </Button> */}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end md:hidden gap-2">
        <small>Swipe to see hidden details</small>
        <BsArrowRight />
      </div>

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
