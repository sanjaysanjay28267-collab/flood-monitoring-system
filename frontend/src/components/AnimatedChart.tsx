import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface ChartDataPoint {
  label: string
  value: number
}

interface AnimatedChartProps {
  title: string
  data: ChartDataPoint[]
  color?: string
  unit?: string
  height?: number
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({
  title,
  data,
  color = '#0ea5e9',
  unit = '',
  height = 300,
}) => {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: title,
        data: data.map((d) => d.value),
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#64748b',
          font: { family: 'Inter, sans-serif' },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 12 },
        borderColor: '#64748b',
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.y.toFixed(2)} ${unit}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { family: 'Inter, sans-serif' },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { family: 'Inter, sans-serif' },
        },
      },
    },
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

export default AnimatedChart
