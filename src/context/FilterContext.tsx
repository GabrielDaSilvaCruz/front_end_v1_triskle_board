'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { FilterItemProps, NewFilterItemProps, valueProps } from '@/components/Filter/FilterProps';
import { nanoid } from 'nanoid';
import { api_axios } from '@/service/api';

interface FilterProviderProps {
    children: ReactNode
}
interface FilterContextDataProps {
    initFilters: FilterItemProps[];
    startingFilters: (filters: FilterItemProps[]) => void;
    removeFilter: (id: string) => void;
    AddFilter: (filterItem: FilterItemProps) => void;
    applyingFilter: (id: string, condition: number, value: valueProps) => void;
    filtersData: NewFilterItemProps[];
    filterResult:  any;
    resetFIlters: () => void;
}
  
export const FilterContext = createContext<FilterContextDataProps>({} as FilterContextDataProps );

export function FilterProvider({ children }: FilterProviderProps) {
    const [initFilters, setinitFilters] = useState<FilterItemProps[]>([]);
    const [filtersData, setFilterData] = useState<NewFilterItemProps[]>([])
    const [filterResult, setFilterResult] = useState<{}>({});
    
      async function startingFilters (filters: FilterItemProps[]) {
        const filtersData = [];
        for (const filter of filters) {
          if (filter.type === 0 && filter.url) {
            const response = await api_axios.get(filter.url)
            const { data } = response
            filtersData.push({...filter, data})
          } else {
            filtersData.push(filter)
          }
        }
        setinitFilters(filtersData);
        const filtersFixed: any[] = filters.filter((filter) => filter.fixed === true);
        if (filtersFixed.length > 0) {
          convertingFiltersToOptions(filtersFixed) 
          setFilterData(filtersFixed);
        }
      }

      function resetFIlters() {
        setinitFilters([]);
        setFilterData([]);
      }

      function removeFilter(id: string) {
        const removeFilter = filtersData.filter(filter => filter.id !== id)
        convertingFiltersToOptions(removeFilter)
        setFilterData(removeFilter)
      }
  
      function AddFilter(filterItem: FilterItemProps) {
        const { name_column } = filterItem

        if (filtersData.some((i) => i.name_column  === name_column)) {
            return alert('"Filtro em uso", "O filtro selecionado já está em uso. Por favor, escolha outro filtro.')
        }

        setFilterData([...filtersData, {...filterItem,  id: nanoid()}])
      }
  
      function applyingFilter(id: string, condition: number, value: any) {
        const filters = filtersData
        const index = filters.findIndex((filter) => filter.id === id)

        if (index !== -1) {
          filters[index].condition = condition
          filters[index].value = value
          if (filters[index].childKey && filters[index].type === 1) {
      
            const indexChild = filters.findIndex((filter) => filter.parentKey === filters[index].name_column)

            if (indexChild !== -1) {
            const values: any = []

            filters[indexChild].options.forEach((option) => {
              if (option?.reference && value.includes(option?.reference) && condition === 0) {
                values.push(option.label)
              }
              // if (values?.includes(value) && condition === 3) {
              //   const indexToRemove = values.indexOf(value);
              //   if (indexToRemove !== -1) {
              //     values.splice(indexToRemove, 1);
              //   }
              // }
            })
     
            if (values?.length > 0) {
              filters[indexChild].value = values
             }
            }
          } 
     
          convertingFiltersToOptions(filters) 
          setFilterData(filters)  
        }
      }

      function convertingFiltersToOptions (filtered: NewFilterItemProps[]) {
        const options: any[] = []
        const data: any = {}
        filtered.forEach((filter) => {
          const { name_column, condition, type, value } = filter
            if (filter.value !== undefined && filter?.IsGeneratingOptions) {
              options.push({name_column, condition, type, value})
            }
            if (!filter?.IsGeneratingOptions && filter.value !== undefined) {
              data[filter.name_column] = {value, condition, type};
            }
        })
        const optionsOrder = options.sort((a, b) =>  a.name_column.localeCompare(b.name_column))
        setFilterResult({ options: optionsOrder, data })
      }

      function addValuesFromParentFilterToChildFilter() {

      }

      function addValuesFromChildFilterToParentFilter() {

      }

    return (
        <FilterContext.Provider 
            value={{
                initFilters,
                startingFilters,
                removeFilter,
                AddFilter,
                applyingFilter,
                filtersData,
                filterResult,
                resetFIlters,
            }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilter = (): FilterContextDataProps => {
    return useContext(FilterContext);
  };
  