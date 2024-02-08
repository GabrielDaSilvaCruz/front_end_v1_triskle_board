'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Layout } from "./Layout";
import { FilterProvider } from "@/context/FilterContext";
import { ThemeProvider } from '@/context/ThemeContext';

interface TemplateProps {
  children: React.ReactNode
}
export function Template({ children }: TemplateProps) {

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          refetchOnMount: true,
          retry: 1,
          staleTime: 5 * 1000,
        },
      },
    })

    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FilterProvider>
            <Layout>{children}</Layout>
          </FilterProvider>
          </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} /> 
      </QueryClientProvider>
    )
}