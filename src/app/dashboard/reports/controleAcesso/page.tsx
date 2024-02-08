'use client'
import { Row } from '@/components/Row/Row';
import { SelectChartProps, abstractDataClickChart, generateChartColors, separateDataByCategory } from '@/utils/chart';
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
import { useState, useEffect } from 'react';
import { Pie , Bar} from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);



const regs = [
  {
    nome: "Gabriel da Silva Cruz",
    setor: "Analytics",
    cargo: "Engenheiro de Software",
    relatorio: "ABS",
    clicks: 51
  },
  {
    nome: "Rafael Lima",
    setor: "Analytics",
    cargo: "Analista de Dados",
    relatorio: "Matriz",
    clicks: 51
  },
  {
    nome: "Ana Santos",
    setor: "RH",
    cargo: "Analista de Recursos Humanos",
    relatorio: "Matriz",
    clicks: 24
  },
  {
    nome: "Pedro Oliveira",
    setor: "Operacao",
    cargo: "Gerente de Operações",
    relatorio: "Relatorio 1",
    clicks: 73
  },
  {
    nome: "Mariana Vieira",
    setor: "Planejamento",
    cargo: "Analista de Planejamento",
    relatorio: "ABS",
    clicks: 42
  },
  {
    nome: "Lucas Rodrigues",
    setor: "Analytics",
    cargo: "Engenheiro de Software",
    relatorio: "Relatorio 2",
    clicks: 60
  },
]
const datafilter = { value: undefined, type: undefined, label: undefined}
const DataPie = separateDataByCategory(regs, 'Cliques por Relatorio', 'relatorio', 'clicks')
const DataBar = separateDataByCategory(regs, 'Cliques por Setor', 'setor', 'clicks')

export default function App() {
  const [ filter, setFilter ] = useState<SelectChartProps>(datafilter);
  const [ isToFilter, setIsToFilter ] = useState<boolean>(false);
  const [ rows, setRows] = useState(regs)
  const [ pie, setPie] = useState(DataPie)
  const [ bar, setBar] = useState(DataBar)

  async function GeneratedDataCharts (rows: any[]) {
    const backgroundColor = generateChartColors()
    const Pie = separateDataByCategory(rows, 'Cliques por Relatorio', 'relatorio', 'clicks', backgroundColor)
    const Bar = separateDataByCategory(rows, 'Cliques por Setor', 'setor', 'clicks', backgroundColor)
    setBar(Bar)
    setPie(Pie)
  }

  useEffect(() => {
    if (isToFilter && filter.type !== undefined && filter.label !== undefined) {
    const rowsFilter = regs.filter((reg: any) => {
      return reg[String(filter.type)] === filter.label}
    )
    GeneratedDataCharts(rowsFilter)
    } else {
      GeneratedDataCharts(regs)
    }
  }
  ,[filter, isToFilter])


  const optionspie = {
    responsive: true,
    onClick: (e: any, elements: any) => abstractDataClickChart(e, elements, pie, setFilter, setIsToFilter),
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cliques Por Relatorio',
      },
    },
  };
  const optionsbar = {
    responsive: true,
    onClick: (e: any, elements: any) => abstractDataClickChart(e, elements, bar, setFilter, setIsToFilter),
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cliques Por Setor',
      },
    },
  };

  return (
      <Row>

        <div className='col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12' >
          <Pie options={optionspie} data={pie} updateMode="show" />
        </div>

        <div className='col-span-8 lg:col-span-8 md:col-span-6 sm:col-span-12'>
          <Bar options={optionsbar} data={bar} updateMode="show" />
        </div>

      </Row>
  );
}
