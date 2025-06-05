import { ReactNode } from "react";
import { SidebarAnggota } from "@/app/_components/sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AnggotaLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`relative h-screen overflow-hidden ${inter.className}`}>
      <div className="fixed top-0 left-0 h-full w-[270px] z-50">
        <SidebarAnggota />
      </div>

      <main className="h-full overflow-y-auto pl-[285px] bg-[#D9DBF3] text-[#0E4D97] p-6">
        {children}
      </main>
    </div>
  );
}
