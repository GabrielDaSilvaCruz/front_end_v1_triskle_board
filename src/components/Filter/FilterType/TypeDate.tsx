'use client'

import { useState } from "react";
import { TypeProps } from "../FilterProps";
import { FilterCondition } from "../FilterCodition";
import moment from "moment";

export function TypeDate({ filterItem, applyingFilter }: TypeProps) {
    const { id, condition, value, conditionFixed = false } = filterItem

    const [minValue, setMinValue] = useState<string>(Array.isArray(value) ? value[0] : 0)
    const [maxValue, setMaxValue] = useState<string>(Array.isArray(value) ? value[0] : 0)

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

    function validationArrayDate(): boolean {
        let isInvalido = true
        const minData = moment(minValue);
        const maxData = moment(maxValue);

        if (conditionFilter === 4) {
            if (minData.isValid() || minData.isValid()) {
                return isInvalido
            }
            if (minData.isAfter(maxData)) {
                return isInvalido
            }
            isInvalido = false
        } else {
            if (!minData.isValid()) {
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
                    <div id={`${id}-type-date`}>
                        {conditionFilter === 4 ?
                        <div className="flex flex-col gap-2 mb-2">
                            <input
                                id={`${id}-min`}
                                className="input input-sm input-bordered w-full max-w-xs text-base-content" 
                                type="date" 
                                name="dateIni" 
                                value={minValue}
                                onChange={(event) => setMinValue(event.target.value)} 
                  
                            />
                            <input 
                                id={`${id}-max`}
                                className="input input-sm input-bordered w-full max-w-xs text-base-content" 
                                type="date" 
                                name="dateFim" 
                                value={maxValue}
                                onChange={(event) => setMaxValue(event.target.value)} 
                            />
                        </div>
                        : 
                            <input
                                id={`${id}-max`}
                                className="input input-sm input-bordered w-full max-w-xs text-base-content" 
                                type="date" 
                                name="dateIni" 
                                value={minValue}
                                onChange={(event) => setMinValue(event.target.value)} 
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
                        disabled={validationArrayDate()}
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