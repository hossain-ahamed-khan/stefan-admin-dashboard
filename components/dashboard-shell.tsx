"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import image from "@/public/images/avatar-admin.png"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import RequireAuth from "./RequireAuth/RequireAuth"
import { getUserProfile } from "@/apis/authApis"

type DashboardShellProps = {
  section: string
  children: ReactNode
}

export function DashboardShell({ section, children }: DashboardShellProps) {
  const {userProfileData } = getUserProfile();
  console.log("userProfileData:", userProfileData);
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
    <RequireAuth tokenKey="authToken" redirectTo="/admin-login">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200 bg-[#faf8f5] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink className="font-geist-mono text-[#323438] text-xl font-bold leading-7" href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-geist-mono text-[#1F2937] text-xl font-bold leading-7">{routeSection}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center px-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-md leading-tight font-semibold text-slate-700">{userProfileData?.full_name || "Admin"}</p>
                  <p className="text-sm leading-tight font-normal text-slate-500">{userProfileData?.email || ""}</p>
                </div>
                <Image
                  src={userProfileData?.profile_image || image}
                  alt={userProfileData?.full_name || "Admin"}
                  width={480}
                  height={480}
                  className="size-16 shrink-0 rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  )
}