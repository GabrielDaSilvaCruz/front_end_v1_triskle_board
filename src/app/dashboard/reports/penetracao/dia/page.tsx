/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import moment from "moment";
import { useEffect, useState } from "react";

import { Col } from "@/components/Col/Col";
import { Row } from "@/components/Row/Row";
import { Card } from "@/components/Card/Card";
import { ChartBarHorizontal } from "@/components/Chart/ChartBarHorizontal";
import { api_axios } from "@/service/api";
import { useFilter } from "@/context/FilterContext";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useTheme } from "@/context/ThemeContext";
import { ModalDump } from "./ModalDump";
import { usePathname } from "next/navigation";


const dataFilter: any = [
  { 
      id:  nanoid(),
      name: "Data",
      IsGeneratingOptions: false,
      isOpen: false,
      type: 4,
      options: [],
      value: [moment().format("YYYY-MM-DD")],
      name_column: 'data',
      condition: 0,
      isBlocked: true,
      fixed: true,
      conditionFixed: true
  },
  { 
      name: "Atraso",
      IsGeneratingOptions: true,
      isOpen: false,
      type: 3,
      options: [],
      value: undefined,
      name_column: 'atraso',
      condition: 0
  },
  { 
      name: "Faixa de Divida",
      IsGeneratingOptions: true,
      isOpen: false,
      type: 2,
      options: [],
      value: undefined,
      name_column: 'vl_divida',
      condition: 0
  },
  { 
    name: "Empresa / Carteira",
    IsGeneratingOptions: true,
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

] 

export default function PenetracaoDia() {
  const path = usePathname();
  const { themeColorToHexadecimal} = useTheme()
  const { startingFilters, filterResult } = useFilter();
  const [summary, setSummary] = useState({tel: 0, dev: 0})

  async function fetchPenetracao(data: string, options = []){
    try {
      const response  = await api_axios.post('/report/penetracao', {
        data,
        options,
      })

      const { 
        success,       
        acionamentos_dev,
        acionamentos_tel,
      } = response.data

        if (success) {

          const chartAcionamentoDev = {
            labels: acionamentos_dev.map((acionamento: any) => acionamento.label),
            datasets: [
              {
                data: acionamentos_dev.map((acionamento: any) => acionamento.value),
                backgroundColor: [
                  themeColorToHexadecimal('primary'), 
                  themeColorToHexadecimal('primary-dark'),
                  themeColorToHexadecimal('primary-light')
                ]
              }
            ]
          }
          const chartAcionamentoTel = {
            labels: acionamentos_tel.map((acionamento: any) => acionamento.label),
            datasets: [
              {
                data: acionamentos_tel.map((acionamento: any) => acionamento.value),
                backgroundColor: [
                  themeColorToHexadecimal('secondary'), 
                  themeColorToHexadecimal('secondary-dark'),
                  themeColorToHexadecimal('secondary-light')
                ]
              }
            ]
          }
          setSummary({
            tel:  response.data.dump[3].value,
            dev: response.data.dump[2].value
          })

          return {
              mailing_linhas: response.data.mailing_linhas,
              mailing_devedores: response.data.mailing_devedores,
              mailing_telefones: response.data.mailing_telefones,
              mailing: response.data.mailing,
              dump_linhas: response.data.dump_linhas,
              dump_devedores: response.data.dump_devedores,
              dump_telefones: response.data.dump_telefones,
              dump: response.data.dump,
              chartAcionamentoDev,
              chartAcionamentoTel
          }
        }
      } catch(error) {
        console.log(error)
      }
  }

  const { isLoading, data } = useQuery({ 
    queryKey: [`penetracao_${filterResult?.data?.['data']?.value[0] || ''}`, filterResult?.data?.['data']?.value[0] || '', filterResult.options || ''], 
    queryFn:  async () => await fetchPenetracao(filterResult?.data?.['data'].value[0], filterResult.options),
    staleTime: 600000, // Tempo em milissegundos (por exemplo, 10 minutos)
  })

  useEffect(() => {
    startingFilters(dataFilter)
  }, []);


  return (
      <>

        <Row className="gap-5">
            <Col  sm="12" md="6" lg="6"  className="card bg-base-100 shadow-sm rounded-md text-center p-2">
              <h3 className="text-base-content text-lg">Totais Mailing</h3>
              <Row>
                <Col sm="4" md="4" lg="4">
                  <Card 
                    title="Linhas"
                    isLoading={isLoading}
                    data={data?.mailing_linhas}
                  />
                </Col>
                <Col sm="4" md="4" lg="4">
                  <Card 
                     title="Devedores"
                     isLoading={isLoading}
                     data={data?.mailing_devedores}
                  />
                </Col>
                <Col sm="4" md="4" lg="4">
                  <Card 
                    title="Telefones"
                    isLoading={isLoading}
                    data={data?.mailing_telefones} 
                  />
                </Col>
              </Row>
            </Col>
                

              <Col sm="12" md="6" lg="6"   className="card bg-base-100 shadow-sm rounded-md text-center p-2">
                <h3 className="text-base-content">Totais Dump</h3>
                  <Row>
                    
                    <Col sm="4" md="4" lg="4">
                      <Card 
                        title="Linhas"
                        isLoading={isLoading}
                        data={data?.dump_linhas}  
                        variant="theme_secondary"
                      />
                    </Col> 
                    <Col sm="4" md="4" lg="4">
                      <Card 
                        title="Devedores"
                        isLoading={isLoading}
                        data={data?.dump_devedores}  
                        variant="theme_secondary"
                      />
                    </Col>
                    <Col sm="4" md="4" lg="4">
                      <Card 
                        title="Telefones"
                        isLoading={isLoading}
                        data={data?.dump_telefones} 
                        variant="theme_secondary"
                      />
                    </Col>
                  </Row>
              </Col>


              <div className="max-lg:col-span-12 col-span-2  card bg-base-100 shadow-sm rounded-md text-center p-2">
                <h3 className="text-base-content">Só Mailing</h3>
                  <Row>
                      <Col sm="12" md="12" lg="12">
                        <Card 
                          data={data?.mailing}      
                          isLoading={isLoading} 
                          className="max-lg:flex-row max-lg:justify-around flex-wrap" 
                          variant="theme_primary"
                        />
                      </Col>
                  </Row>
              </div>

              <Col sm="12" md="8" lg="8" className="card bg-base-100 shadow-sm rounded-md text-center p-2">
                <h3 className="text-base-content">Acionamentos</h3>
                <div className="h-3">
                  {isLoading && <span className="loading loading-dots loading-xs z-0" />}
                </div>
                  <Row>
                      <Col sm="12" md="6" lg="6">
                        <Col sm="12" md="12" lg="12">
                          <ChartBarHorizontal 
                            data={data?.chartAcionamentoDev} 
                            x_reverse 
                            title="Devedores"  
                            x_display_grade={false}
                          />
                        </Col>
                      </Col>
                      <Col sm="12" md="6" lg="6">
                        <Col sm="12" md="12" lg="12">
                          <ChartBarHorizontal 
                            data={data?.chartAcionamentoTel} 
                            x_reverse 
                            title="Telefones"  
                            x_display_grade={false}
                            />
                        </Col>
                      </Col>
                  </Row>
              </Col>
      

              <div 
                className="max-lg:col-span-12 col-span-2 card bg-base-100 shadow-sm rounded-md text-center p-2" 
              >
                <h3 className="text-base-content">Só Dump</h3>
                  <Row>
                      <Col sm="12" md="12" lg="12">
                        <Card 
                          data={data?.dump}      
                          isLoading={isLoading} 
                          className="max-lg:flex-row max-lg:justify-around flex-wrap"  
                          variant="theme_secondary"
                        />
                        <ModalDump 
                          summary={summary} 
                        /> 
                      </Col>
                  </Row>
              </div>
          </Row>
        </>
  )
}
