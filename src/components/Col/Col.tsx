'use client'
import classNames from "classnames";

type options = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'

interface ColProps extends React.HTMLAttributes<HTMLDivElement>{
    sm?: options
    md?: options
    lg?: options
    children: React.ReactNode
}

const colClassMap = {
    "1": "col-span-1",
    "2": "col-span-2",
    "3": "col-span-3",
    "4": "col-span-4",
    "5": "col-span-5",
    "6": "col-span-6",
    "7": "col-span-7",
    "8": "col-span-8",
    "9": "col-span-9",
    "10": "col-span-10",
    "11": "col-span-11",
    "12": "col-span-12",
}
  
export function Col({
    sm = '12', 
    md = '2', 
    lg = '2', 
    children, 
    className, 
    ...rest
}: ColProps) {
    const colClassSm = colClassMap[sm]
    const colClassMd = colClassMap[md]
    const colClassLg = colClassMap[lg]

    return (
    <div className={classNames(`${colClassSm}  md:${colClassMd} lg:${colClassLg}`, className)} {...rest}>
        {children}
    </div>)
}