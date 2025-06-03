"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  PlusCircle,
  BookOpenCheck,
  Settings,
  PanelLeft,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar" // [^2]
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile" // Asumimos que este hook existe
import React from "react"
import { useSidebar } from "@/components/ui/sidebar"

const navItems = [
  { href: "#overview", label: "Resumen", icon: LayoutDashboard },
  { href: "#evaluations", label: "Evaluaciones", icon: FileText },
  { href: "#comparison", label: "Comparativa", icon: Users },
  { href: "#alerts", label: "Alertas", icon: AlertTriangle },
  { href: "#create-form", label: "Crear Formulario", icon: PlusCircle },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile() // Hook para detectar si es vista móvil

  // Para SidebarProvider, necesitamos leer la cookie en el servidor para el defaultOpen
  // Esto es un ejemplo simplificado para el lado del cliente.
  // En una app real, pasarías defaultOpen desde un Server Component que lea cookies.
  const [defaultOpen, setDefaultOpen] = React.useState(true)
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sidebar:state="))
        ?.split("=")[1]
      setDefaultOpen(cookieValue === "true")
    }
  }, [])

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar collapsible="icon" className="border-r transition-all duration-300 ease-in-out">
          <SidebarHeader className="p-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BookOpenCheck className="h-6 w-6 text-primary transition-transform group-data-[state=collapsed]:scale-110" />
              <span className="group-data-[state=collapsed]:hidden transition-opacity duration-300">EvalDocente</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="flex-grow">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 transition-colors duration-200"
                    tooltip={item.label}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[state=collapsed]:hidden transition-opacity duration-300">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="hover:bg-primary/10 transition-colors duration-200"
                  tooltip="Configuración"
                >
                  <Settings className="h-5 w-5" />
                  <span className="group-data-[state=collapsed]:hidden transition-opacity duration-300">
                    Configuración
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
            {!isMobile && <SidebarTrigger className="transition-transform hover:scale-110" />}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  // Lógica para abrir/cerrar sidebar en móvil usando useSidebar o similar
                  // Esto requiere que SidebarProvider envuelva esta lógica o que se pase setOpenMobile
                  const { toggleSidebar } = useSidebar() // Asumiendo que useSidebar está disponible aquí
                  if (toggleSidebar) toggleSidebar()
                }}
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            )}
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard de Evaluación Docente</h1>
            <div className="ml-auto flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full transition-transform hover:scale-110">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
