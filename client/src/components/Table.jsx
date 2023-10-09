import { FaEdit } from "react-icons/fa";
import Button from "./Button";

const Table = ({ data, columns }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
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
                key={row.id}
                data-data={JSON.stringify(row)}
              >
                <td className="p-3 font-bold cursor-pointer text-center">
                  {index + 1}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.field}
                    className="p-3 font-bold cursor-pointer text-center"
                  >
                    {Array.isArray(row[col.field])
                      ? row[col.field].join(", ")
                      : row[col.field]}
                  </td>
                ))}
                <td className="p-3 font-bold cursor-pointer text-center">
                  {/* <FaEdit className="w-full" /> */}
                  <p className="w-full flex items-center justify-center">
                    <Button extraStyles="bg-sky-500 text-white w-30">
                      Change Roles
                    </Button>
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!data.length && (
        <p style={{ textAlign: "center" }}>No data to display</p>
      )}
    </div>
  );
};

export default Table;
