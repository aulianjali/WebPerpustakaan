import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const judulBuku = [
    "The Psychology of Money",
    "Laut Bercerita",
    "Hujan",
    "Bulan",
    "Bintang",
    "Ceros dan Batozar",
    "Dunia Sophie",
    "Filosofi Teras",
    "Obat Dungu Resep Akal Sehat",
    "3726 MDPL",
    "Teruslah Bodoh Jangan Pintar",
    "Emotional Intelligence",
  ];

  return (
    <div className="flex h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-hidden">
      {/* sidebar */}
      <aside className="w-[270px] bg-[#0E4D97] text-white p-4 flex flex-col gap-6 pt-8">
        {/* logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/globe.svg"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full bg-white p-2"
          />
        </div>

        {/* menu */}
        <div className="flex flex-col gap-2">
          <SidebarItem label="Home" icon="/home.png" />
          <SidebarItem label="Konfirmasi" icon="/confirm.png" />
          <SidebarItem label="Riwayat" icon="/file.png" />
        </div>
      </aside>

      {/* konten */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-[#0E4D97]">Halo! Manusia</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Pencarian"
              className="pl-10 pr-4 py-2 rounded shadow-sm bg-[#FEFCF3] border border-[#9FA8C2] focus:outline-none focus:ring-1 focus:ring-[#094B9B]"
            />
            <span className="absolute left-3 top-2.5">
              <img src="/search.png" alt="search icon" className="w-5 h-5" />
            </span>

          </div>
        </div>

        {/* grid buku */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-16">
          {judulBuku.map((judul, i) => (
            <Link key={i} href={`/buku/${i + 1}`}>
              <div className="relative w-[150px] h-[220px] group cursor-pointer">
                <Image
                  src={`/books/book-${i + 1}.jpg`}
                  alt={judul}
                  fill
                  className="rounded shadow-md object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                  <span className="text-white text-sm font-semibold text-center px-2">
                    {judul}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#1E5CA9] transition cursor-pointer">
      <Image src={icon} alt="" width={20} height={20} />
      <span className="ml-2">{label}</span>
    </div>
  );
}
