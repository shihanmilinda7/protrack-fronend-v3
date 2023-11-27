// import React, { useState, useEffect } from "react";

// const LineChart = ({ idealLineArrayIn }: { idealLineArrayIn: number[] }) => {
//   const [idealLineArray, setIdealLineArray] = useState<any>([]);

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
//       curve: "straight",
//     },
//     title: {
//       text: "Product Trends by Month",
//       // align: "left",
//     },
//     grid: {
//       row: {
//         colors: ["#f3f3f3", "transparent"],
//         opacity: 0.5,
//       },
//     },
//     categories: Array.from({ length: 15 }, (_, i) => i + 1).map(String),
//   });

//   const [chartSeries, setChartSeries] = useState([
//     {
//       name: "Desktops",
//       data: [...idealLineArray],
//     },
    // {
    //   name: "Desktops1",
    //   data: [0, 80, 35, 51, 49, 62, 69, 91, 150, 0, 0, null],
    // },
//   ]);

//   const [DynamicChart, setDynamicChart] = useState(null);

//   useEffect(() => {
//     const q = { ...idealLineArrayIn };
//     setIdealLineArray(q);
//   }, [idealLineArrayIn]);

//   useEffect(() => {
//     const q = { ...idealLineArrayIn };
//     setIdealLineArray(q);
//   }, [idealLineArray]);

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
