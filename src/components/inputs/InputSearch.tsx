import { twMerge } from "tailwind-merge"

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    
    isHover?: boolean;
    className?: string
}
export function InputSearch({ 
    id, 
    isHover = false, 
    className,
    ...rest}: InputSearchProps) {
    return (
    <label htmlFor={id} className={twMerge("bg-base-100 px-6 py-2 w-[400px] rounded-full", className)}>
        <input id={id} type="text" {...rest} className={`flex flex-row bg-transparent outline-none ${isHover ? 'w-0 hover:w-full' : 'w-full'}`}/>    
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </label>
    )
}