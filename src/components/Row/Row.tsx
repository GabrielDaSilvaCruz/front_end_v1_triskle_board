import { twMerge } from "tailwind-merge"

interface RowProps {
    children: React.ReactNode
    className?: string
}
export function Row({ children, className }: RowProps) {
    return (
        <div className={twMerge('w-full grid grid-rows-none grid-cols-12 gap-2 p-2', className)}>
            {children}
        </div>
    )
}