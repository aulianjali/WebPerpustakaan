// app/layout.tsx
import "@/app/globals.css";
import { ReactNode } from "react";
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
        {children}
      </body>
    </html>
  );
}
