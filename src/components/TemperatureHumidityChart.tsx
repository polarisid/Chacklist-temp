// import React from "react";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   CategoryScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { ChartData, ChartOptions } from "chart.js";

// // Registrando os componentes necessários
// ChartJS.register(
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend
// );

// interface TemperatureHumidityChartProps {
//   dataPoints: { time: string; temperature: number; humidity: number }[];
// }

// const TemperatureHumidityChart: React.FC<TemperatureHumidityChartProps> = ({
//   dataPoints,
// }) => {
//   const chartData: ChartData<"line"> = {
//     labels: dataPoints.map((dp) => dp.time),
//     datasets: [
//       {
//         label: "Temperatura (°C)",
//         data: dataPoints.map((dp) => dp.temperature),
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         yAxisID: "y1",
//       },
//       {
//         label: "Umidade (%)",
//         data: dataPoints.map((dp) => dp.humidity),
//         borderColor: "rgba(153, 102, 255, 1)",
//         backgroundColor: "rgba(153, 102, 255, 0.2)",
//         yAxisID: "y2",
//       },
//     ],
//   };

//   const chartOptions: ChartOptions<"line"> = {
//     responsive: true,
//     scales: {
//       y1: {
//         type: "linear",
//         display: true,
//         position: "left",
//       },
//       y2: {
//         type: "linear",
//         display: true,
//         position: "right",
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     },
//   };

//   return <Line data={chartData} options={chartOptions} />;
// };

// export default TemperatureHumidityChart;

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

interface DataPoint {
  time: string;
  temperature: string;
  humidity: string;
}

interface TemperatureHumidityChartProps {
  dataPoints: DataPoint[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureHumidityChart: React.FC<TemperatureHumidityChartProps> = ({
  dataPoints,
}) => {
  const chartData: ChartData<"line"> = {
    labels: dataPoints.map((dp) => dp.time),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: dataPoints.map((dp) => parseFloat(dp.temperature)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y1",
      },
      {
        label: "Umidade (%)",
        data: dataPoints.map((dp) => parseFloat(dp.humidity)),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        yAxisID: "y2",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default TemperatureHumidityChart;
