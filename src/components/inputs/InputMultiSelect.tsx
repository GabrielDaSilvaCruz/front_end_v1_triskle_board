'use client'

import { useState } from "react";
import { OptionProps } from "../Filter/FilterProps";

interface InputMultiSelectProps {
    options: OptionProps[]
    optionsDefault: OptionProps[]
    onChange: (options: OptionProps[]) => void
}

export function InputMultiSelect({ optionsDefault, options, onChange }: InputMultiSelectProps) {
    const [isOpenSelect, setisOpenSelect] = useState(false)
    const [optionsCheckeds, setOptionsCheckeds] = useState<OptionProps[]>(optionsDefault)
    
    function addOrRemoveOption(option: OptionProps) {
        const existOption = optionsCheckeds.find(item => item.value === option.value)
        if (!existOption) {
            setOptionsCheckeds([...optionsCheckeds, option])
            onChange([...optionsCheckeds, option])
        } else {
            const filteroptions = optionsCheckeds.filter((item) => item.value  !== option.value)
            setOptionsCheckeds(filteroptions)
            onChange(filteroptions)
        }
     
    }

    function optionsTransformerTitle(options: OptionProps[]): string {
        const arrayLabel = options.map((i) => i.label)
        return arrayLabel.length === 0 ? 'Selecione...' :  arrayLabel.join(', ')
    }

    return (
        <div className="w-full border-gray-50">
            <div 
                className="relative" 
                title={optionsTransformerTitle(optionsCheckeds)}
                onClick={() => setisOpenSelect(!isOpenSelect)}
            >
                <div  className="select select-sm select-bordered w-full max-w-xs" >
                    <option disabled selected className="truncate ...">
                        {optionsTransformerTitle(optionsCheckeds)}
                    </option>
                </div>
                <div className="absolute left-0 right-0 top-0 bottom-0"></div>
            </div>
            <div 
                id="checkboxes" 
                className={`
                ${isOpenSelect 
                    ? 'bg-base-100 absolute mt-2 z-10 w-[93%] shadow-md shadow-base-300 rounded-sm max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
                    : 'hidden' 
                }
                `}
            >   

                {options.map((option, _index) => {
                    return (
                        <>
                        {option.reference !== options[_index -1]?.reference  && option.reference && (
                            <span className="text-xs border-b-[1px] m-2 border-solid border-x-base-100 w-full">
                                {option?.reference}
                            </span>
                        )}
                        <label key={option.value} className="cursor-pointer label flex flex-row justify-start gap-2">
                            <input 
                                type="checkbox" 
                                className="checkbox checkbox-xs checkbox-primary input-bordered rounded-sm" 
                                onChange={() => addOrRemoveOption(option)}
                                checked={optionsCheckeds.some(i => i.value === option.value)}
                            />
                            <span className="label-text">{option.label}</span>
                        </label>
                        </>
                    )
                })}
            </div>
        </div>
    )
}