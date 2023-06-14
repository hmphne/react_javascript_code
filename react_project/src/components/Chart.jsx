/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getCurrency } from "../assets/api";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Online Country based currency",
    },
  },
};

let axisData = [];
console.log(axisData)

const Chart = (props) => {
  const { code, country } = props;
  const { isLoading, isError, data, error } = useQuery(
    ["codes", code],
    () => getCurrency(code),
    {
      enabled: !!code,
      refetchInterval: 1000,
    }
  );

useEffect(()=> {
  axisData= []
},[country])
  useEffect(() => {
    if (data) {
      axisData.push(data?.data);
    }
  }, [data]);

  console.log(code, country);

  const chartData = {
    labels: axisData.map((i) => i.x),
    datasets: [
      {
        label: `${country} - ${code}`,
        data: axisData?.map((i) => i.y),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <div>{error}</div>
      ) : (
        <Line options={options} data={chartData} />
      )}
    </>
  );
};

export default Chart;
