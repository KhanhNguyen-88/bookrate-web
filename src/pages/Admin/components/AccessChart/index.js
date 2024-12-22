import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './AccessChart.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AccessChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/login-history/chart');
        const result = await response.json();
        setData(result.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chuyển đổi dữ liệu từ response thành định dạng cho Bar Chart
  const chartData = {
    labels: data.map((item) => item.loginDate),
    datasets: [
      {
        label: 'Lượng truy cập',
        data: data.map((item) => item.accessCount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
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
        text: 'Lượng truy cập theo 5 ngày gần nhất',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày',
        },
        ticks: {
          autoSkip: false, // Hiển thị toàn bộ nhãn trên trục x
        },
        barPercentage: 0.5, // Chiều rộng cột, giá trị từ 0 đến 1
        categoryPercentage: 0.8, // Khoảng cách giữa các cột, giá trị từ 0 đến 1
      },
      y: {
        title: {
          display: true,
          text: 'Lượt truy cập',
        },
        beginAtZero: true,
      },
    },
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AccessChart;