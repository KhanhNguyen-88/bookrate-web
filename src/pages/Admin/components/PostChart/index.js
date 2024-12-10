import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PostChart = ({ data }) => {
    const chartData = {
        labels: data.map((d) => d.date),
        datasets: [
            {
                label: "Số bài đăng",
                data: data.map((d) => d.posts),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    };

    return <Line data={chartData} />;
};

export default PostChart;
