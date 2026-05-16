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
import mainLogo from "@/public/images/main-logo.png"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { authLogout } from "@/apis/authApis"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

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
  const [loading, setLoading] = React.useState(false);
  const route = useRouter();


  const handleLogout = async () => {
    setLoading(true);

    try {
      await authLogout();

      Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => {
        route.push('/admin-login');
      });;

    } catch (error) {
      // Show error SweetAlert if logout fails
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while logging out.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setLoading(false);
    }
  };

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
              className="h-auto w-auto object-cover"
              priority
            />
          </Link>
        </SidebarHeader>
      )}
      <SidebarContent className="pt-5">
        <NavMain items={data.navMain} />
      </SidebarContent>
      {state !== "collapsed" && (
        <SidebarFooter className="border-t border-[#e0e0e0] p-3 mb-3">
          
          <Button disabled={loading} onClick={handleLogout} className="cursor-pointer bg-[#00000000] text-[#DC2626] text-[18px] w-full hover:bg-[#f3f4f5] rounded-4xl flex justify-center items-center gap-4 py-2 mt-4 ">
             <LogOut className="size-5" />
            {loading ? 'Logging Out...' : 'Logout'}
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
