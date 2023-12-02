import React, { useState, useEffect } from "react";

const LineChart = ({
  idealLineArrayIn,
  currentLineArrayIn,
  xaxis,
  yaxis,
  taskitemname = "Task achivement rate",
}: {
  idealLineArrayIn: number[];
  currentLineArrayIn: number[];
  xaxis: any;
  yaxis: any;
  taskitemname?: any;
}) => {
  const [chartSeries, setChartSeries] = useState([{ name: "", data: [] }]);
  const [DynamicChart, setDynamicChart] = useState(null);
  const [title, setTitle] = useState(
    taskitemname ? taskitemname : "Task achivement rate"
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
      // curve: "straight",
    },
    title: {
      text: taskitemname,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: Array.from(
        { length: idealLineArrayIn.length },
        (_, i) => i + 1
      ).map(String),
      title: {
        text: xaxis, // You can change this to the desired name for the x-axis
      },
    },
    yaxis: {
      title: {
        text: yaxis, // You can change this to the desired name for the y-axis
      },
    },
  });

  useEffect(() => {
    setChartSeries([
      {
        name: "Current rate",
        data: currentLineArrayIn,
      },
      {
        name: "Ideal rate",
        data: idealLineArrayIn,
      },
    ]);
  }, [idealLineArrayIn, currentLineArrayIn]);

  useEffect(() => {
    const importChart = async () => {
      const chartModule = await import("react-apexcharts");
      setDynamicChart(() => chartModule.default);
    };

    importChart();
  }, []);

  useEffect(() => {
    setTitle(taskitemname);
  }, [taskitemname]);

  useEffect(() => {
    let maxLength;
    if (idealLineArrayIn.length > 0 && currentLineArrayIn.length > 0) {
      maxLength = Math.max(idealLineArrayIn.length, currentLineArrayIn.length);
    } 
    // else if (currentLineArrayIn.length == 0) {
    //   maxLength = idealLineArrayIn.length;
    // }
    console.log("maxLength", maxLength);
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
        // curve: "straight",
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
        categories: Array.from({ length: maxLength }, (_, i) => i + 1).map(
          String
        ),
        title: {
          text: xaxis, // You can change this to the desired name for the x-axis
        },
      },
      yaxis: {
        title: {
          text: yaxis, // You can change this to the desired name for the y-axis
        },
      },
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
