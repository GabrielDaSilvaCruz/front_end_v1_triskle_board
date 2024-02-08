'use client'

import { useEffect, useState } from "react";

import { TypeDate } from "./FilterType/TypeDate";
import { TypeNumber } from "./FilterType/TypeNumber";
import { TypeDecimal } from "./FilterType/TypeDecimal";
import { TypeString } from "./FilterType/TypeString";

import { NewFilterItemProps } from "./FilterProps";
import { useFilter } from "@/context/FilterContext";
import { TbLock } from "react-icons/tb";
import { BsX } from "react-icons/bs";
import { TypeMulti } from "./FilterType/TypeMulti";
import { api_axios } from "@/service/api";


interface FilterTagProps {
    filterItem: NewFilterItemProps
}
export function FilterTag({ filterItem }: FilterTagProps) {
    const { removeFilter, applyingFilter } = useFilter();
    const [ isOpen, setIsOpen ] = useState<boolean>(filterItem.isOpen);

    return (
        <div className="shadow-md shadow-base-300 w-60 z-20">
            <div className="flex w-full badge badge-primary badge-lg rounded-md h-8">
                <button className="flex justify-start w-56 text-sm" onClick={() => { setIsOpen(!isOpen)}}>
                    {filterItem.name}
                </button>
                <button 
                    disabled={filterItem?.isBlocked}
                    onClick={() => removeFilter(filterItem.id)}
                >
                    {filterItem?.isBlocked ? <TbLock /> : <BsX/>}
                </button>
            </div>
 
        {isOpen && 
            <>
                        {filterItem.type === 4 && (
                            <TypeDate 
                                filterItem={filterItem}
                                applyingFilter={applyingFilter}
                            />
                        )} 
                        {filterItem.type === 3 && (
                            <TypeNumber 
                                filterItem={filterItem}
                                applyingFilter={applyingFilter}
                            />
                        )}
                        {filterItem.type === 2 && (
                            <TypeDecimal 
                                filterItem={filterItem}
                                applyingFilter={applyingFilter}
                            />
                        )}
                        {filterItem.type === 1 && (
                            <TypeString 
                                filterItem={filterItem}
                                applyingFilter={applyingFilter}
                            />
                        )}
                        {filterItem.type === 0 && (
                            <TypeMulti 
                                filterItem={filterItem}
                                data={filterItem.data}
                                applyingFilter={applyingFilter}
                            />
                        )}
            </>
        }
        </div>
    )
}
