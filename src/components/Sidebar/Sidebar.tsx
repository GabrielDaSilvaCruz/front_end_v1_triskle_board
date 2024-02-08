"use client"
import { ButtonMenu } from "../ButtonMenu/ButtonMenu";
import { SidebarLink } from "./SidebarLink";
import { HiHome, HiMiniEye, HiChartBar } from "react-icons/hi2";
import {LuFilePieChart } from "react-icons/lu";
import { Logo } from "../Logo/Logo";

export function Sidebar({openMenu, setOpenMenu}: any) {

    return (
        <div className={`flex flex-col ${openMenu ? 'w-80 max-sm:absolute max-sm:z-50 max-sm:h-full max-sm:w-full' : 'w-auto'} `}>
            <ul className="menu bg-base-300 text-base-content w-full h-full shadow-none gap-2">
                <div className="flex flex-row w-full justify-between mt-2">
                    {openMenu && <Logo/>}
                    <ButtonMenu onClick={() => setOpenMenu(!openMenu)}/>
                </div>
                <SidebarLink disabledText={openMenu} element={HiHome}>Dashboard</SidebarLink>
                <SidebarLink href="/dashboard/reports/propensao" disabledText={openMenu} element={LuFilePieChart}>Propensão</SidebarLink>
                <SidebarLink href="/dashboard/reports/penetracao" disabledText={openMenu} element={HiChartBar}>BI Penetração</SidebarLink>
                <SidebarLink href="/dashboard/reports/controleAcesso"  disabledText={openMenu} element={HiMiniEye}>Controle de Acesso</SidebarLink>
            </ul>
        </div>
    )
}