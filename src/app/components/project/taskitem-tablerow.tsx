"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

export const TaskItemTableRow = ({
  index,
  tableRowIn,
  onRemoveRow,
  updateTableRows,
}: {
  index: any;
  tableRowIn: any;
  onRemoveRow: any;
  updateTableRows: (taskRow: any) => void;
}) => {
  const [tableRow, setTableRow] = useState(tableRowIn);

  useEffect(() => {
    const q = { ...tableRowIn };
    setTableRow(q);
  }, [tableRowIn]);

  const updateData = (newObject: any) => {
    setTableRow(newObject);
    updateTableRows(newObject);
  };

  const handleFocus = (event) => {
    event.target.select();
  };
  return (
    <tr className="even:bg-purple-gray-50/50">
      <td className="text-center py-1 px-4">{index + 1}</td>
      <td className="text-center py-1 px-4">
        <input
          id="description"
          name="description"
          type="text"
          autoComplete=""
          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          value={tableRow.description}
          onChange={(e) =>
            updateData({ ...tableRow, description: e.target.value })
          }
        />
      </td>
      <td className="text-center py-1 px-4">
        <input
          id="estimatecount"
          name="estimatecount"
          type="number"
          autoComplete=""
          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
          value={tableRow.estimatecount}
          onChange={(e) =>
            updateData({ ...tableRow, estimatecount: e.target.value })
          }
          onFocus={handleFocus}
        />
      </td>
      <td className="text-center py-1 px-4">
        <Button
          isIconOnly
          color="warning"
          variant="light"
          aria-label="Create Item"
        >
          <AiFillMinusCircle
            onClick={() => onRemoveRow(tableRow, index)}
            className="inline-block h-6 w-6 text-red-700 hover:text-red-500 cursor-pointer"
          />
        </Button>
      </td>
    </tr>
  );
};
