// "use client";

// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import { AiFillPrinter } from "react-icons/ai";
// import ExcelJS from "exceljs";

// export const TimelogSummaryTable = ({
//   rowObjectIn,
//   tablePagination,
// }: {
//   rowObjectIn?: any[];
//   tablePagination?: number;
// }) => {
//   const [dateRows, setDateRows] = useState([]);

//   useEffect(() => {
//     const q = [...rowObjectIn];
//     setDateRows(q);
//   }, [rowObjectIn]);

//   const totalHours = rowObjectIn?.reduce(
//     (total, obj) => total + parseInt(obj.totaltime),
//     0
//   );

//   // const generatePDF = () => {
//   //   const input = document.getElementById("pdf-content");

//   //   html2canvas(input).then((canvas) => {
//   //     const imgData = canvas.toDataURL("image/png");
//   //     const pdf = new jsPDF("p", "mm", "a4"); // Create a new jsPDF instance
//   //     pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // 'a4' page size (210x297 mm)
//   //     pdf.save("my-pdf-document.pdf");
//   //   });
//   // };

//   // const handlePrint = () => {
//   //   const printContent = document.getElementById("pdf-content");
//   //   const originalContents = document.body.innerHTML;
//   //   document.body.innerHTML = printContent.innerHTML;
//   //   window.print();
//   //   document.body.innerHTML = originalContents;
//   // };

//   // const exportTableToExcel = () => {
//   //   // Get the HTML table element by ID
//   //   const tableDiv = document.getElementById("pdf-content");

//   //   if (!tableDiv) {
//   //     alert("Table div not found.");
//   //     return;
//   //   }

//   //   // Find the table within the div
//   //   const table = tableDiv.querySelector("table");

//   //   if (!table) {
//   //     alert("Table not found within the div.");
//   //     return;
//   //   }

//   //   const workbook = new ExcelJS.Workbook();
//   //   const worksheet = workbook.addWorksheet("Sheet 1");

//   //   const columnWidths = [
//   //     { width: 15 }, // Date
//   //     { width: 10 }, // Day
//   //     { width: 20 }, // Status
//   //     { width: 15 }, // Total hours
//   //     { width: 15 }, // Worked hours
//   //     { width: 20 }, // Project
//   //     { width: 20 }, // Task
//   //     { width: 20 }, // Task item
//   //     { width: 15 }, // Estimate count
//   //     { width: 10 }, // Count
//   //     { width: 30 }, // Activity notes
//   //   ];

//   //   // Apply column widths to the worksheet
//   //   columnWidths.forEach((width, index) => {
//   //     worksheet.getColumn(index + 1).width = width.width;
//   //   });

//   //   // Iterate through table rows
//   //   table.querySelectorAll("tr").forEach((row) => {
//   //     const rowData = [];

//   //     // Iterate through row cells
//   //     row.querySelectorAll("td, th").forEach((cell) => {
//   //       rowData.push(cell.textContent.trim());
//   //     });

//   //     worksheet.addRow(rowData);
//   //   });

//   //   const headerRow = worksheet.getRow(1);

//   //   // Apply cell styling to the header row (bold text and borders)
//   //   headerRow.eachCell((cell) => {
//   //     cell.font = { bold: true };
//   //     cell.border = {
//   //       top: { style: "thin" },
//   //       left: { style: "thin" },
//   //       bottom: { style: "thin" },
//   //       right: { style: "thin" },
//   //     };
//   //   });

//   //   worksheet.eachRow((row, rowNumber) => {
//   //     row.eachCell((cell) => {
//   //       cell.border = {
//   //         top: { style: "thin" },
//   //         left: { style: "thin" },
//   //         bottom: { style: "thin" },
//   //         right: { style: "thin" },
//   //       };
//   //     });
//   //   });

//   //   // Generate an Excel file
//   //   workbook.xlsx.writeBuffer().then((buffer) => {
//   //     const blob = new Blob([buffer], {
//   //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   //     });

//   //     const url = window.URL.createObjectURL(blob);

//   //     const a = document.createElement("a");
//   //     a.href = url;
//   //     a.download = "table_data.xlsx"; // Provide a desired file name
//   //     a.click();

//   //     window.URL.revokeObjectURL(url);
//   //   });
//   // };

//   const exportTableToExcel = () => {
//     // Get the HTML table element by ID
//     const tableDiv = document.getElementById("pdf-content");

//     if (!tableDiv) {
//       alert("Table div not found.");
//       return;
//     }

//     // Find the table within the div
//     const table = tableDiv.querySelector("table");

//     if (!table) {
//       alert("Table not found within the div.");
//       return;
//     }

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Sheet 1");

//     // Define custom column widths (in characters)
//     const columnWidths = [
//       { width: 15 }, // Date
//       { width: 10 }, // Day
//       { width: 20 }, // Status
//       { width: 15 }, // Total hours
//       { width: 15 }, // Worked hours
//       { width: 20 }, // Project
//       { width: 20 }, // Task
//       { width: 20 }, // Task item
//       { width: 15 }, // Estimate count
//       { width: 10 }, // Count
//       { width: 30 }, // Activity notes
//     ];

//     // Apply column widths to the worksheet
//     columnWidths.forEach((width, index) => {
//       worksheet.getColumn(index + 1).width = width.width;
//     });

//     // Add a title to the worksheet
//     worksheet.mergeCells("A1:K1");
//     const title = worksheet.getCell("A1");
//     title.value = "CeyInfo Solutions"; // Replace with your desired title
//     title.alignment = { horizontal: "center" }; // Center-align the title
//     title.border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     // Iterate through table rows
//     table.querySelectorAll("tr").forEach((row) => {
//       const rowData = [];

//       // Iterate through row cells
//       row.querySelectorAll("td, th").forEach((cell) => {
//         rowData.push(cell.textContent.trim());
//       });

//       worksheet.addRow(rowData);
//     });

//     const headerRow = worksheet.getRow(1);

//     // Apply cell styling to the header row (bold text and borders)
//     headerRow.eachCell((cell) => {
//       cell.font = { bold: true };
//       cell.border = {
//         top: { style: "thin" },
//         left: { style: "thin" },
//         bottom: { style: "thin" },
//         right: { style: "thin" },
//       };
//     });

//     worksheet.eachRow((row, rowNumber) => {
//       row.eachCell((cell) => {
//         cell.border = {
//           top: { style: "thin" },
//           left: { style: "thin" },
//           bottom: { style: "thin" },
//           right: { style: "thin" },
//         };
//       });
//     });

//     // Generate an Excel file
//     workbook.xlsx.writeBuffer().then((buffer) => {
//       const blob = new Blob([buffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "table_data.xlsx"; // Provide a desired file name
//       a.click();

//       window.URL.revokeObjectURL(url);
//     });
//   };

//   return (
//     <div className="md:px-2 py-2 w-full">
//       <Button
//         color="default"
//         startContent={<AiFillPrinter />}
//         className={rowObjectIn.length > 0 ? "mr-2" : "hidden"}
//         onClick={exportTableToExcel}
//       >
//         Download
//       </Button>
//       <div id="pdf-content">
//         <div className="pb-1 w-full flex items-center justify-between">
//           <div className="flex flex-col items-center justify-center mx-auto">
//             <span className="pl-1 mx-auto text-xl leading-none text-gray-900 select-none  flex items-center justify-center">
//               CeyInfo Solutions
//             </span>
//             <span className="pl-1 mx-auto text-base leading-none text-gray-900 select-none  flex items-center justify-center mt-1">
//               Monthly working summery
//             </span>
//           </div>
//         </div>
//         <div className="flex">
//           <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 ml-auto mr-16 mb-1  overflow-hidden">
//             <span className="text-indigo-600">
//               Avarage Days - {totalHours / 8} /Days
//             </span>
//           </span>
//           <span className="text-base font-semibold leading-none text-gray-900 select-none pt-2 ml-auto mr-16 mb-1  overflow-hidden">
//             <span className="text-indigo-600">
//               Total Hours - {totalHours} /Hours
//             </span>
//           </span>
//         </div>
//         <div className="shadow rounded border-b border-gray-200 w-full">
//           <Table aria-label="Example static collection table">
//             <TableHeader>
//               {/* <TableColumn className="w-10">#</TableColumn> */}
//               <TableColumn className="w-10/100 border border-blue-500">
//                 Date
//               </TableColumn>
//               <TableColumn className="w-10/100 border border-blue-500">
//                 Day
//               </TableColumn>
//               <TableColumn className="w-40/100 border border-blue-500">
//                 Status
//               </TableColumn>
//               <TableColumn className="w-10/100 border border-blue-500">
//                 Total hours
//               </TableColumn>
//               <TableColumn className="w-10/100 border border-blue-500">
//                 Worked hours
//               </TableColumn>
//               <TableColumn className="w-40/100 border border-blue-500">
//                 Project
//               </TableColumn>
//               <TableColumn className="w-40/100 border border-blue-500">
//                 Task
//               </TableColumn>
//               <TableColumn className="w-60/100 border border-blue-500">
//                 Task item
//               </TableColumn>
//               <TableColumn className="w-10/100 border border-blue-500">
//                 Estimate count
//               </TableColumn>
//               <TableColumn className="w-10/100 border border-blue-500">
//                 Count
//               </TableColumn>
//               <TableColumn className="w-80/100 border border-blue-500">
//                 Activity notes
//               </TableColumn>
//             </TableHeader>
//             <TableBody>
//               {dateRows?.map((tableRow: any, index: number) => (
//                 <TableRow key={tableRow.dayDate} className="">
//                   {/* <TableCell>{index + 1}</TableCell> */}
//                   <TableCell className="border border-blue-500">
//                     {tableRow.dayDate}
//                   </TableCell>
//                   <TableCell className="uppercase border border-blue-500">
//                     {tableRow.dayName}
//                   </TableCell>
//                   <TableCell className="border border-blue-500">
//                     {tableRow.status}
//                   </TableCell>
//                   <TableCell className="border border-blue-500 font-semibold bg-gray-300">
//                     {tableRow.totaltime}
//                   </TableCell>
//                   <TableCell className="border border-blue-500 px-0 p-0 m-0">
//                     <div className="flex flex-col">
//                       {tableRow.taskdetails &&
//                         tableRow.taskdetails?.map((td) => (
//                           <ul className="py-1 px-3" key={td.timelogdetailid}>
//                             <li>{td.time ? td.time : "0"}</li>
//                           </ul>
//                         ))}
//                     </div>
//                   </TableCell>
//                   <TableCell className="border border-blue-500 px-0 p-0 m-0">
//                     <div className="flex flex-col">
//                       {tableRow.taskdetails &&
//                         tableRow.taskdetails?.map((td) => (
//                           <ul className="py-1 px-3" key={td.timelogdetailid}>
//                             <li>{td.projectname ? td.projectname : "-"}</li>
//                           </ul>
//                         ))}
//                     </div>
//                   </TableCell>
//                   <TableCell className="border border-blue-500 px-0 p-0 m-0">
//                     {tableRow.taskdetails &&
//                       tableRow.taskdetails?.map((td) => (
//                         <ul className="py-1 px-3" key={td.timelogdetailid}>
//                           <li>{td.taskname ? td.taskname : "-"}</li>
//                         </ul>
//                       ))}
//                   </TableCell>
//                   <TableCell className="border border-blue-500 px-0 p-0 m-0">
//                     {tableRow.taskdetails &&
//                       tableRow.taskdetails?.map((td) => (
//                         <ul className="py-1 px-3" key={td.timelogdetailid}>
//                           <li>{td.description ? td.description : "-"}</li>
//                         </ul>
//                       ))}
//                   </TableCell>
//                   <TableCell className="border border-blue-500 font-semibold bg-gray-300">
//                     {tableRow.taskdetails &&
//                       tableRow.taskdetails?.map((td) => (
//                         <ul className="py-1 px-3" key={td.timelogdetailid}>
//                           <li>{td.estimatecount ? td.estimatecount : "-"}</li>
//                         </ul>
//                       ))}
//                   </TableCell>
//                   <TableCell className="border border-blue-500 px-0 p-0 m-0">
//                     {tableRow.taskdetails &&
//                       tableRow.taskdetails?.map((td) => (
//                         <ul className="py-1 px-3" key={td.timelogdetailid}>
//                           <li>{td.count ? td.count : "-"}</li>
//                         </ul>
//                       ))}
//                   </TableCell>
//                   <TableCell className="border border-blue-500">
//                     {tableRow.taskdetails &&
//                       tableRow.taskdetails?.map((td) => (
//                         <ul className="py-1 px-3" key={td.timelogdetailid}>
//                           <li>{td.remark ? td.remark : "-"}</li>
//                         </ul>
//                       ))}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// };
