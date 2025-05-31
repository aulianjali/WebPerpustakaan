import { ReactNode } from "react";
import { SidebarAnggota } from "@/app/_components/sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AnggotaLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex h-screen overflow-hidden ${inter.className}`}>
      <SidebarAnggota />
      <main className="flex-1 overflow-y-auto p-6 bg-[#D9DBF3] text-[#0E4D97]">
        {children}
      </main>
    </div>
  );
}
