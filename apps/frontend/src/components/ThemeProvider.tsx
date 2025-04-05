"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Import the type from the main module instead of the dist path
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}