// "use client"

// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";

// const LineChart = () => {
//   const [chartOptions, setChartOptions] = useState<any>({
//     chart: {
//       height: 350,
//       type: "line",
//       zoom: {
//         enabled: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "straight",
//     },
//     title: {
//       text: "Product Trends by Month",
//       align: "left",
//     },
//     grid: {
//       row: {
//         colors: ["#f3f3f3", "transparent"],
//         opacity: 0.5,
//       },
//     },
//     xaxis: {
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "p",
//         "pp",
//       ],
//     },
//   });

//   const [chartSeries, setChartSeries] = useState([
//     {
//       name: "Desktops",
//       data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 0, 0],
//     },
//     {
//       name: "Desktops1",
//       data: [0, 80, 35, 51, 49, 62, 69, 91, 150, 0, 0],
//     },
//   ]);

//   return (
//     <Chart
//       options={chartOptions}
//       series={chartSeries}
//       type={chartOptions.chart.type}
//       height={chartOptions.chart.height}
//     />
//   );
// };

// export default LineChart;
