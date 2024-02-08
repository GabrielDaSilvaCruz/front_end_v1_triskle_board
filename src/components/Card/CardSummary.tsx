import { formatNumber } from "@/utils/function";
import classNames from "classnames";

interface CardSummaryProps  extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: number;
    element?: any;
}
export function CardSummary({ title, value, element, className, ...rest }: CardSummaryProps) {
    const Element = element as any
    return (
    <div className={classNames("w-full h-28 rounded-md bg-primary text-base-content p-4 flex flex-row gap-1 justify-around shadow-lg", className)} {...rest}>

        <div className="w-5/6 flex flex-col text-left">
            <h3 className="text-lg">{title}</h3> 
            <strong className="text-xl">{formatNumber(value,0,0)}</strong>
        </div>

        <div className="flex w-12 h-12 rounded-full bg-base-100 justify-center justify-items-center">
            <Element className="w-6 h-6 m-auto" />
        </div>
     </div>
    )
}