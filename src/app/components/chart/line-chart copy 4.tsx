// import React, { useState, useEffect } from "react";

// const LineChart = ({
//   idealLineArrayIn,
//   currentLineArrayIn,
// }: {
//   idealLineArrayIn: number[];
//   currentLineArrayIn: number[];
// }) => {
//   const [idealLineArray, setIdealLineArray] = useState<any>([]);
//   const [chartSeries, setChartSeries] = useState([{ name: "", data: [] }]);
//   const [DynamicChart, setDynamicChart] = useState(null);
//   const [chartOptions, setChartOptions] = useState({
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
//       curve: "stepline",
//       // curve: "straight",
//     },
//     title: {
//       text: "Task achivement rate",
//       align: "left",
//     },
//     grid: {
//       row: {
//         colors: ["#f3f3f3", "transparent"],
//         opacity: 0.5,
//       },
//     },
//     xaxis: {
//       categories: Array.from(
//         { length: idealLineArrayIn.length },
//         (_, i) => i + 1
//       ).map(String),
//       title: {
//         text: "Day count", // You can change this to the desired name for the x-axis
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Esitmate count", // You can change this to the desired name for the y-axis
//       },
//     },
//     // categories: Array.from(
//     //   { length: idealLineArrayIn.length },
//     //   (_, i) => i + 1
//     // ).map(String),
//   });

//   // useEffect(() => {
//   //   const q = { ...idealLineArrayIn };
//   //   setIdealLineArray(q);
//   // }, [idealLineArrayIn]);
//   // useEffect(() => {
//   //   const q = { ...idealLineArrayIn };
//   //   setIdealLineArray(q);
//   // }, [idealLineArrayIn]);

//   useEffect(() => {
//     setChartSeries([
//       {
//         name: "Current rate",
//         data: currentLineArrayIn,
//       },
//       {
//         name: "Ideal rate",
//         data: idealLineArrayIn,
//       },
//     ]);
//     // setChartSeries([{
//     //   name: "Desktops1",
//     //   data: idealLineArray,
//     // }]);
//   }, [idealLineArrayIn, currentLineArrayIn]);

//   useEffect(() => {
//     const importChart = async () => {
//       const chartModule = await import("react-apexcharts");
//       setDynamicChart(() => chartModule.default);
//     };

//     importChart();
//   }, []);

//   if (!DynamicChart) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <DynamicChart
//       options={chartOptions}
//       series={chartSeries}
//       type={chartOptions.chart.type}
//       height={chartOptions.chart.height}
//     />
//   );
// };

// export default LineChart;
