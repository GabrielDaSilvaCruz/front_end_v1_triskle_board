export type valueProps = string | string[] | number | number[] | undefined

export interface FilterItemProps {
    id?: string
    name: string
    IsGeneratingOptions?: boolean
    isOpen: boolean
    url?: string
    type: number
    parentKey?: string
    childKey?: string
    options: OptionProps[]
    data: any[]
    value: valueProps
    name_column: string
    isBlocked?: boolean
    fixed?: boolean
    condition: number
    conditionFixed?: boolean
}

export interface NewFilterItemProps {
    id: string
    name: string
    isOpen: boolean
    url?: string
    IsGeneratingOptions?: boolean
    type: number
    parentKey?: string
    childKey?: string
    options: OptionProps[]
    value: any
    name_column: string
    isBlocked?: boolean
    fixed?: boolean
    condition: number
    conditionFixed?: boolean
}

export interface TypeProps {
    filterItem: NewFilterItemProps
    data: any[]
    applyingFilter: (id: string, condition: number, value: valueProps ) => void
}


export interface ConditionOptionProps {
    value: number
    label: string
    reference?: string
}

export interface OptionProps {
    value: number | string
    label: string
    reference?: string
}