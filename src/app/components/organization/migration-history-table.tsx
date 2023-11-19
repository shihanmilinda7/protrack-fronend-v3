"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import StaffAddNew from "./addnew";
import IconConfirmAlertbox from "../common-comp/icon-confirm-alertbox";

export const MigrationHitoryTable = ({
  rowData,
  setReloadTable,
}: {
  rowData?: any[];
  setReloadTable?: () => void;
}) => {
  return (
    <div className="w-full">
      <div className="shadow rounded border-b border-gray-200 w-full">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="w-10">#</TableColumn>
            <TableColumn className="w-80">Query</TableColumn>
            <TableColumn className="w-10">Type</TableColumn>
            <TableColumn className="w-10">Status</TableColumn>
            <TableColumn className="w-10">-</TableColumn>
          </TableHeader>
          <TableBody>
            {rowData?.map((tableRow: any, index: number) => (
              <TableRow key={tableRow.staffid} className="">
                <TableCell>{index + 1}</TableCell>
                <TableCell className="w-40 text-ellipsis overflow-hidden">
                  {tableRow.querystring}
                </TableCell>
                <TableCell>{tableRow.type}</TableCell>
                <TableCell>{tableRow.status}</TableCell>
                <TableCell>
                  <IconConfirmAlertbox
                    buttonName="Delete"
                    leftButtonAction={() => {}}
                    description="Do you want to delete this record ?"
                    isDisable={tableRow.status == "done" ? true : false}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
