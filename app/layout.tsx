// app/layout.tsx
import "@/app/globals.css"; // pastikan ini sesuai path
import { ReactNode } from "react";
import { Sidebar } from "@/app/_components/sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aplikasi Perpustakaan",
  description: "Sistem Peminjaman Buku Online",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={`bg-[#D9DBF3] text-[#0E4D97] ${inter.className}`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
