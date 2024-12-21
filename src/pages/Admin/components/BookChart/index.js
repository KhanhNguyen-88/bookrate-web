import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './BookChart.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BookChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/book/chart');
        const result = await response.json();
        setData(result.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chuyển đổi dữ liệu từ response thành định dạng cho Line Chart
  const labels = Object.keys(data).map((month) => `Tháng ${month}`);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Số sách đăng',
        data: Object.values(data),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Số sách đăng theo từng tháng',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tháng',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Số sách',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BookChart;