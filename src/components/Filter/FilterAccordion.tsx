'use client'
import { FilterItemProps, NewFilterItemProps } from "./FilterProps"
import { FilterTag } from "./FilterTag"
import { useFilter } from "@/context/FilterContext"

interface FilterAccordionProps {
  filters: FilterItemProps[]
  checked: boolean
  isOpenMenu: boolean
  onClose: () => void
}

export function FilterAccordion({ filters, checked, isOpenMenu, onClose }: FilterAccordionProps) {
    const { 
      AddFilter, 
      filtersData 
    } = useFilter();


    const alfabetico = filters.map((filterItem: FilterItemProps) => filterItem.name[0].toLocaleUpperCase())
    const arraySemDuplicatas = [...new Set(alfabetico)];
    return (
      <>
      <div className="text-xl flex w-full min-h-10 flex-wrap gap-2 py-2">
        {filtersData.map((filterItem: NewFilterItemProps) => { 
          return (
            <FilterTag key={filterItem.id} filterItem={filterItem} />
          )
          })}
      </div>
      {checked && 
          <div className={`h-60 max-md:h-80 overflow-x-auto overflow-y-hidden ${isOpenMenu ? 'left-80' : 'left-20'} right-9 bg-base-100 rounded-md shadow-lg shadow-base-300 absolute mt-28 mx-auto overflow-auto z-30`}>
            <button className="btn btn-sm btn-s btn-ghost absolute mt-2 right-2" onClick={onClose}>✕</button>
            <div className="flex flex-col flex-wrap h-full  w-fit justify-start gap-1 max-md:mt-10">

              {arraySemDuplicatas.map((word) => {
                return (
                  <li key={word} className="menu w-40 h-fit ">
                      <a>{word}</a>
                      {filters.map((filter: FilterItemProps) => {
                        const wordFilter = filter.name[0].toLocaleUpperCase()
                        return wordFilter === word && (
                            <ul key={filter.name} id={filter.name} className="flex flex-row">
                              <li key={filter.name} onClick={() => {
                                  AddFilter(filter);
                                  onClose();
                                  }}
                              >
                                <a>{filter.name}</a></li>
                            </ul>
                        ) 
                        })
                      }
                    </li>
                )
              }) }
            </div>
         </div>
      }
 
    </>
    )
}
