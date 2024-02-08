export function Avatar() {
    return (
        <div className="flex flex-row w-full  text-base-content content-end  justify-end gap-2">

            <div className="flex flex-col mt-4 text-right">
                <span className="text-md">Gabriel Silva</span>
                <span className="text-sm">Gabriel-blz@outlook.com.br</span>
            </div>
            
     
     
            <div className="avatar online placeholder">
                <div className="text-neutral-content rounded-full w-16 h-16 bg-primary">
                    <span className="text-xl">G</span>
                </div>
                </div>
    
        </div>
    )
}