// import React from "react";
// import { Chart } from "react-charts";

// const LineChart = () => {
//   const data = React.useMemo(
//     () => [
//       {
//         specialLabel: "Series 1",
//         data: [
//           [0, 1],
//           [1, 2],
//           [2, 4],
//           [3, 2],
//           [4, 7],
//         ],
//       },
//       {
//         specialLabel: "Series 2",
//         data: [
//           [0, 3],
//           [1, 1],
//           [2, 5],
//           [3, 6],
//           [4, 4],
//         ],
//       },
//     ],
//     []
//   );
//   const getLabel = React.useCallback((series) => series.specialLabel, []);
//   const axes = React.useMemo(
//     () => [
//       { primary: true, type: "linear", position: "bottom" },
//       { type: "linear", position: "left" },
//     ],
//     []
//   );

//   return (
//     <div
//       style={{
//         width: "400px",
//         height: "300px",
//       }}
//     >
//       <Chart data={data} axes={axes} getLabel={getLabel} />
//     </div>
//   );
// };

// export default LineChart;
// // https://apexcharts.com/docs/installation/