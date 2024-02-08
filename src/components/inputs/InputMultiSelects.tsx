'use client'

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface OptionsProps {
    id: string[]
    father?: string
    children: string
    children_element: string
}
interface InputMultiSelectsProps {
    data: OptionsProps[];
    dataDefault: any[];
    onChange: (options: OptionsProps[]) => void
}

export function InputMultiSelects({ data, dataDefault, onChange}: InputMultiSelectsProps) {
    const [isOpenSelect, setisOpenSelect] = useState(false)
    const [dropdowm, setDropdowm] = useState<string>('')
    const [dropdowmChildren, setDropdowmChildren] = useState<string>('')
    const [optionsCheckeds, setOptionsCheckeds] = useState<OptionsProps[]>(dataDefault)



    function addOrRemoveOption(father: string, children: string, children_element: string) {
        const existOption = optionsCheckeds.find(item => item.children_element === children_element && item.children === children &&  item.father === father)
        if (!existOption) {
            const options = data.filter((item) => item.children_element === children_element && item.children === children && item.father === father)
            setOptionsCheckeds([...optionsCheckeds, ...options])
            onChange([...optionsCheckeds, ...options])
        } else {
            const options = optionsCheckeds.filter((item) => !(item.children_element === children_element && item.children  === children && item.father === father))
            setOptionsCheckeds(options)
            onChange(options)
        }
    }

    function handleAllCheckBoxFather(father: string) {
        const existOption = optionsCheckeds.some((item) => item.father === father)
        if (!existOption) {
            const options = data.filter((item) => item.father === father)
            setOptionsCheckeds([...optionsCheckeds, ...options])
            onChange([...optionsCheckeds, ...options])
        } else {
            const options = optionsCheckeds.filter((item) => item.father !== father)
            setOptionsCheckeds(options)
            onChange(options)
        }
    }

    function handleAllCheckBoxChildren(children: string) {
        const existOption = optionsCheckeds.some((item) => item.children === children)
        if (!existOption) {
            const options = data.filter((item) => item.children === children)
            setOptionsCheckeds([...optionsCheckeds, ...options])
            onChange([...optionsCheckeds, ...options])
        } else {
            const options = optionsCheckeds.filter((item) => item.children !== children)
            setOptionsCheckeds(options)
            onChange(options)
        }
    }

    return (
        <div className="w-full border-gray-50 my-2">
            <div
                className="relative"
                title={optionsCheckeds.length > 0 ? 'Multiplos' : 'selecione...'}
                onClick={() => setisOpenSelect(!isOpenSelect)}
            >
                <div className="select select-sm select-bordered w-full max-w-xs" >
                    <option disabled selected className="truncate ...">
                        {optionsCheckeds.length > 0 ? 'Multiplos' : 'selecione...'}
                    </option>
                </div>
                <div className="absolute left-0 right-0 top-0 bottom-0"></div>
            </div>
            <div
                id="checkboxes"
                className={`
                ${isOpenSelect
                        ? ' bg-base-100 absolute mt-2 z-10 w-[93%] shadow-md shadow-base-300 rounded-sm max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
                        : 'hidden'
                    }
                `}
            >

                {data?.map((option: any, _index: number) => {
                    {
                        const father = data[_index - 1]?.father
                        const children = data[_index - 1]?.children

                        return (
                            <div key={`${option.id[0]}-${option?.father}-${option?.children}`}>
                                {father !== option?.father  && option?.father !== undefined && (
                                    <div className="py-1 flex flex-row justify-between align-middle h-auto">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-xs checkbox-primary  rounded-sm"
                                            onChange={() => handleAllCheckBoxFather(option?.father)}
                                            checked={data.filter((i) => i.father === option.father).length  === optionsCheckeds.filter((i) => i.father === option.father).length}
                                        />

                                        <span
                                            className="flex flex-row justify-between label-text  text-xs truncate"
                                            onClick={() => setDropdowm(option?.father === dropdowm ? '' : option?.father)}
                                        >
                                            <label >{father !== option?.father && option?.father} </label>
                                            { option?.father === dropdowm  ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                        </span>
                                    </div>
                                )}

                                <div className={`m-1 ${dropdowm !== option?.father &&  option?.father !== undefined ? 'hidden' : 'none'} `}>
                                    {children !== option?.children && (
                                        <div className="flex flex-row justify-between align-middle h-auto">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-xs checkbox-primary  rounded-sm"
                                                onChange={() => handleAllCheckBoxChildren(option?.children)}
                                                checked={data.filter((i) => i.children === option.children).length  === optionsCheckeds.filter((i) => i.children === option.children).length}
                                            />
                            
                                                <span
                                                    className="flex flex-row justify-between label-text  text-xs truncate"
                                                    onClick={() => setDropdowmChildren(option?.children === dropdowmChildren ? '' : option?.children)}
                                                >
                                                    <label >{children !== option?.children && option?.children} </label>
                                                        { option?.children === dropdowmChildren  ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                    </span>
                                        </div>
                                    )}

                                    <div className={`h-7 ${dropdowmChildren !== option?.children ? 'hidden' : 'none'} `}>
                                        <label key={`${option?.father}-${option?.children}-${option?.children_element}`} className="cursor-pointer label flex flex-row justify-start">
                                            <input
                                                id={option?.children_element}
                                                type="checkbox"
                                                className="checkbox checkbox-xs checkbox-primary rounded-sm"
                                                onChange={() => addOrRemoveOption(option?.father, option?.children, option?.children_element)}
                                                checked={optionsCheckeds.some(i => i.children_element === option.children_element && i.children === option.children && i.father === option.father)}
                                            />
                                            <span className="m-1 label-text  text-xs truncate">{option?.children_element}</span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}