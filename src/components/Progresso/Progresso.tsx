import classNames from "classnames";
import { AiOutlineUpload } from "react-icons/ai";

interface ProgressoProps extends React.HTMLAttributes<HTMLDivElement> {
    percentage: number;
    text?: string;
}
export function Progresso({ percentage, text, className, ...rest }: ProgressoProps) {
    return (
    <div className={classNames("flex justify-center align-middle h-full w-full items-center", className)} {...rest}>
        <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{'--value': percentage}}>
            <AiOutlineUpload className="w-6 h-6"/>
        </div>
    </div>
    )
}