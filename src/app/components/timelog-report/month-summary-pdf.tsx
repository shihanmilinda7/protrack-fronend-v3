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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "react-modal";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { AiFillPrinter, AiOutlineCloseCircle } from "react-icons/ai";

export const TimelogSummaryPdf = ({
  rowObjectIn,
  tablePagination,
}: {
  rowObjectIn?: any[];
  tablePagination?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dateRows, setDateRows] = useState([]);

  const customStyles = {
    overlay: {
      zIndex: 50,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "10px",
    },
  };

  useEffect(() => {
    const q = [...rowObjectIn];
    setDateRows(q);
  }, [rowObjectIn]);

  const totalHours = rowObjectIn?.reduce(
    (total, obj) => total + parseInt(obj.totaltime),
    0
  );

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Create a new jsPDF instance
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // 'a4' page size (210x297 mm)
      pdf.save("my-pdf-document.pdf");
    });
  };

  return (
    <div>
      <button
        // onClick={generatePDF}
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
      >
        Generate PDF
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div
          className="md:px-2 py-2 max-w-[1000px] max-h-[650px]"
          id="pdf-content"
        >
          <div className="pb-1 w-full flex items-center justify-between">
            <div className="flex flex-col items-center justify-center mx-auto">
              <span className="pl-1 mx-auto text-xl leading-none text-gray-900 select-none  flex items-center justify-center">
                CeyInfo Solutions
              </span>
              <span className="pl-1 mx-auto text-base leading-none text-gray-900 select-none  flex items-center justify-center mt-1">
                Monthly working summery
              </span>
            </div>
            <Button
              color="default"
              startContent={<AiFillPrinter />}
              className="mr-2"
              onClick={generatePDF}
            >
              Download
            </Button>
            <AiOutlineCloseCircle
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer flex justify-end"
            />
          </div>
          {/* <span className="pl-1 mx-auto text-xl leading-none text-gray-900 select-none  flex items-center justify-center">
            CeyInfo Solutions
          </span>
          <span className="pl-1 mx-auto text-base leading-none text-gray-900 select-none  flex items-center justify-center mt-1">
            Monthly working summery
          </span> */}
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
                <TableColumn className="w-10 border border-blue-500">
                  Date
                </TableColumn>
                <TableColumn className="w-10 border border-blue-500">
                  Day
                </TableColumn>
                <TableColumn className="w-40 border border-blue-500">
                  Status
                </TableColumn>
                <TableColumn className="w-10 border border-blue-500">
                  Total hours
                </TableColumn>
                <TableColumn className="w-10 border border-blue-500">
                  Worked hours
                </TableColumn>
                <TableColumn className="w-40 border border-blue-500">
                  Project
                </TableColumn>
                <TableColumn className="w-40 border border-blue-500">
                  Task
                </TableColumn>
                <TableColumn className="w-60 border border-blue-500">
                  Task item
                </TableColumn>
                <TableColumn className="w-10 border border-blue-500">
                  Estimate count
                </TableColumn>
                <TableColumn className="w-10 border border-blue-500">
                  Count
                </TableColumn>
                <TableColumn className="w-80 border border-blue-500">
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
      </Modal>
    </div>
  );
};
