// // import React from "react";
// // import {
// //   Chart as ChartJS,
// //   LineElement,
// //   PointElement,
// //   LinearScale,
// //   Title,
// //   CategoryScale,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Line } from "react-chartjs-2";
// // import { ChartData, ChartOptions } from "chart.js";

// // Registrando os componentes necessários
// // ChartJS.register(
// //   LineElement,
// //   PointElement,
// //   LinearScale,
// //   CategoryScale,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // interface TemperatureHumidityChartProps {
// //   dataPoints: { time: string; temperature: number; humidity: number }[];
// // }

// // const TemperatureHumidityChart: React.FC<TemperatureHumidityChartProps> = ({
// //   dataPoints,
// // }) => {
// //   const chartData: ChartData<"line"> = {
// //     labels: dataPoints.map((dp) => dp.time),
// //     datasets: [
// //       {
// //         label: "Temperatura (°C)",
// //         data: dataPoints.map((dp) => dp.temperature),
// //         borderColor: "rgba(75, 192, 192, 1)",
// //         backgroundColor: "rgba(75, 192, 192, 0.2)",
// //         yAxisID: "y1",
// //       },
// //       {
// //         label: "Umidade (%)",
// //         data: dataPoints.map((dp) => dp.humidity),
// //         borderColor: "rgba(153, 102, 255, 1)",
// //         backgroundColor: "rgba(153, 102, 255, 0.2)",
// //         yAxisID: "y2",
// //       },
// //     ],
// //   };

// //   const chartOptions: ChartOptions<"line"> = {
// //     responsive: true,
// //     scales: {
// //       y1: {
// //         type: "linear",
// //         display: true,
// //         position: "left",
// //       },
// //       y2: {
// //         type: "linear",
// //         display: true,
// //         position: "right",
// //         grid: {
// //           drawOnChartArea: false,
// //         },
// //       },
// //     },
// //   };

// //   return <Line data={chartData} options={chartOptions} />;
// // };

// // export default TemperatureHumidityChart;

// // import React from "react";
// // import { Line } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   ChartData,
// //   ChartOptions,
// // } from "chart.js";

// // interface DataPoint {
// //   time: string;
// //   temperature: string;
// //   humidity: string;
// // }

// // interface TemperatureHumidityChartProps {
// //   dataPoints: DataPoint[];
// // }

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // const TemperatureHumidityChart: React.FC<TemperatureHumidityChartProps> = ({
// //   dataPoints,
// // }) => {
// //   const chartData: ChartData<"line"> = {
// //     labels: dataPoints.map((dp) => dp.time),
// //     datasets: [
// //       {
// //         label: "Temperatura (°C)",
// //         data: dataPoints.map((dp) => parseFloat(dp.temperature)),
// //         borderColor: "rgba(75, 192, 192, 1)",
// //         backgroundColor: "rgba(75, 192, 192, 0.2)",
// //         yAxisID: "y1",
// //       },
// //       {
// //         label: "Umidade (%)",
// //         data: dataPoints.map((dp) => parseFloat(dp.humidity)),
// //         borderColor: "rgba(153, 102, 255, 1)",
// //         backgroundColor: "rgba(153, 102, 255, 0.2)",
// //         yAxisID: "y2",
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     responsive: true,
// //     scales: {
// //       y1: {
// //         type: "linear",
// //         display: true,
// //         position: "left",
// //       },
// //       y2: {
// //         type: "linear",
// //         display: true,
// //         position: "right",
// //         grid: {
// //           drawOnChartArea: false,
// //         },
// //       },
// //     },
// //   };

// //   return <Line data={chartData} options={chartOptions} />;
// // };

// // export default TemperatureHumidityChart;
import React from "react";
import styled from "styled-components";
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
import annotationPlugin from "chartjs-plugin-annotation";

// interface DataPoint {
//   time: string;
//   temperature: string;
//   humidity: string;
// }

// interface TemperatureHumidityChartProps {
//   dataPoints: DataPoint[];
// }

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const TemperatureHumidityChart = ({ dataPoints }) => {
  const temperatureData = dataPoints.map((dp) => parseFloat(dp.temperature));
  const humidityData = dataPoints.map((dp) => parseFloat(dp.humidity));
  const labels = dataPoints.map((dp) => dp.time);

  const temperatureChartOptions = {
    responsive: true,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
    plugins: {
      annotation: {
        annotations: {
          lowLimit: {
            type: "line",
            yMin: 18,
            yMax: 18,
            borderColor: "red",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: "Limite Inferior",
              enabled: true,
              position: "start",
            },
          },
          highLimit: {
            type: "line",
            yMin: 28,
            yMax: 28,
            borderColor: "red",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: "Limite Superior",
              enabled: true,
              position: "start",
            },
          },
        },
      },
    },
  };

  const humidityChartOptions = {
    responsive: true,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
    plugins: {
      annotation: {
        annotations: {
          lowLimit: {
            type: "line",
            yMin: 41,
            yMax: 41,
            borderColor: "blue",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: "Limite Inferior",
              enabled: true,
              position: "start",
            },
          },
          highLimit: {
            type: "line",
            yMin: 60,
            yMax: 60,
            borderColor: "blue",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: "Limite Superior",
              enabled: true,
              position: "start",
            },
          },
        },
      },
    },
  };

  const temperatureChartData = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temperatureData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const humidityChartData = {
    labels,
    datasets: [
      {
        label: "Umidade (%)",
        data: humidityData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  return (
    <Container>
      <Line data={temperatureChartData} options={temperatureChartOptions} />
      <Line data={humidityChartData} options={humidityChartOptions} />
    </Container>
  );
};

const Container = styled.div`
  @media only screen and (max-device-width: 900px) {
    display: block;
  }
`;

export default TemperatureHumidityChart;
