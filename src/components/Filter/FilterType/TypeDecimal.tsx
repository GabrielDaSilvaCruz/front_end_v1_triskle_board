'use client'

import { useState } from "react";
import { TypeProps } from "../FilterProps";
import { FilterCondition } from "../FilterCodition";

export function TypeDecimal({ filterItem, applyingFilter }: TypeProps) {
    const { id, condition, value, conditionFixed = false } = filterItem
    const [minValue, setMinValue] = useState<number>(Array.isArray(value) ? value[0] : 0)
    const [maxValue, setMaxValue] = useState<number>(Array.isArray(value) ? value[1] : 0)
    const [conditionFilter, setConditionFilter] = useState<number>(condition)

    function ConditionFixed() {
        const coditions= [
            { label: 'Igual', value: 0},
            { label: 'Menor Igual', value: 1},
            { label: 'Maior Igual', value: 2},
            { label: 'Diferente', value: 3},
            { label: 'Entre', value: 4}
        ];

        if (conditionFixed)  {
            return coditions.filter((i) => i.value === condition);
        } 

        return coditions
    }


    function validationArrayDecimals(): boolean {
        let isInvalido = true
        if (conditionFilter === 4) {
            if (typeof minValue !== 'number' || typeof maxValue !== 'number' ) {
                return isInvalido
            }
            if (minValue >= maxValue) {
                return isInvalido
            }
            isInvalido = false
        } else {
            if (typeof minValue !== 'number') {
                return isInvalido
            }
            isInvalido = false
        }
   
        return isInvalido
    }
    
    return (
        <div className="bg-base-100 absolute h-50 w-60 rounded-b-md z-10 shadow-md shadow-base-300"> 
            <div className="flex  rounded-s-md flex-col justify-end items-end p-2">
                <div className="w-full mt-4">
                    <div id={`${id}-type-decimal`}>
                        {conditionFilter === 4 ?
                        <div id={`${id}-input`} className="flex flex-col gap-2 mb-2">
                            <input 
                                id={`${id}-min`} 
                                name="type-decimal-min" 
                                className="input input-sm input-bordered w-full max-w-xs" 
                                type="number" 
                                step="0.01" 
                                min={0}
                                value={minValue}
                                onChange={(event) => setMinValue(parseFloat(event.target.value))}  
                            />
                            <input 
                                id={`${id}-max`} 
                                className="input input-sm input-bordered w-full max-w-xs" 
                                name="type-decimal-max" 
                                type="number"
                                step="0.01" 
                                value={maxValue}
                                min={0}
                                onChange={(event) => setMaxValue(parseFloat(event.target.value))}   
                            />
                        </div>
                        : 
                            <input 
                                id={`${id}-min`} 
                                className="input input-sm input-bordered w-full max-w-xs" 
                                name="type-decimal" 
                                type="number" 
                                step="0.01" 
                                value={minValue}
                                min={0}
                                onChange={(event) => setMinValue(parseFloat(event.target.value))}
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
                        disabled={validationArrayDecimals()}
                        onClick={() => applyingFilter(id, conditionFilter, [minValue, maxValue])}
                        className="btn btn-primary btn-sm rounded-md w-30 text-xs" 
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}