'use client'

import { separateCamelCase } from "@/utils/function";
import { HiCheck } from 'react-icons/hi2';

interface DropdownThemeProps {
    selectTheme: 'winoLight' | 'winoDark'; 
    setTheme: (theme: 'winoLight' | 'winoDark') => void;
}

const themes:any = ["winoLight","winoDark"]
export function DropdownTheme({ selectTheme, setTheme }: DropdownThemeProps) {

    return (
        <div title="Change Theme" className="dropdown dropdown-content z-30 absolute top-8 right-80 max-md:right-56 max-md:top-2 ">
            <div tabIndex={0} className="btn normal-case btn-ghost max-md:hover:bg-transparent">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" className="h-5 w-5 stroke-current md:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                    </path>
                </svg> 
                <span className="hidden font-normal md:inline">
                    Theme
                </span> 
                <svg width="12px" height="12px"
                    className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <div  className="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-96 w-56 overflow-y-auto shadow mt-16">
                <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                {themes.map((theme: any) => {
                    return (
                    <button
                        key={theme}
                        onClick={() => setTheme(theme)}
                        className="outline-base-content overflow-hidden rounded-lg text-left" 
                        data-set-theme={theme}
                        data-act-class="[&amp;_svg]:visible"
                    >
                        <span 
                            data-theme={theme}
                            className="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                        >
                                <span
                                    className="grid grid-cols-5 grid-rows-3"
                                >
                                        <span
                                            className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                                {selectTheme === theme ? <HiCheck className='h-4 w-4' /> : <span className="w-[16px] h-[16px]" />}
                                                    <span className="flex-grow text-sm">{
                                                        separateCamelCase(theme)}
                                                    </span> 
                                                <span
                                                    className="flex h-full flex-shrink-0 flex-wrap gap-1" data-svelte-h="svelte-dkjulf"
                                                >
                                                        <span className="bg-primary w-2 rounded"/> 
                                                        <span className="bg-secondary w-2 rounded"/> 
                                                        <span className="bg-accent w-2 rounded"/>
                                                        <span className="bg-neutral w-2 rounded"/>
                                                </span>
                                        </span>
                                </span>
                            </span>
                        </button>
                    )
                })}   
             
                </div>
            </div>
        </div>
    )
} 