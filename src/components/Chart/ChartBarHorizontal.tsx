'use client'
import { SelectChartProps, abstractDataClickChart } from "@/utils/chart";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface ChartBarHorizontalProps {
    data?: any;
    title: string;
    background?: string;
    x_reverse?: Boolean;
    x_display_grade?: Boolean;
    y_display_grade?: Boolean;
}

export function ChartBarHorizontal({ 
    data,
    title,
    x_reverse = false,
    x_display_grade = true,
    y_display_grade = true


}: ChartBarHorizontalProps) {
    const { themeColorToHexadecimal} = useTheme()
    const [ filter, setFilter ] = useState<SelectChartProps>();
    const [ isToFilter, setIsToFilter ] = useState<boolean>(false);
    

  
    const optionsBar: any = {
        maintainAspectRatio : false,
        responsive: true,
        Animation: true,
        layout: {
            padding: {
              top: 5, // Ajuste o valor conforme necessário
              right: 30
            },
        },
        scales: {
            x: {
                reverse: x_reverse, // Isso inverte o eixo x
                // stacked: true,
                ticks: {
                  color: themeColorToHexadecimal('text-base-content'),
                  display: x_display_grade,
                },
                grid: {
                    display: false,
                },
                title: {
                  display: false,
                  text: 'Rótulo do Eixo X',
                  color: 'blue', // Altere a cor do rótulo do eixo X aqui
                },
            },
            y: {
                // stacked: true,
                ticks: {
                    color: themeColorToHexadecimal('text-base-content'),
                    display: y_display_grade,
                },
                grid: {
                    display: false,
                },
                title: {
                  display: false,
                  text: 'Rótulo do Eixo X',
                  color: 'blue', // Altere a cor do rótulo do eixo X aqui
                },
            },
        },
        indexAxis: 'y' as const,
        indexedDB: false as const,
        onClick: (e: any, elements: any) => abstractDataClickChart(e, elements, data, setFilter, setIsToFilter),
        plugins: {
           datalabels: {
            anchor: x_reverse ? "start" : "end", // Alinhe as etiquetas no final da barra
            align: "end", // Alinhe as etiquetas no final da barra
            color: themeColorToHexadecimal('text-base-chart'), // Cor do texto das etiquetas
            // font: {
            //     weight: "bold", // Peso da fonte das etiquetas
            // },
          },
          legend: {
            display: false,
            labels: {
              color: "#fff"
            }
          },
          title: {
            display: true,
            color: themeColorToHexadecimal('text-base-content'),
            text: title,
          },
        },
    };

    return data?.datasets?.length > 0 && <Bar data={data} options={optionsBar} updateMode="show" plugins={[ChartDataLabels]} />
}