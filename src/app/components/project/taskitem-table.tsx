"use client";

import { toast } from "react-toastify";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiOutlineUndo } from "react-icons/ai";
import { TaskItemTableRow } from "./taskitem-tablerow";
import { setTaskItemList } from "@/store/project/project-slice";
import { useSelector } from "react-redux";

export const TaskItemTable = ({
  taskitems,
  updateTaskItems,
}: {
  taskitems: any[];
  updateTaskItems: (list) => void;
}) => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [lastRemovedRow, setLastRemovedRow] = useState(null);

  const [tableUpdate, setTableUpdate] = useState(false);

  useEffect(() => {
    const q = [...taskitems];
    setTableData(q);
  }, [taskitems]);

  useEffect(() => {
    if (tableData.length > 0) {
      updateTaskItems(tableData);
    }
  }, [tableUpdate]);

  const addRowFromHeader = () => {
    const newRowId = Math.max(...tableData.map((row) => row.rowindex), 0) + 1;
    const newEmptyRow = {
      rowstatus: "a",
      rowindex: newRowId,
      description: "",
      estimatecount: 0,
    };

    setTableData([...tableData, newEmptyRow]);
    setTableUpdate((prv: boolean) => !prv);
  };

  const removeRow = (rowData, rowIndex) => {
    const updatedTableData = tableData.map((row, index) => {
      if (index === rowIndex) {
        if (row.taskitemid) {
          return { ...row, rowstatus: "d" };
        } else {
          return { ...row, rowstatus: "r" };
        }
      }
      return row;
    });

    setLastRemovedRow({ rowData, rowIndex });
    setTableData(updatedTableData);
    setTableUpdate((prv: boolean) => !prv);
  };

  const undoRemove = () => {
    if (!lastRemovedRow) return;

    const updatedTableData = tableData.map((row, index) => {
      if (index === lastRemovedRow.rowIndex) {
        if (row.taskitemid) {
          return { ...row, rowstatus: "u" };
        } else {
          return { ...row, rowstatus: "a" };
        }
      }
      return row;
    });

    setTableData(updatedTableData);
    setLastRemovedRow(null);
    setTableUpdate((prv: boolean) => !prv);
  };

  const updateTableRows = (newVal: any) => {
    const updatedArray = tableData.map((r) =>
      r.rowindex === newVal.rowindex ? newVal : r
    );
    setTableData(updatedArray);
    setTableUpdate((prv: boolean) => !prv);
  };

  return (
    <div className="md:px-2 py-1 sm:w-3/3 w-full">
      <div className="shadow rounded-lg border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="">
            <tr>
              <th
                className={
                  "text-center py-1 uppercase text-sm font-bold w-10 border border-blue-500"
                }
              >
                <Button
                  isIconOnly
                  color="warning"
                  variant="light"
                  aria-label="Create Item"
                >
                  <AiFillPlusCircle
                    onClick={addRowFromHeader}
                    className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                  />
                </Button>
              </th>
              <th className="w-60 border border-blue-500">Description</th>
              <th className="w-40 border border-blue-500">Estimate count</th>
              <th
                className={
                  "text-center py-1 uppercase text-sm font-bold w-10 border border-blue-500"
                }
              >
                <div
                  className={`${
                    lastRemovedRow ? "" : "pointer-events-none opacity-50"
                  }`}
                >
                  <Button
                    isIconOnly
                    color="warning"
                    variant="light"
                    aria-label="Create Item"
                  >
                    <AiOutlineUndo
                      onClick={undoRemove}
                      className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
                    />
                  </Button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tableData?.length === 0 ? (
              <tr>
                <td
                  className="text-center py-1 px-4 border border-blue-500"
                  colSpan={8}
                >
                  No Data Found
                </td>
              </tr>
            ) : (
              tableData?.map((tableRow: any, index: number) =>
                tableRow?.rowstatus == "r" ||
                tableRow?.rowstatus == "d" ? null : (
                  <TaskItemTableRow
                    key={tableRow.rowindex}
                    index={index}
                    tableRowIn={tableRow}
                    onRemoveRow={() => removeRow(tableRow, index)}
                    updateTableRows={updateTableRows}
                  />
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
