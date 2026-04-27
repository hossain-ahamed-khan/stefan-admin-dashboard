"use client"

import * as React from "react"
import {
  Database,
  Search,
  Package,
  Settings,
  LayoutGrid,
  Star,
  Users,
  LogOut,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import mainLogo from "@/public/main-logo.png"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutGrid,
      isActive: true,
    },
    {
      title: "User",
      url: "/user",
      icon: Users,
    },
    {
      title: "Influencers",
      url: "/influencers",
      icon: Star,
    },
    {
      title: "Internal products",
      url: "/internal-products",
      icon: Database,
    },
    {
      title: "Dupe finder",
      url: "/dupe-finder",
      icon: Search,
    },
    {
      title: "Routine products",
      url: "/routine-products",
      icon: Package,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      {state !== "collapsed" && (
        <SidebarHeader className="-mb-12">
          <Link href="/" className="mx-auto inline-flex">
            <Image
              src={mainLogo}
              alt="SkinSeek"
              width={180}
              height={40}
              className="h-auto w-45 object-cover"
              priority
            />
          </Link>
        </SidebarHeader>
      )}
      <SidebarContent className="pt-5">
        <NavMain items={data.navMain} />
      </SidebarContent>
      {state !== "collapsed" && (
        <SidebarFooter className="border-t border-[#e0e0e0] p-3">
          <button
            type="button"
            className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-semibold text-[#f03a3a] transition-colors hover:bg-[#fceaea]"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
