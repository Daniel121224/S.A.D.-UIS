// Este hook es referenciado por el componente Sidebar de shadcn/ui.
// Debes crearlo en tu proyecto.
"use client"

import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768 // md breakpoint de Tailwind

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkDevice() // Check on mount

    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return isMobile
}
