import React from "react";
import { Trash, Edit } from "lucide-react";

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {col.label}
              </th>
            ))}
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr className="">
              <td colSpan={columns.length + 1} className="text-center py-4">
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <button
                  onClick={() => onEdit(row)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                    title="Modifier">
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Supprimer">
                      <Trash size={18} />
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
