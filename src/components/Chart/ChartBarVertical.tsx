'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




export function ChartBarVertical({ data, title, x_reverse = true, title_x="", title_y="" }: any) {

  const options: any = {
    maintainAspectRatio : false,
    responsive: true,
    Animation: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title
      },
    },
    scales: {
      x: {
          reverse: x_reverse, // Isso inverte o eixo x
          grid: {
              display: false,
          },
          title: {
            display: true,
            text: title_x
          },
      },
      y: {
          ticks: {
            display: false,
          },
          grid: {
              display: false,
          },
          title: {
            display: true,
            text: title_y
          },
      },
    },
  };

  return (<>
            {data && <Bar options={options} data={data} height={350} />}
          </>);
}
