// src/components/admin/AdminTable.jsx
import React from "react";

const AdminTable = ({ columns, data, actions }) => {
  return (
    <div className="w-full">
      {/* Horizontal scroll container only on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full bg-cream text-darkNavy text-sm md:text-base whitespace-nowrap border-collapse">
          <thead className="bg-primaryBlue text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left py-2 md:py-3 px-2 md:px-4 uppercase font-semibold text-sm md:text-lg"
                >
                  {col.title}
                </th>
              ))}
              {actions && (
                <th className="py-2 md:py-3 px-2 md:px-4 text-left font-semibold text-sm md:text-lg">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-4 text-sm md:text-base"
                >
                  No data available
                </td>
              </tr>
            )}
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-b border-neutralDark/20 hover:bg-neutralDark/10 transition"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base"
                  >
                    {col.render
                      ? col.render(item[col.key], item)
                      : item[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="py-2 md:py-3 px-2 md:px-4 flex flex-wrap gap-2">
                    {actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => action.onClick(item)}
                        className={`py-1 md:py-2 px-2 md:px-4 rounded-lg text-white text-sm md:text-base ${action.color}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
