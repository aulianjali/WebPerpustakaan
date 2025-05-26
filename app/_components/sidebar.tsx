// app/_components/Sidebar.tsx
"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const menuItems = [
  { label: "Home", icon: "/home.png", path: "/anggota" },
  { label: "Konfirmasi", icon: "/confirm.png", path: "/anggota/konfirmasi" },
  { label: "Riwayat", icon: "/file.png", path: "/anggota/riwayat" },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-[270px] bg-[#0E4D97] text-white p-4 flex flex-col gap-6 pt-8">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={80}
          height={80}
          className="rounded-full bg-white p-2"
        />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition 
              ${pathname === item.path ? "bg-[#1E5CA9]" : "hover:bg-[#1E5CA9]"}`}
          >
            <Image src={item.icon} alt={item.label} width={20} height={20} />
            <span className="ml-2">{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
