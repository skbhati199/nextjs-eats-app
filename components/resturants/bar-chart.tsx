"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

export const BarChart = () => {
  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  useEffect(() => {
    async function getBarCharData() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/bar-chart`
      );

      const results = await response.data;

      console.log(results);

      // @ts-ignore
      const ctx = canvasEl?.current?.getContext("2d");
      // const ctx = document.getElementById("myChart");

      const gradient = ctx.createLinearGradient(0, 16, 0, 600);
      gradient.addColorStop(0, colors.purple.half);
      gradient.addColorStop(0.65, colors.purple.quarter);
      gradient.addColorStop(1, colors.purple.zero);

      // const weight = [60.0, 60.2, 59.1, 61.4];
      // const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
      console.log(results.orders);
      console.log(results.labels);

      const data = {
        labels: results.labels.reverse(),
        datasets: [
          {
            backgroundColor: gradient,
            label: "Orders",
            data: results.orders.reverse(),
            fill: true,
            borderWidth: 2,
            borderColor: colors.purple.default,
            lineTension: 0.2,
            pointBackgroundColor: colors.purple.default,
            pointRadius: 3,
          },
        ],
      };
      const config = {
        type: "line",
        data: data,
      };
      const myLineChart = new Chart(ctx, config);

      return function cleanup() {
        myLineChart.destroy();
      };
    }
    getBarCharData()
  }, []);

  return (
    <div className="h-full w-full p-2 ">
      <canvas id="myChart" ref={canvasEl} width={"100%"} />
    </div>
  );
};
