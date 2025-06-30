import type { ReactNode } from "react"
import { Sidebarmember } from "@/app/_components/sidebar"
import { Inter } from "next/font/google"
import { Toaster } from "@/app/_components/sonner"

const inter = Inter({ subsets: ["latin"] })

export default function memberLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`relative h-screen overflow-hidden ${inter.className}`}>
      <div className="fixed top-0 left-0 h-full w-[270px] z-50">
        <Sidebarmember />
      </div>

      <main className="h-full overflow-y-auto pl-[285px] bg-[#D9DBF3] text-[#0E4D97] p-6">{children}</main>

      {/* Tambahkan Toaster di sini */}
      <Toaster expand={true} visibleToasts={5} />
    </div>
  )
}
