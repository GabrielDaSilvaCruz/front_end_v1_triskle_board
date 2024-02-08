export interface ButtonMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
}

export function ButtonMenu({disabled, ...rest}: ButtonMenuProps) {
    return (
    <button className="btn btn-ghost btn-square" disabled={disabled} {...rest}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
    )
}