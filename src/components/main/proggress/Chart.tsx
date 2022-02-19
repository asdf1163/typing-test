import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const LineChart = () => {
  Chart.register(...registerables);
  const dataChart = {
    labels: ['2022-20-02 | 9:11','2022-20-02 | 10:05','2022-20-02 | 10:15', '2022-20-02 | 12:57', '2022-20-02 | 15:24', '2022-20-02 | 17:31'],
    datasets: [
      {
        label: "WPM",
        backgroundColor: "white",
        borderColor: "green",
        data: [90, 85, 100, 110, 99, 95, 100],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="tiles__proggress--chart">
      <Line
        data={dataChart}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip:{
                displayColors:false,
                titleColor: 'yellow'
            }
          },
          scales: {
            xAxes: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
            yAxes: {
              ticks: {
                color: "#black",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
