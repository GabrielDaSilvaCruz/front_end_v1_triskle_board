'use client'
import React, { useState }  from "react";

import { FilterButton } from "./FilterButton";
import { FilterAccordion } from "./FilterAccordion";
import { useFilter } from "@/context/FilterContext";


interface FilterProps {
    isOpenMenu: boolean,
}

export function Filter({ isOpenMenu }: FilterProps) {
    const { initFilters } = useFilter();
    const [openAccordion, setOpenAccordion] = useState<boolean>(false)

    function handleOpenAccordion() {
        setOpenAccordion(!openAccordion)
    }

    function onClose() {
        setOpenAccordion(false)
    }


    return (
        <>  
            {initFilters.length > 0 &&<FilterButton handleOpenAccordion={handleOpenAccordion} />}
            <FilterAccordion filters={initFilters} isOpenMenu={isOpenMenu} checked={openAccordion} onClose={onClose} />
        </>

    )
}
