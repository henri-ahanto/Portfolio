import { Sidebar } from '@/ui/components/Dashboard/Sidebar/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060517] text-white flex">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
