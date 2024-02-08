'use client'

import { separateCamelCase } from "@/utils/function";
import { usePathname, useRouter } from "next/navigation";


export function Breadcrumbs() {
    const router = useRouter()
    const path = usePathname();

    function handleURL(title: string) {
        const index = path.indexOf(title)
        if (index !== -1) {
            const url = path.substring(0, index + title.length)
            router.push(url)
        }

    }

  
    return (
        <div className="text-sm breadcrumbs p-2 cursor-pointer">
            <ul>
                home
                {path.split('/').map((title) => (
                    !['dashboard','reports'].includes(title) && <li key={title} onClick={() => handleURL(title)}>{separateCamelCase(title)}</li>
                ))}
            </ul>
        </div>
    )
}