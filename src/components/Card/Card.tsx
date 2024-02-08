'use client'

import { formatNumber } from "@/utils/function"
import classNames from "classnames"

interface OptionsProps {
    label: string
    value: number
}
interface CardProps extends  React.HTMLAttributes<HTMLDivElement>  {
    isLoading?: boolean
    data?: OptionsProps[]
    direction?: 'row' | 'col'
    title?: string
    className?: string
    variant?: 'theme_primary' | 'theme_secondary' | 'theme_tertiary'
}
const themeClassMap ={
    theme_primary: "border-primary",
    theme_secondary: "border-secondary",
    theme_tertiary: "border-accent"
}

export function Card({ isLoading = false, title = undefined, direction = 'col', data = [], className, variant = 'theme_primary', ...rest}:  CardProps) {
    return (
        <div className={classNames("flex flex-col gap-1 p-1 rounded-md w-full ", className)} {...rest}>
            <div className=" p-1  text-left">
                <div className="h-3">{isLoading && <span className="loading loading-dots loading-xs" />}</div>
                {title && <h3>{title}</h3>}
            </div>
            {data.map((item) => {
                    return (
                        <div key={item.label}>
                            
                            <div className={classNames(`flex flex-${direction} gap-2 w-full border-l-4 items-start pl-2`, {[themeClassMap[variant]]:variant})}>
                                <span className="text-sm font-bold flex-nowrap">{item.label}</span>
                                <span className="text-sm">{formatNumber(item.value, 0, 0)}</span>
                            </div>
                        </div>
                    )}
                )
            }
        </div>
    )
}