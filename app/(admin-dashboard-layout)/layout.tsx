import { DashboardShell } from '@/components/dashboard-shell'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
     <DashboardShell section="Home">{children}</DashboardShell>
  )
}
