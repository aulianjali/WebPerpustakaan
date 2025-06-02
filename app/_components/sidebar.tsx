"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  icon: string;
  path: string;
};

type Role = "anggota" | "admin" | "pustakawan";

const menuAnggota: MenuItem[] = [
  { label: "Home", icon: "/home.png", path: "/anggota" },
  { label: "Konfirmasi", icon: "/confirm.png", path: "/anggota/konfirmasi" },
  { label: "Riwayat", icon: "/file.png", path: "/anggota/riwayat" },
];

const menuAdmin: MenuItem[] = [
  { label: "Home", icon: "/home.png", path: "/admin" },
  { label: "Manajemen User", icon: "/profile.png", path: "/admin/users" },
  { label: "Manajemen Buku", icon: "/settings.png", path: "/admin/buku" },
];

const menuPustakawan: MenuItem[] = [
  { label: "Home", icon: "/home.png", path: "/pustakawan/home" },
  { label: "Ubah Status", icon: "/edit.png", path: "/pustakawan/ubahstatus" },

];

// Fungsi khusus berdasarkan role
export function SidebarAnggota() {
  return <Sidebar menu={menuAnggota} />;
}

export function SidebarAdmin() {
  return <Sidebar menu={menuAdmin} />;
}

export function SidebarPustakawan() {
  return <Sidebar menu={menuPustakawan} />;
}

// Komponen Sidebar Umum
function Sidebar({ menu }: { menu: MenuItem[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <aside className="w-[270px] bg-[#0E4D97] text-white p-4 flex flex-col pt-8 justify-between min-h-screen">
      <div>
        <div className="flex justify-center mb-4">
          <Image src="/globe.svg" alt="Logo" width={80} height={80} className="rounded-full bg-white p-2" />
        </div>

        <div className="flex flex-col gap-2">
          {menu.map((item) => (
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
      </div>

      <div
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded cursor-pointer transition hover:bg-[#1E5CA9]"
      >
        <Image src="/logout.png" alt="Logout" width={20} height={20} />
        <span className="ml-2">Logout</span>
      </div>
    </aside>
  );
}
