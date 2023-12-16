"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import ExcelJS from "exceljs";
import { useSelector } from "react-redux";

export const TimelogSummaryExcel = ({
  tableDivIn,
  staffname,
  totalHours,
}: {
  tableDivIn: any;
  staffname: any;
  totalHours: any;
}) => {
  const [tableDiv, setTableDiv] = useState<any>("");
  const year = useSelector((state: any) => state.yearMonthPickerReducer.year);
  const month = useSelector((state: any) => state.yearMonthPickerReducer.month);

  const timezoneOffset = () => {
    const userLocalTime = new Date();

    // Get user's timezone offset in minutes
    const timezoneOffsetMinutes = userLocalTime.getTimezoneOffset();

    // Calculate GMT offset as a string
    const gmtOffsetHours = Math.floor(Math.abs(timezoneOffsetMinutes) / 60);
    const gmtOffsetMinutes = Math.abs(timezoneOffsetMinutes) % 60;
    const gmtOffsetString =
      (timezoneOffsetMinutes < 0 ? "+" : "-") +
      (gmtOffsetHours < 10 ? "0" : "") +
      gmtOffsetHours +
      ":" +
      (gmtOffsetMinutes < 10 ? "0" : "") +
      gmtOffsetMinutes;

    return gmtOffsetString;
  };
  const gmtOffsetString = timezoneOffset();
  const date = new Date(`${year}-${month}-01T18:00:00${gmtOffsetString}`);
  // const date = new Date(`${year}-${month}`);

  const border: any = {
    top: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
  };
  // Format the date to "October 2023"
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    setTableDiv(tableDivIn);
  }, [tableDivIn]);

  const exportTableToExcel = () => {
    // Get the HTML table element by ID
    // const tableDiv = document.getElementById("pdf-content");

    if (!tableDiv) {
      alert("Table div not found.");
      return;
    }

    // Find the table within the div
    const table = tableDiv.querySelector("table");
    console.log("table", table);
    if (!table) {
      alert("Table not found within the div.");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Define custom column widths (in characters)
    const columnWidths = [
      { width: 15 }, // Date
      { width: 10 }, // Day
      { width: 20 }, // Status
      { width: 15 }, // Total hours
      { width: 15 }, // Worked hours
      { width: 20 }, // Project
      { width: 20 }, // Task
      { width: 20 }, // Task item
      { width: 15 }, // Estimate count
      { width: 15 }, // Count
      { width: 30 }, // Activity notes
    ];

    // Apply column widths to the worksheet
    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width.width;
    });

    //header
    // Add a title to the worksheet
    worksheet.mergeCells("A1:K1");
    const reporttitle = worksheet.getCell("A1");
    reporttitle.value = "Monthly Time Sheet"; // Replace with your desired title
    reporttitle.alignment = { horizontal: "center" }; // Center-align the title
    reporttitle.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
    reporttitle.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ADD8E6" }, // Set background color to blue
    };
    reporttitle.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    worksheet.mergeCells("A2:K2");
    const companyname = worksheet.getCell("A2");
    companyname.value = "Ceyinfo Solutions (pvt) Ltd"; // Replace with your desired title
    companyname.alignment = { horizontal: "center" }; // Center-align the title
    companyname.border = {
      left: { style: "thin" },
      right: { style: "thin" },
    };
    companyname.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ADD8E6" }, // Set background color to blue
    };
    companyname.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    worksheet.mergeCells("A3:K3");
    const yearNmonth = worksheet.getCell("A3");
    yearNmonth.value = formattedDate; // Replace with your desired title
    yearNmonth.alignment = { horizontal: "center" }; // Center-align the title
    yearNmonth.border = {
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    yearNmonth.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ADD8E6" }, // Set background color to blue
    };
    yearNmonth.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    // Set Staff Name and Name of the Staff in cells A4 and B4
    const staffNameCell = worksheet.getCell("A4");
    staffNameCell.value = "Staff Name"; // Replace with "Staff Name"
    staffNameCell.border = border;
    staffNameCell.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    const nameOfStaffCell = worksheet.getCell("B4");
    nameOfStaffCell.value = staffname; // Replace with the name of the staff
    nameOfStaffCell.border = {
      top: { style: "thin" },
      right: { style: "thin" },
      bottom: { style: "thin" },
    };
    nameOfStaffCell.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    const workigDays = worksheet.getCell("J4");
    workigDays.value = "Working Days";
    workigDays.border = border;
    workigDays.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    const workigDays1 = worksheet.getCell("K4");
    workigDays1.value = totalHours / 8;
    workigDays1.border = border;
    workigDays1.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    const workigHours = worksheet.getCell("J5");
    workigHours.value = "Working Hours";
    workigHours.border = border;
    workigHours.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    const workigHours1 = worksheet.getCell("K5");
    workigHours1.value = totalHours;
    workigHours1.border = border;
    workigHours1.font = {
      bold: true, // Make the title cell text bold
      color: { argb: "000000" }, // Set font color to white
    };

    // Iterate through table rows
    // table.querySelectorAll("tr").forEach((row) => {
    //   const rowData = [];

    //   // Iterate through row cells
    //   row.querySelectorAll("td, th").forEach((cell) => {
    //     const isUList = cell.querySelectorAll("ul");
    //     if (isUList.length != 0) {
    //       let ulContent = [];
    //       isUList[0].querySelectorAll("li").forEach((li) => {
    //         ulContent.push(li.textContent.trim());
    //       });

    //       // const multiLineText = ulContent.join('\n');
    //       // rowData.push(ulContent);
    //       // console.log(ulContent.join("\n"));
    //       rowData.push(ulContent.join(","));
    //     } else {
    //       rowData.push(cell.textContent.trim());
    //     }
    //     // console.log("cell.textContent.trim()", cell);
    //   });

    //   worksheet.addRow(rowData);
    // });

    table.querySelectorAll("tr").forEach((row) => {
      const rowData = [];

      // Iterate through row cells
      row.querySelectorAll("td, th").forEach((cell) => {
        const isUList = cell.querySelectorAll("ul");
        if (isUList.length != 0) {
          let ulContent = [];
          isUList[0].querySelectorAll("li").forEach((li) => {
            ulContent.push(li.textContent.trim());
          });

          // const multiLineText = ulContent.join('\n');
          // rowData.push(ulContent);
          // console.log(ulContent.join("\n"));
          rowData.push(ulContent.join(","));
        } else {
          rowData.push(cell.textContent.trim());
        }
        // console.log("cell.textContent.trim()", cell);
      });

      worksheet.addRow(rowData);
    });
    const headerRow = worksheet.getRow(6);

    // Apply cell styling to the header row (bold text and borders)
    headerRow.eachCell((cell) => {
      cell.border = border;
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D1D5DB" }, // Set background color to blue
      };
      cell.font = {
        bold: true, // Make the title cell text bold
        color: { argb: "000000" }, // Set font color to white
      };
    });

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = border;
      });
    });
    // console.log("worksheet", worksheet);
    // Generate an Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const filename = `${year}-${month}-timesheet-${staffname}.xlsx`;

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename; // Provide a desired file name
      a.click();

      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      color="default"
      startContent={<AiFillPrinter />}
      className="mr-2"
      onClick={exportTableToExcel}
    >
      Download
    </Button>
  );
};
