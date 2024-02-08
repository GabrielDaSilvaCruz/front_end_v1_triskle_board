'use client'
import { Modal } from "@/components/Modal/Modal";
import { Row } from "@/components/Row/Row";
import { Col } from "@/components/Col/Col";
import { ChartLineHorizontal } from "@/components/Chart/ChartLineHorizontal";
import { PiUsersThreeFill } from "react-icons/pi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CardSummary } from "@/components/Card/CardSummary";
import { TableDump } from "../dia/TableDump";
import { useEffect, useState } from "react";
import { useFilter } from "@/context/FilterContext";
import { api_axios } from "@/service/api";
import { useQuery } from "@tanstack/react-query";




export function ModalDump({ summary }: any) {
    const { filterResult } = useFilter();
    const [enabled, setEnabled] = useState(false)

    function handleEnabled() {
        setEnabled(!enabled)
    }

    const { data: dataDev, isLoading: isLoadingDev} = useQuery({
        queryKey: [`penetracao_summarized_devedores`, filterResult.options],
        queryFn: async () => await penetracaoDumpUnicoDev(filterResult.options),
        staleTime: 100000,
        enabled: enabled,
    })

    const { data: dataTel, isLoading: isLoadingTel } = useQuery({
        queryKey: [`penetracao_summarized_telefones`, filterResult.options],
        queryFn: async () => await penetracaoDumpUnicoTel(filterResult.options),
        staleTime: 100000,
        enabled: enabled,
    })

    async function penetracaoDumpUnicoDev(options = []) {
        const response = await api_axios.post('/report/penetracao-dump-unico-devedores', {
            data: '2023-12-26',
            options,
        })

        const { success, data } = response.data
            ;
        if (success) {
            const labels = data.map((i: any) => i.data)
            const dataDev = data.map((i: any) => i.qtd)
            return {
                data: dataDev,
                labels: labels
            }
        }

    }

    async function penetracaoDumpUnicoTel(options: any[]) {
        const response = await api_axios.post('/report/penetracao-dump-unico-telefones', {
            data: '2023-12-26',
            options,
        })
        const { success, data } = response.data

        if (success) {
            const labels = data.map((i: any) => i.data)
            const dataTel = data.map((i: any) => i.qtd)
            return {
                data: dataTel,
                labels: labels
            }
        } else {
            return {
                data: [],
                labels: []
            }
        }
    }

    return (
        <Modal
            id="modal-dump"
            title="só no Dump"
            textButton="só no Dump"
            classNameButton="btn-secondary rounded-full border-solid border-[2px] border-base-content z-10"
            handleEnabled={handleEnabled}
        >
            <Row>

                <div className="max-lg:col-span-6 col-span-3">
                    <CardSummary element={PiUsersThreeFill} title="Quantidade Devedores" value={summary?.dev} />
                </div>

                <div className="max-lg:col-span-6 col-span-3">
                    <CardSummary className="bg-secondary" element={BsFillTelephoneFill} title="Quantidade Telefones" value={summary?.tel} />
                </div>
            </Row>

            <Row>
                <div className="max-lg:col-span-12 col-span-5">
                    <Row>
                        <Col
                            id="table-dump-devedores"
                            sm="12" md="6" lg="6"
                        >
                            <TableDump
                                id="table-dump-devedores"
                                url="/report/penetracao-dump-devedores"
                                title="Devedores"
                                activateModalData={enabled}
                                column="k_devedor"
                            />
                        </Col>
                        <Col
                            sm="12"
                            md="6"
                            lg="6"
                            className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600"
                        >
                            <TableDump
                                id="table-dump-telefones"
                                url="/report/penetracao-dump-telefones"
                                title="Telefones"
                                activateModalData={enabled}
                                column="telefone"
                            />
                        </Col>
                    </Row>
                </div>

                <div className="max-lg:col-span-12 col-span-7">
                    <Row>
                        <Col sm="12" md="12" lg="12" className="h-[400px]" >
                            <ChartLineHorizontal title="só Dump Devedores" minScaleX={65} variant="primary"   labels={dataDev?.labels} data={dataDev?.data} isLoading={isLoadingDev} />
                        </Col>
                        <Col sm="12" md="12" lg="12" className="h-[400px]" >
                            <ChartLineHorizontal title="só Dump telefones" minScaleX={65} variant="secondary" labels={dataTel?.labels} data={dataTel?.data} isLoading={isLoadingTel} />
                        </Col>
                    </Row>
                </div>
            </Row>
        </Modal>
    )
}