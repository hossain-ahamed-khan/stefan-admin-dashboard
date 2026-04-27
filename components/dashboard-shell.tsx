"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type DashboardShellProps = {
  section: string
  children: ReactNode
}

export function DashboardShell({ section, children }: DashboardShellProps) {
  const pathname = usePathname()

  const routeSegment = pathname
    .split("/")
    .filter(Boolean)
    .pop()

  const routeSection = routeSegment
    ? routeSegment
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
    : section

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200 bg-[#faf8f5] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{routeSection}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center px-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-md leading-tight font-semibold text-slate-700">Alex Johnson</p>
                <p className="text-sm leading-tight font-normal text-slate-500">Super admin</p>
              </div>
              <Image
                src="/avatar-admin.svg"
                alt="Alex Johnson"
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}