import classNames from "classnames"
import Link from "next/link"

interface CardLinkProps extends  React.AnchorHTMLAttributes<HTMLAnchorElement> {
    element: any
    title: string
    textContent?: string
}
export function CardLink({element, title,  textContent, className,  href  }: CardLinkProps) {
    const Element = element as any
    return (
        <div className={classNames('min-w-[300px] flex flex-col transition-all justify-center align-middle items-center hover:bg-base-100 rounded-md p-2 hover:shadow-md', className)}>
            <Link  
                href={`${href}`}
                className="bg-primary text-base-content justify-center align-middle rounded-full h-20 w-20"
            >
                <Element className="m-auto rounded-full  h-16 w-16" />
            </Link>
            <h4 className="w-full p-5 text-center">{title}</h4>
            {textContent && 
            <div className="h-auto overflow-hidden text-center">
                {textContent}
            </div>}
        </div>
    )
}