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
import { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import ExcelJS from "exceljs";
import { TimelogSummaryExcel } from "./month-summary-excel";

import jsPDF from "jspdf";
import "jspdf-autotable";

export const TimelogSummaryTable = ({
  rowObjectIn,
  tablePagination,
  staffname,
}: {
  rowObjectIn?: any[];
  tablePagination?: number;
  staffname: any;
}) => {
  const [dateRows, setDateRows] = useState([]);

  useEffect(() => {
    const q = [...rowObjectIn];
    setDateRows(q);
  }, [rowObjectIn]);

  const totalHours = rowObjectIn?.reduce(
    (total, obj) => total + parseInt(obj.totaltime),
    0
  );

  // const downloadAsPDF = () => {
  //   const doc = new jsPDF();

  //   // Set the content of the PDF using jsPDF
  //   doc.text('CeyInfo Solutions - Monthly working summary', 15, 15);
  //   doc.text(`Average Days - ${totalHours / 8} / Days`, 15, 25);
  //   doc.text(`Total Hours - ${totalHours} / Hours`, 15, 35);

  //   // Set the table content in PDF
  //   const tableData = [];
  //   dateRows.forEach((row, index) => {
  //     const rowData = [];
  //     // Add your row data to tableData array

  //     tableData.push(rowData);
  //   });

  //   doc.autoTable({
  //     head: [['Date', 'Day', 'Status', 'Total hours', 'Worked hours', 'Project', 'Task', 'Task item', 'Estimate count', 'Count', 'Activity notes']],
  //     body: tableData,
  //   });

  //   // Download the PDF file
  //   doc.save('table.pdf');
  // };
  // const downloadAsPDF = () => {
  //   const doc = new jsPDF();

  //   doc.text("CeyInfo Solutions - Monthly working summary", 15, 15);
  //   doc.text(`Average Days - ${totalHours / 8} / Days`, 15, 25);
  //   doc.text(`Total Hours - ${totalHours} / Hours`, 15, 35);

  //   const tableData = dateRows.map((row) => [
  //     row.dayDate,
  //     row.dayName,
  //     row.status,
  //     row.totaltime,
  //     // Add other row data as needed
  //   ]);

  //   // Now TypeScript should recognize the autoTable method
  //   doc.autoTable({
  //     head: [["Date", "Day", "Status", "Total hours" /* Add other headers */]],
  //     body: tableData,
  //   });

  //   doc.save("table.pdf");
  // };
  return (
    <div className="md:px-2 py-2 w-full">
      <div className={rowObjectIn.length > 0 ? "mr-2" : "hidden"}>
        <TimelogSummaryExcel
          tableDivIn={document.getElementById("pdf-content")}
          staffname={staffname}
          totalHours={totalHours}
        />
        {/* <button onClick={downloadAsPDF}>Download as PDF</button> */}
      </div>
      <div id="pdf-content">
        <div className="pb-1 w-full flex items-center justify-between">
          <div className="flex flex-col items-center justify-center mx-auto">
            <span className="pl-1 mx-auto text-xl leading-none text-gray-900 select-none  flex items-center justify-center">
              CeyInfo Solutions
            </span>
            <span className="pl-1 mx-auto text-base leading-none text-gray-900 select-none  flex items-center justify-center mt-1">
              Monthly working summary
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 ml-auto mr-16 mb-1  overflow-hidden">
            <span className="text-indigo-600">
              Avarage Days - {totalHours / 8} /Days
            </span>
          </span>
          <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 ml-auto mr-16 mb-1  overflow-hidden">
            <span className="text-indigo-600">
              Total Hours - {totalHours} /Hours
            </span>
          </span>
        </div>
        <div className="shadow rounded border-b border-gray-200 w-full">
          <Table aria-label="Example static collection table">
            <TableHeader>
              {/* <TableColumn className="w-10">#</TableColumn> */}
              <TableColumn className="w-10/100 border border-blue-500">
                Date
              </TableColumn>
              <TableColumn className="w-10/100 border border-blue-500">
                Day
              </TableColumn>
              <TableColumn className="w-40/100 border border-blue-500">
                Status
              </TableColumn>
              <TableColumn className="w-10/100 border border-blue-500">
                Total hours
              </TableColumn>
              <TableColumn className="w-10/100 border border-blue-500">
                Worked hours
              </TableColumn>
              <TableColumn className="w-40/100 border border-blue-500">
                Project
              </TableColumn>
              <TableColumn className="w-40/100 border border-blue-500">
                Task
              </TableColumn>
              <TableColumn className="w-60/100 border border-blue-500">
                Task item
              </TableColumn>
              <TableColumn className="w-10/100 border border-blue-500">
                Estimate count
              </TableColumn>
              <TableColumn className="w-10/100 border border-blue-500">
                Count
              </TableColumn>
              <TableColumn className="w-80/100 border border-blue-500">
                Activity notes
              </TableColumn>
            </TableHeader>
            <TableBody>
              {dateRows?.map((tableRow: any, index: number) => (
                <TableRow key={tableRow.dayDate} className="">
                  {/* <TableCell>{index + 1}</TableCell> */}
                  <TableCell className="border border-blue-500">
                    {tableRow.dayDate}
                  </TableCell>
                  <TableCell className="uppercase border border-blue-500">
                    {tableRow.dayName}
                  </TableCell>
                  <TableCell className="border border-blue-500">
                    {tableRow.status}
                  </TableCell>
                  <TableCell className="border border-blue-500 font-semibold bg-gray-300">
                    {tableRow.totaltime}
                  </TableCell>
                  <TableCell className="border border-blue-500 px-0 p-0 m-0">
                    <div className="flex flex-col">
                      {tableRow.taskdetails &&
                        tableRow.taskdetails?.map((td) => (
                          <ul className="py-1 px-3" key={td.timelogdetailid}>
                            <li>{td.time ? td.time : "0"}</li>
                          </ul>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell className="border border-blue-500 px-0 p-0 m-0">
                    <div className="flex flex-col">
                      {tableRow.taskdetails &&
                        tableRow.taskdetails?.map((td) => (
                          <ul className="py-1 px-3" key={td.timelogdetailid}>
                            <li>{td.projectname ? td.projectname : "-"}</li>
                          </ul>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell className="border border-blue-500 px-0 p-0 m-0">
                    {tableRow.taskdetails &&
                      tableRow.taskdetails?.map((td) => (
                        <ul className="py-1 px-3" key={td.timelogdetailid}>
                          <li>{td.taskname ? td.taskname : "-"}</li>
                        </ul>
                      ))}
                  </TableCell>
                  <TableCell className="border border-blue-500 px-0 p-0 m-0">
                    {tableRow.taskdetails &&
                      tableRow.taskdetails?.map((td) => (
                        <ul className="py-1 px-3" key={td.timelogdetailid}>
                          <li>{td.description ? td.description : "-"}</li>
                        </ul>
                      ))}
                  </TableCell>
                  <TableCell className="border border-blue-500 font-semibold bg-gray-300">
                    {tableRow.taskdetails &&
                      tableRow.taskdetails?.map((td) => (
                        <ul className="py-1 px-3" key={td.timelogdetailid}>
                          <li>{td.estimatecount ? td.estimatecount : "-"}</li>
                        </ul>
                      ))}
                  </TableCell>
                  <TableCell className="border border-blue-500 px-0 p-0 m-0">
                    {tableRow.taskdetails &&
                      tableRow.taskdetails?.map((td) => (
                        <ul className="py-1 px-3" key={td.timelogdetailid}>
                          <li>{td.count ? td.count : "-"}</li>
                        </ul>
                      ))}
                  </TableCell>
                  <TableCell className="border border-blue-500">
                    {tableRow.taskdetails &&
                      tableRow.taskdetails?.map((td) => (
                        <ul className="py-1 px-3" key={td.timelogdetailid}>
                          <li>{td.remark ? td.remark : "-"}</li>
                        </ul>
                      ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
