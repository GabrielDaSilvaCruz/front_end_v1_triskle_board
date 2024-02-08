import Link from "next/link"

interface SidebarLinkProps extends  React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode,
    disabledText: boolean
    element?: any
}
export function SidebarLink({ children, disabledText, element, href, ...rest }: SidebarLinkProps) {
    const Element = element as any
    return (
        <li><Link  href={`${href}`} className="flex rounded-md"  {...rest}>
            <div className="w-[20px] h-w[20px]"> <Element className='h-4 w-4' /></div>
            {disabledText && <>{children}</>}
            </Link>
        </li>
    ) 
} 