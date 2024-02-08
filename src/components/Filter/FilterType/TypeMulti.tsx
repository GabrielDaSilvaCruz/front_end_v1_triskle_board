'use client'

import { useEffect, useState } from "react";
import { OptionProps, TypeProps } from "../FilterProps";
import { FilterCondition } from "../FilterCodition";;
import { api_axios } from "@/service/api";
import { InputMultiSelects } from "@/components/inputs/InputMultiSelects";


export function TypeMulti({ filterItem,  data = [], applyingFilter }: TypeProps) {
    const { id, condition, url, conditionFixed = false } = filterItem

    const [value, setValue] = useState<any[]>(filterItem.value)

    function handleChange(options: any[]) {
      let array: any = []
      if (Array.isArray(options)) {
        options.forEach((i) => {
            array.push(...i.id)
        })
      }
      setValue(array)
    }

    function validationArray(itens: any[]): boolean {
        let isInvalido = true
        if (itens?.length > 0) {
            isInvalido = false
        }
        return isInvalido
    }
    
    function handleValues() {
        const checks = data.filter((option) => { 
            return option.id.some((id: any) => {
                return value?.includes(id)
            })
        })

        return checks
    }
    return (
        <div className="bg-base-100 absolute h-50 w-60 rounded-b-md z-10 shadow-md shadow-base-300"> 
            <div className="flex  rounded-s-md flex-col justify-end items-end p-2">
                <div className="w-full mt-4">
                    <div id={`${id}-type-string`}>
                            <InputMultiSelects 
                                data={data}
                                dataDefault={handleValues()}
                                onChange={handleChange}
                              /> 
                    </div>
                    <button
                        className="btn btn-primary btn-sm rounded-md w-30 text-xs"
                        disabled={validationArray(value)}
                        onClick={() => applyingFilter(id, condition, value)}

                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}