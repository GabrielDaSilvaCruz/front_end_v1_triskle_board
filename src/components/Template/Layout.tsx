'use client'
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { DropdownTheme } from "../DropdownTheme/DropdownTheme";
import { Filter } from "../Filter/Filter";
import { useTheme } from "@/context/ThemeContext";
import { useFilter } from "@/context/FilterContext";
import { usePathname } from "next/navigation";


interface LayoutProps {
    children:  React.ReactNode;
}

export function Layout ({ children}: LayoutProps) {
    const [ openMenu, setOpenMenu] = useState<boolean>(false)
    const { theme, setTheme } = useTheme()
    const { resetFIlters } = useFilter()
    const path = usePathname();
    
    useEffect(() => {
      resetFIlters()
    },[path])

    return (
      <div data-theme={theme} className='flex flex-row h-screen w-screen bg-base-300'>
      <Sidebar  openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <div className='flex flex-col h-screen w-screen'>
        <Navbar />
            <div className='flex flex-wrap  p-4'>
              <Breadcrumbs />
              <DropdownTheme selectTheme={theme} setTheme={setTheme} />
              <Filter isOpenMenu={openMenu}/>
            </div>
            <div className='flex flex-wrap overflow-auto p-2 rounded-md'>
              <>
              <div className={`${openMenu ? 'left-80' : 'left-20'} mt-[-40px] right-5  h-10 fixed z-10 bg-base-300 blur-md`} />
              {children}
              </>
            </div>
      </div>
    </div>
    )
  }