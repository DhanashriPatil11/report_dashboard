import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = ({ type, data, title, height = 300 }) => {
  const { theme } = useTheme();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.text,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: !!title,
        text: title,
        color: theme.text,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        ticks: {
          color: theme.textSecondary,
        },
        grid: {
          color: theme.border,
        },
      },
      y: {
        ticks: {
          color: theme.textSecondary,
        },
        grid: {
          color: theme.border,
        },
      },
    } : {},
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || [
        theme.primary,
        theme.secondary,
        theme.accent,
        theme.success,
        theme.warning,
        theme.error,
      ],
      borderColor: dataset.borderColor || theme.primary,
    })),
  };

  const ChartComponent = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
  }[type];

  return (
    <div 
      className="p-6 rounded-xl"
      style={{ 
        backgroundColor: theme.surface,
        height,
        boxShadow: `0 1px 3px ${theme.shadow}`
      }}
    >
      <ChartComponent data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;