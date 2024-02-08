'use client'
import { CardLink } from "@/components/Card/CardLink";
import { Row } from "@/components/Row/Row";
import { api_axios } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { FaBalanceScale, FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function Penetracao() {

    async function fetch() {
        const response  = await api_axios.get('/penetracao-dim-empresa')
        return response
    }

    return (
        <Row>
            
            <div className="max-lg:col-span-12 col-span-3 p-2 flex flex-row gap-2 max-md:flex-col">

                <CardLink 
                    title="Foto do Dia"  
                    element={FaUsers}
                    href="/dashboard/reports/penetracao/dia"
                    textContent="Lorem ipsum dolor sit, amet consectetur adipisicing elit." 
                />

                <CardLink 
                    title="Quantidades Físicas"  
                    element={FaBalanceScale}
                    href="/dashboard/reports/penetracao/fisicas"
                    textContent="Lorem ipsum dolor sit, amet consectetur adipisicing elit." 
                />
                
            </div>

        </Row>
    )
}