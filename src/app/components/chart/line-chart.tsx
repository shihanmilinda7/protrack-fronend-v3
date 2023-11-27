import React, { useState, useEffect } from "react";

const LineChart = ({ idealLineArrayIn }: { idealLineArrayIn: number[] }) => {
  const [idealLineArray, setIdealLineArray] = useState<any>([]);
  const [chartSeries, setChartSeries] = useState([{ name: "", data: [] }]);
  const [DynamicChart, setDynamicChart] = useState(null);
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
      curve: "straight",
    },
    title: {
      text: "Task achivement rate",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    categories: Array.from(
      { length: idealLineArrayIn.length },
      (_, i) => i + 1
    ).map(String),
  });

  useEffect(() => {
    const q = { ...idealLineArrayIn };
    setIdealLineArray(q);
  }, [idealLineArrayIn]);

  useEffect(() => {
    setChartSeries([
      // {
      //   name: "Ideal rate",
      //   data: [0, 80, 35, 51, 49, 62, 69, 91, 150, 0, 0, null],
      // },
      {
        name: "Ideal rate",
        data: idealLineArrayIn,
      },
    ]);
    // setChartSeries([{
    //   name: "Desktops1",
    //   data: idealLineArray,
    // }]);
  }, [idealLineArray]);

  useEffect(() => {
    const importChart = async () => {
      const chartModule = await import("react-apexcharts");
      setDynamicChart(() => chartModule.default);
    };

    importChart();
  }, []);

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
