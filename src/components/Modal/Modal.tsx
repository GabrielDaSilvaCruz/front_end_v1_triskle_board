'use client'

import classNames from "classnames";

interface ModalProps {
    id: string;
    title?: string;
    textButton: string;
    classNameButton?: string;
    classNameModal?: string;
    children: React.ReactNode
    handleEnabled: (enabled: boolean) => void;
}
export function Modal({ id, title, textButton, classNameButton = '', classNameModal = '', children, handleEnabled }: ModalProps) {
    return (
        <>
            <button 
                id={`button-${id}`}
                className={classNames("btn btn-md ", classNameButton)}
                onClick={() => {
                    const modal: any = document.getElementById(`modal-${id}`)
                    if (modal) modal.showModal()
                    handleEnabled(true)
                }}
            >
                {textButton}
            </button>
           
            <dialog id={`modal-${id}`} className={classNames(`modal p-0 m-0`, classNameModal)}>
                <div className={`'w-12/12 max-w-full h-12/12 border border-base-300 modal-box `}> 
                    {title && <h3 className="w-12/12 h-10 font-bold text-left">{title}</h3>}
                    <form method="dialog">
                        <div className="tooltip tooltip-left absolute right-2 top-2" data-tip="Esc">
                           <button className="btn btn-sm btn-square btn-ghost" onClick={() => handleEnabled(false)}>
                              ✕
                           </button>
                        </div>
                    </form>
                    <div className="w-full  max-h-[500px] overflow-y-auto scrollbar-track-current">
                        {children}
                    </div>
                </div>
            </dialog>
        </>
    )
}