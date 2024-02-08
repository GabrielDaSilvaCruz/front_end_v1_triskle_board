'use client'
import { Button } from "@/components/Button/Button";
import { ChartLineHorizontal } from "@/components/Chart/ChartLineHorizontal";
import { Col } from "@/components/Col/Col";
import { Row } from "@/components/Row/Row";
import { useFilter } from "@/context/FilterContext";
import { useTheme } from "@/context/ThemeContext";
import { separateDataByCategoryLine } from "@/utils/chart";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const dataFilter: any = [
    { 
      name: "Empresa / Carteira",
      IsGeneratingOptions: false,
      isOpen: false,
      type: 0,
      url: '/report/penetracao-dim-empresa',
      value: undefined,
      name_column: 'id_empresa',
      fixed: false,
      condition: 0
    },
    { 
      name: "Evento / Destino / Binagem",
      IsGeneratingOptions: true,
      isOpen: false,
      type: 0,
      url: '/report/penetracao-dim-destino',
      value: undefined,
      name_column: 'id_dispo',
      fixed: false,
      condition: 0
    },
    { 
      name: "dia",
      IsGeneratingOptions: true,
      isOpen: false,
      type: 1,
      options: [
          {'value': 0, 'label': 'dom'},
          {'value': 1, 'label': 'seg'},
          {'value': 2, 'label': 'ter'},
          {'value': 3, 'label': 'qua'},
          {'value': 4, 'label': 'qui'},
          {'value': 5, 'label': 'sex'},
          {'value': 6, 'label': 'sab'},
      ],
        value: undefined,
        name_column: 'data',
        condition: 0
    },
  ] 

interface optionsProps {
  value: number
  label: string
}
export default function Fisica() {
    const path = usePathname();
    const { themeColorToHexadecimal } = useTheme();
    const [viewGeneral, setViewGeneral] = useState<boolean>(true);
    const { startingFilters, filterResult } = useFilter();
    const [dataMailing, setDataMailing] = useState([]);
    const [dataDump, setDataDump] = useState([]);
    const [ data, setData] = useState<optionsProps[]>([]);

    useEffect(() => {
      const regsMailing = data.filter((reg: any) => reg.tipo === 'mailing')

      if (regsMailing) {
        const chartMailing = separateDataByCategoryLine(regsMailing, 'tipo', 'qtd', 'id_empresa')
      }

      const regsDump = data.filter((reg: any) => reg.tipo === 'dump')

      if (regsDump) {
        const chartDump = separateDataByCategoryLine(regsDump, 'tipo', 'qtd', 'id_empresa')
      }
    }, [data])


    const fetchData = async (options = []) => {
      try {
        const response: any = await fetch('http://127.0.0.1:8000/report/stream_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
            data: '2023-01-01',
            options,
          }),
        });
        setData([]);

        const reader = response.body.getReader();
    
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return data
          }
          const decoder = new TextDecoder('utf-8');
 
          const decodedValue = decoder.decode(value);
    
          try {
            const regs = JSON.parse(decodedValue);
            setData((prevData) => [...prevData, ...regs]);
          } catch (jsonError) {
            console.error('Erro ao fazer parsing do JSON:', jsonError);
          }
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }
    };
    
    
    const { isLoading } = useQuery({ 
      queryKey: [`fisicas`, filterResult.options || ''], 
      queryFn:  async () => await fetchData(filterResult.options),
      staleTime: 600000, // Tempo em milissegundos (por exemplo, 10 minutos)
    })

    useEffect(() => {
      startingFilters(dataFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleTypeViewGeneral() {
      setViewGeneral(true);
    }

    function handleTypeViewMultiple() {
      setViewGeneral(false);
    }
    
    return (
        <Row className="gap-5">
            <div className="flex flex-row gap-2">
                <Button id="btn-quantidade-Negocio" className="btn-secondary rounded-md btn-sm" onClick={handleTypeViewGeneral}>
                    Geral
                </Button>

                <Button id="btn-quantidade-Negocio" className="btn-secondary rounded-md btn-sm" onClick={handleTypeViewMultiple}>
                    Por Cliente
                </Button>
            </div>
            <Col sm="12" className="card bg-base-100 h-[420px] p-2 shadow-sm rounded-md">
                <ChartLineHorizontal 
                    isLoading={isLoading} 
                    ZoomMode="x" 
                    title="maling - Devedores" 
                    variant="primary" 
                    labels={data.map((i) => { 
                      return i.label
                    })} 
                    // datasets={!viewGeneral && chartData?.datasetMailing} 
                    data={data.map((i) => { 
                      return i.value
                    })} 
                    legend={!viewGeneral} 
                  />
            </Col>
            <Col sm="12" className="card bg-base-100 h-[420px] p-2 shadow-sm rounded-md">
                <ChartLineHorizontal 
                  isLoading={isLoading} 
                  ZoomMode="x"
                  title="dump - Devedores" 
                  variant="secondary" 
                  labels={data.map((i) => { 
                    return i.label
                  })} 
                  // datasets={!viewGeneral && chartData?.datasetDump} 
                  data={data.map((i) => { 
                    return i.value
                  })} 
                /> 

            </Col>
        </Row>
    )
}