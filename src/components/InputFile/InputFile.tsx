interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
}

export function InputFile({ ...rest }: InputFileProps) {
    return (
        <input { ...rest } type="file" className="file-input file-input-bordered file-input-primary w-full" />
    )
}