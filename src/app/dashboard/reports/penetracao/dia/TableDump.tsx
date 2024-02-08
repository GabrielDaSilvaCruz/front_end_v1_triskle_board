/* eslint-disable react-hooks/exhaustive-deps */
import { InputSearch } from "@/components/inputs/InputSearch"
import { useFilter } from "@/context/FilterContext";
import { api_axios } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface TableDumpProps {
    id: string;
    url: string;
    title: string;
    activateModalData: boolean;
    column: 'k_devedor' | 'telefone'
}

export function TableDump({ id, url, title, column, activateModalData}: TableDumpProps) {
    const { filterResult } = useFilter();
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [list, setList] = useState<any[]>([])
    const [limit ] = useState<number>(100)
    const [searchInput, setSearchInput] = useState<string>('')

    async function fetchPenetracao (data: string, searchInput: string,  options= [], page: number, limit: number) {
        try {
            const response  = await api_axios.post(url, {
                data,
                options,
                page,
                searchInput,
                limit
            })

            const { success, data: listData} = response.data
        
            if (success) {
                setList([...list, ...listData])   
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const { isLoading } = useQuery({ 
        queryKey: [`penetracao_${title}_${filterResult?.data?.['data']?.value[0] || '' }_${currentPage}`, filterResult?.data?.['data']?.value[0] || '', filterResult.options || '', searchInput], 
        queryFn:  async () => await fetchPenetracao(filterResult?.data?.['data'].value[0], searchInput, filterResult.options, currentPage, limit),
        staleTime: 100000, 
        enabled: activateModalData,
    })

    function handleScroll() {
        const element: any = document.getElementById(id);
        const { scrollTop, clientHeight, scrollHeight } = element;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        setList([])
    },[filterResult])

    return (
        <div
            id={id} 
            onScroll={() => handleScroll()}
            className="h-[800px] overflow-y-auto overflow-x-hidden scrollbar-track-current"
        >
            <table 
    
                className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th>{title}</th>
                        <th>
                            <InputSearch 
                                id={`search-${title}`} 
                                placeholder="..." 
                                isHover 
                                value={searchInput}
                                onChange={(event) => { 
                                    setList([])
                                    setSearchInput(event.target.value)
                                }}
                                className="flex flex-row w-40 px-2 py-1 max-sm:hidden" 
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((row: any) => {
                        return (
                        <tr key={row[column]}>
                            <td colSpan={2}>{row[column]}</td>
                        </tr>
                        )
                    })}
                    {isLoading && (
                    <div
                        className="w-full absolute flex flex-rows justify-center align-middle items-center"    
                    >
                            <span className="loading loading-dots loading-md "/>
                    </div>
                    )}
                </tbody>
            </table>
        </div>
    )
}