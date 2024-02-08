'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface ThemeProviderProps {
    children: ReactNode
}

type ColorType = 'primary' | 'primary-dark' | 'primary-light' | 'secondary' | 'secondary-dark' | 'secondary-light' | 'accent' | 'neutral' | 'base-100' | 'text-base-content' | 'ligth' | 'text-base-chart'

interface ThemeContextDataProps {
    theme: 'winoLight' | 'winoDark'; 
    setTheme: (theme: 'winoLight' | 'winoDark') => void;
    themeColorToHexadecimal: (color: ColorType) => string;
}



export const ThemeContext = createContext<ThemeContextDataProps>({} as ThemeContextDataProps);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<'winoLight' | 'winoDark'>('winoDark')

    const themeClassMap = {
        "winoLight": { 
            'primary': '#21BDC6',
            'primary-dark': '#2256C7',
            'primary-light': '#5DACD9',
            'secondary': '#B4318F',
            'secondary-dark': '#C73922',
            'secondary-light': '#D95D6C',
            'accent': '#37cdbe',
            'neutral':'#3d4451',
            'base-100': '#F4F5F8',
            'text-base-content': '#433D35',
            'ligth': '#ffffff',
            'text-base-chart': '#000000',
        },
        "winoDark" : {
            'primary': '#21BDC6',
            'primary-dark': '#2256C7',
            'primary-light': '#5DACD9',
            'secondary': '#B4318F',
            'secondary-dark': '#C73922',
            'secondary-light': '#D95D6C',
            'accent': '#37cdbe',
            'neutral':'#3d4451',
            'base-100': '#15191D',
            'text-base-content': '#A2BFCB',
            'ligth': '#ffffff',
            'text-base-chart': '#ffffff',
            
        },
    }
    function themeColorToHexadecimal(color: ColorType) {
        return themeClassMap[theme][color]
    }

    return (
        <ThemeContext.Provider 
            value={{
                theme, 
                setTheme,
                themeColorToHexadecimal,
            }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = (): ThemeContextDataProps => {
    return useContext(ThemeContext);
};
  