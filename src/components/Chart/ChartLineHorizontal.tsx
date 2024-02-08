'use client'
import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { FaFileCsv } from "react-icons/fa6";
import { AiFillFileImage } from "react-icons/ai";
import { MdLabelOff } from "react-icons/md";
import { MdLabel } from "react-icons/md";
import toImage from 'chartjs-to-image';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useTheme } from '@/context/ThemeContext';
import { Button } from "@/components/Button/Button";

ChartJS.register(
  CategoryScale,  
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartLineHorizontalProps {
  title: string;
  isLoading: boolean;
  variant: 'primary' | 'secondary'; 
  labels?: string[];
  ZoomMode?: 'x' | 'y' | 'xy'
  
  data?: number[];
  datasets?: any;
  legend?: boolean;
  minScaleX?: number;
  maxScaleX?: number;
  minScaleY?: number;
  maxScaleY?: number;
}

export function ChartLineHorizontal({ 
  title, 
  isLoading,
  variant, 
  labels, 
  data, 
  datasets, 
  legend = false, 
  ZoomMode = 'x',
  minScaleX,
  maxScaleX,
  minScaleY,
  maxScaleY,
 } : ChartLineHorizontalProps) {
  const { themeColorToHexadecimal } = useTheme();
  const chartRef = useRef<any>(null);
  const [hideShowNumber, setHideShowNumber] = useState<boolean>(false);
  
  const zoomValuesRef = useRef<any>({ minX: minScaleX, maxX: maxScaleX , minY: minScaleY, maxY: maxScaleY });


  const handleZoom = (event: any) => {

    if (chartRef.current && event.chart) {

      const chartInstance = event.chart;
      // Acesse as escalas x e y
      const scaleX = chartInstance.scales['x'];
      const scaleY = chartInstance.scales['y'];
  
      // Acesse os valores mínimos e máximos das escalas após o zoom
      const minX = scaleX.min;
      const maxX = scaleX.max;
      const minY = scaleY.min;
      const maxY = scaleY.max;
  
      zoomValuesRef.current = { minX, maxX, minY, maxY };
      
    }
  };

  const handlePan = (event: any) => {
    if (chartRef.current && event.chart) {

      const chartInstance = event.chart;
      // Acesse as escalas x e y
      const scaleX = chartInstance.scales['x'];
      const scaleY = chartInstance.scales['y'];
  
      // Acesse os valores mínimos e máximos das escalas após o zoom
      const minX = scaleX.min;
      const maxX = scaleX.max;
      const minY = scaleY.min;
      const maxY = scaleY.max;
  
      zoomValuesRef.current = { minX, maxX, minY, maxY };
      
    }
  }


  const zoomOptions = {
    limits: {
      x: { min: 0 },
      y: { min: 0 },
    },
    pan: {
      enabled: true,
      mode: ZoomMode,
      onPan: handlePan,
      rangeMin: {
        x: null,
        y: null,
      },
      rangeMax: {
        x: null,
        y: null,
      },
    },
    zoom: {
      mode: ZoomMode,
      wheel: {
        speed: 0.5,
        enabled: true,
        modifierKey: null,
      },
      pinch: {
        enabled: true,
      },
      onZoom: handleZoom,
    },
  };
  
  const datalabels = {
    position: 'top',
    align: 'end',
    color: themeColorToHexadecimal('text-base-content'),
    borderRadius: 100,
    offset: 10,
    display: hideShowNumber,
    padding: { top: 10 }, // Ajustado para um objeto padding
  };

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { 
        display:  legend,       
        labels: {
          usePointStyle: true,
          fontWeight: '800',   // Set legend label font weight to bold
          color:   themeColorToHexadecimal('text-base-chart')       // Change legend label color to red
        }
    },
      datalabels: datalabels,
      zoom: zoomOptions,
      title: {
        display: true,
        position: 'top',
        align: 'center',
        text: title,
      },
    },
    scales: {
      x: {
        type: 'category',
        min: zoomValuesRef.current.minX,
        max: zoomValuesRef.current.maxX,
        labels,
        beginAtZero: false,
        maxTicksLimit: 10,
        position: 'bottom',
        offset: true,
        grid: { display: false },
        title: { display: false },
      },
      y: {
        type: 'linear' as const,
        min: zoomValuesRef.current.minY,
        max: zoomValuesRef.current.maxY,
        position: 'left',
        offset: true,
        beginAtZero: true,
        grid: { display: false },
        title: { display: false },
      },
    },
  };

  const dataChart: any = {
    labels,
    datasets:  datasets ||  [
      {
        label: 'Devedores',
        fill: false,
        lineTension: 0.2,
        backgroundColor: themeColorToHexadecimal(`${variant}-light`),
        borderColor: themeColorToHexadecimal(variant),
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: themeColorToHexadecimal(variant),
        pointBackgroundColor: themeColorToHexadecimal('text-base-content'),
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: themeColorToHexadecimal(variant),
        pointHoverBorderColor: themeColorToHexadecimal('text-base-content'),
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data,
      },
    ]
  };

  const exportChart = () => {
    // Obtém a referência do gráfico
    const chartInstance = chartRef.current;

    // Verifica se o gráfico existe
    if (chartInstance) {
      // Exporta o gráfico como uma imagem (PNG por padrão)
      const imageData = chartInstance.toBase64Image();
      
      // Cria um link temporário
      const downloadLink = document.createElement('a');
      downloadLink.href = imageData;

      let filename = `chart_${title.replaceAll(' ', '_')}`.toLocaleLowerCase()
      filename = filename.replaceAll('__', '_')
      downloadLink.download = filename.replace(/[^0-9a-zA-Z_]+/g, "");
      document.body.appendChild(downloadLink);

      // Simula um clique no link para iniciar o download
      downloadLink.click();

      // Remove o link temporário do corpo do documento
      document.body.removeChild(downloadLink);
    }
  };

  const exportCSV = () => {
    const chartInstance = chartRef.current;

    if (chartInstance) {
      const { labels, datasets: datasetsCurrent} = chartInstance.data;

      const text = datasetsCurrent.map((dataset: any) => {
        const coluna = String(dataset.label) 
        return  coluna + ',' + dataset.data.join(',') + '\n'
      })
      // Cria o conteúdo do CSV
      const csvContent = 'Label' + ',' +  labels.join(',') + '\n'  + text.join('')

      // Cria um Blob (objeto binário grande) a partir do conteúdo CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

      // Cria um link temporário
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      let filename = `chart_${title.replaceAll(' ', '_')}`.toLocaleLowerCase();
      filename = filename.replace(/[^0-9a-zA-Z_]+/g, "")
      filename = filename.replaceAll('__', '_')
      downloadLink.download = filename;

      // Simula um clique no link para iniciar o download
      downloadLink.click();
    }
  };

  return (
    <div  className="mt-10" style={{ width: '100%', height: '350px'  }}>
      <div className='mb-[-10px] w-auto h-7 flex flex-row gap-2 justify-end align-middle m-auto sticky'>
        {isLoading && (<div className='w-full h-7 px-2'><span className="loading loading-ring text-primary" /></div>)}
         <Button 
          id="show-hide-chart-line"
          title={!hideShowNumber ? 'Mostrar Label' : 'Ocultar Label'}
          onClick={() => {
            setHideShowNumber(!hideShowNumber)
          }} 
          className='btn-primary w-14 btn-xs rounded-sm '>
            {!hideShowNumber ? <MdLabel/> : <MdLabelOff />}
         </Button>
          <Button
            id="export-chart"
            title='Exportar Gráfico'
            onClick={exportChart}
            className='btn-primary w-14 btn-xs rounded-sm'>
              <AiFillFileImage/>
          </Button>
          <Button
           id="export-chart"
           title='Exportar Dados'
           onClick={exportCSV}
           className='btn-primary w-14 btn-xs  rounded-sm'>
            <FaFileCsv />
          </Button>
      </div>
        <Line
          id='lineChart'
          ref={chartRef}
          options={options}
          data={dataChart}
          plugins={[ZoomPlugin, ChartDataLabels]}
        />
    </div>
  );
}
