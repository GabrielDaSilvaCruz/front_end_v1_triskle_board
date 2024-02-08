import classNames from "classnames"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    id: string
    children: React.ReactNode
  }
  

export function Button({id, children, className, ...rest}: ButtonProps) {
    return <button {...rest} className={classNames('btn btn-primary', className)}>{children}</button>
}