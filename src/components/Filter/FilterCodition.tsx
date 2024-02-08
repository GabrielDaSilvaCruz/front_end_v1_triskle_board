import { ConditionOptionProps } from "./FilterProps"

interface FilterConditionProps {
    id: string
    coditions: ConditionOptionProps[]
    conditionFilter: number
    setConditionFilter: (conditionFilter: number) => void
}

export function FilterCondition({ id, coditions, conditionFilter, setConditionFilter }: FilterConditionProps) {
    return (
        <div id={`${id}-condition-group`} className="flex flex-col gap-2 my-2">
                            {coditions.map((item) => {
                            return (
                                <label key={item.value} className="label cursor-pointer flex justify-start gap-2 h-1">
                                    <input 
                                        id={`${id}-condition`}
                                        name={`${id}-condition`}
                                        type="radio" 
                                        className="radio-sm w-auto h-auto checked:bg-primary"
                                        checked={conditionFilter === item.value} 
                                        onChange={() => setConditionFilter(item.value)}
                                    />
                                    <span className="label-text">{item.label}</span>
                                </label>
                            )
                            })}
                        </div>
    )
}