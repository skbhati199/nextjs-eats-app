"use client";

import React, { useEffect, useState } from "react";
// @ts-ignore
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
// } from "chart.js";
import("chart.js").then((module) => {
  const Chart = module.Chart;
  const CategoryScale = module.CategoryScale;
  const LinearScale = module.LinearScale;
  const Tooltip = module.Tooltip;
  const BarElement = module.BarElement;

  Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);
  // Rest of your code...
});
// @ts-ignore
import { Bar } from "react-chartjs-2";
import axios from "axios";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

export function BarChart2() {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  let data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    async function getBarCharData() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bar-chart`
      );
      const results = await response.data;
      console.log(results);
      setLabels(results.labels.reverse());
      setDataValues(results.orders.reverse());
    }
    getBarCharData();
  }, [setLabels, setDataValues]);

  return <Bar options={options} data={data} />;
}
