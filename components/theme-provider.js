"use client"

import * as React from "react"
import { useEffect,useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
      setMounted(true)
    }, [])
    if (!mounted) {
      return null
    }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
