'use client'

import { useState } from "react";
import { OptionProps, TypeProps } from "../FilterProps";
import { FilterCondition } from "../FilterCodition";
import { InputMultiSelect } from "@/components/inputs/InputMultiSelect";


export function TypeString({ filterItem,  applyingFilter }: TypeProps) {
    const { id, condition, options, conditionFixed = false } = filterItem

    const [conditionFilter, setConditionFilter] = useState<number>(condition)
    const [value, setValue] = useState<string[]>(filterItem.value)



    function ConditionFixed() {
        const coditions= [
            { label: 'Igual',       value: 0},
            { label: 'Diferente',   value: 3}
        ];

        if (conditionFixed)  {
            return coditions.filter((i) => i.value === condition);
        } 

        return coditions
    }
    function handleChange(item: OptionProps[] | string) {
      let array = []
      if (Array.isArray(item)) {
        array = item.map((i) => i.label)
      } else {
        array.push(item.trim())
      }
      setValue(array)
    }

    function validationArrayString(itens: string[]): boolean {
        let isInvalido = true
        if (Array.isArray(itens)) {
            for (const item of itens) {
                if (item.length >= 2) {
                    isInvalido = false
                } 
            }
        } 
        return isInvalido
    }

    return (
        <div className="bg-base-100 absolute h-50 w-60 rounded-b-md z-10 shadow-md shadow-base-300"> 
            <div className="flex  rounded-s-md flex-col justify-end items-end p-2">
                <div className="w-full mt-4">
                    <div id={`${id}-type-string`}>
                        {options.length === 0
                            ? 
                            <input
                                id={`${id}-text`}
                                name="input-text" 
                                className="input input-sm input-bordered w-full max-w-xs" 
                                type="text"
                                value={value[0]}
                                onChange={(event) => handleChange(event.target.value)} 
                            /> 
                            : <InputMultiSelect 
                                optionsDefault={options.filter((option) => value?.includes(option.label))}
                                options={options}
                                onChange={handleChange}
                              /> 
                        }
                        <FilterCondition 
                            id={id} 
                            coditions={ConditionFixed()} 
                            conditionFilter={conditionFilter} 
                            setConditionFilter={setConditionFilter} 
                        />
                    </div>
                    <button
                        className="btn btn-primary btn-sm rounded-md w-30 text-xs"
                        disabled={validationArrayString(value)}
                        onClick={() => applyingFilter(id, conditionFilter, value)}

                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}