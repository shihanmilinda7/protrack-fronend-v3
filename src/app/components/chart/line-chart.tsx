// import React, { useState, useEffect } from "react";

// const LineChart = ({
//   idealLineArrayIn,
//   currentLineArrayIn,
//   xaxis,
//   yaxis,
//   titleIn = "Task achivement rate",
// }: {
//   idealLineArrayIn: number[];
//   currentLineArrayIn: number[];
//   xaxis: any;
//   yaxis: any;
//   titleIn?: any;
// }) => {
//   const [chartSeries, setChartSeries] = useState([{ name: "", data: [] }]);
//   const [DynamicChart, setDynamicChart] = useState(null);
//   const [title, setTitle] = useState(
//     titleIn ? titleIn : "Task achivement rate"
//   );
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
//       text: titleIn,
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
//         text: xaxis, // You can change this to the desired name for the x-axis
//       },
//     },
//     yaxis: {
//       title: {
//         text: yaxis, // You can change this to the desired name for the y-axis
//       },
//     },
//   });

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
//   }, [idealLineArrayIn, currentLineArrayIn]);

//   useEffect(() => {
//     const importChart = async () => {
//       const chartModule = await import("react-apexcharts");
//       setDynamicChart(() => chartModule.default);
//     };

//     importChart();
//   }, []);

//   useEffect(() => {
//     setTitle(titleIn);
//     // console.log("titleIn", titleIn);
//   }, [titleIn]);

//   useEffect(() => {
//     let maxLength;
//     if (idealLineArrayIn.length > 0 && currentLineArrayIn.length > 0) {
//       maxLength = Math.max(idealLineArrayIn.length, currentLineArrayIn.length);
//     }
//     // else if (currentLineArrayIn.length == 0) {
//     //   maxLength = idealLineArrayIn.length;
//     // }
//     console.log("maxLength", maxLength);
//     setChartOptions({
//       chart: {
//         height: 350,
//         type: "line",
//         zoom: {
//           enabled: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "stepline",
//         // curve: "straight",
//       },
//       title: {
//         text: title,
//         align: "left",
//       },
//       grid: {
//         row: {
//           colors: ["#f3f3f3", "transparent"],
//           opacity: 0.5,
//         },
//       },
//       xaxis: {
//         categories: Array.from({ length: maxLength }, (_, i) => i + 1).map(
//           String
//         ),
//         title: {
//           text: xaxis, // You can change this to the desired name for the x-axis
//         },
//       },
//       yaxis: {
//         title: {
//           text: yaxis, // You can change this to the desired name for the y-axis
//         },
//       },
//     });
//   }, [title]);

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
import React, { useState, useEffect } from "react";

const LineChart = ({
  idealLineArrayIn,
  currentLineArrayIn,
  requiredLineArrayIn,
  xaxis,
  yaxis,
  titleIn = "Task achievement rate",
}: {
  idealLineArrayIn: number[];
  currentLineArrayIn: number[];
  requiredLineArrayIn: number[];
  xaxis: any;
  yaxis: any;
  titleIn?: any;
}) => {
  const [chartSeries, setChartSeries] = useState([{ name: "", data: [] }]);
  const [DynamicChart, setDynamicChart] = useState(null);
  const [title, setTitle] = useState(
    titleIn ? titleIn : "Task achievement rate"
  );
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "stepline",
      // colors: ["blue", "#0000FF", "#FFAC1C"], // Set colors for current, ideal, and required lines
    },
    title: {
      text: titleIn,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
      title: {
        text: xaxis,
      },
    },
    yaxis: {
      title: {
        text: yaxis,
      },
    },
    // legend: {
    //   labels: {
    //     colors: ["blue", "green", "orange"], // Set legend item colors corresponding to each line series
    //   },
    // },
  });

  useEffect(() => {
    setChartSeries([
      {
        name: "Required rate",
        data: requiredLineArrayIn,
      },
      {
        name: "Ideal rate",
        data: idealLineArrayIn,
      },
      {
        name: "Current rate",
        data: currentLineArrayIn,
      },
    ]);
  }, [idealLineArrayIn, currentLineArrayIn, requiredLineArrayIn]);

  useEffect(() => {
    const importChart = async () => {
      const chartModule = await import("react-apexcharts");
      setDynamicChart(() => chartModule.default);
    };

    importChart();
  }, []);

  useEffect(() => {
    setTitle(titleIn);
  }, [titleIn]);

  // useEffect(() => {
  //   let maxLength;
  //   if (idealLineArrayIn.length > 0 && currentLineArrayIn.length > 0) {
  //     maxLength = Math.max(idealLineArrayIn.length, currentLineArrayIn.length);
  //   }

  //   const step = Math.ceil(maxLength / 10); // You can adjust the step value as needed
  //   const categories = Array.from({ length: maxLength }, (_, i) =>
  //     i % step === 0 ? i + 1 : ""
  //   );

  //   setChartOptions({
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
  //     },
  //     title: {
  //       text: title,
  //       align: "left",
  //     },
  //     grid: {
  //       row: {
  //         colors: ["#f3f3f3", "transparent"],
  //         opacity: 0.5,
  //       },
  //     },
  //     xaxis: {
  //       categories: categories.map(String),
  //       title: {
  //         text: xaxis,
  //       },
  //     },
  //     yaxis: {
  //       title: {
  //         text: yaxis,
  //       },
  //     },
  //   });
  // }, [title]);

  useEffect(() => {
    let maxLength;
    if (idealLineArrayIn.length > 0 && currentLineArrayIn.length > 0) {
      maxLength = Math.max(
        idealLineArrayIn.length,
        currentLineArrayIn.length,
        requiredLineArrayIn.length
      );
    }

    const step = Math.ceil(maxLength / 10);
    const categories = Array.from({ length: maxLength }, (_, i) =>
      i % step === 0 ? i + 1 : ""
    );

    setChartOptions({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "stepline",
        // colors: ["blue", "#0000FF", "#FFAC1C"], // Set colors for current, ideal, and required lines
      },
      title: {
        text: title,
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories.map(String),
        title: {
          text: xaxis,
        },
      },
      yaxis: {
        title: {
          text: yaxis,
        },
      },
      // legend: {
      //   labels: {
      //     colors: ["blue", "green", "orange"], // Set legend item colors corresponding to each line series
      //   },
      // },
    });
  }, [title]);

  if (!DynamicChart) {
    return <div>Loading...</div>;
  }

  return (
    <DynamicChart
      options={chartOptions}
      series={chartSeries}
      type={chartOptions.chart.type}
      height={chartOptions.chart.height}
    />
  );
};

export default LineChart;
