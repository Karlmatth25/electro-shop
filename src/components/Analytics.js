import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [
    {
      label: 'Soumissions',
      data: [5, 8, 3, 10, 7, 4, 6],
      backgroundColor: '#4CAF50',
      borderColor: '#45a049',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: { position: 'top' },
    tooltip: { enabled: true },
  },
};

export default function Analytics({ height = 300 }) {
  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
}
