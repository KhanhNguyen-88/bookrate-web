import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './PieChartWithLegend.module.scss';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartWithLegend = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/category/chart');
        const result = await response.json();
        setData(result.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chuyển đổi dữ liệu từ response thành định dạng cho Pie Chart
  const chartData = {
    labels: data.map((item) => item.categoryName),
    datasets: [
      {
        data: data.map((item) => item.percent),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(192, 83, 59, 0.6)',
          'rgba(45, 81, 96, 0.6)',
          'rgba(213, 71, 156, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <Pie data={chartData} />
      </div>
      <div className={styles.legendContainer}>
        {/* <h3 className={styles.legendTitle}>Chú thích</h3> */}
        <ul className={styles.legendList}>
          {data.map((item, index) => (
            <li key={index} className={styles.legendItem}>
              <span
                className={styles.colorBox}
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              ></span>
              <span className={styles.categoryName}>{item.categoryName}:</span>
              <span className={styles.details}>
                {item.percent}% ({item.bookQuantity} sách)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PieChartWithLegend;
