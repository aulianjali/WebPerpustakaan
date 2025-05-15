import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function DetailBuku() {
  return (
    <div className="flex h-screen bg-[#D9DBF3] text-[#0E4D97] overflow-hidden">
      
      {/* Sidebar */}
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
          <SidebarItem label="Home" icon="/home.png" />
          <SidebarItem label="Konfirmasi" icon="/confirm.png" />
          <SidebarItem label="Riwayat" icon="/file.png" />
        </div>
      </aside>

      {/* Konten */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-8 flex gap-8 relative">
          
          {/* Gambar buku + tombol */}
          <div className="flex flex-col items-center">
            <div className="w-[200px] h-[280px] bg-white rounded shadow overflow-hidden flex items-center justify-center">
              <Image
                src="/books/book-1.jpg"
                alt="The Psychology of Money"
                width={200}
                height={280}
                className="object-contain"
              />
            </div>

            {/* Status & Tombol */}
            <div className="flex gap-3 mt-4">
              <span className="bg-[#22D025] text-white text-sm px-5 py-2 rounded font-semibold">
                Tersedia
              </span>
              <button className="bg-[#0E4D97] text-white text-sm px-5 py-1 rounded shadow hover:bg-[#0A3A6F] transition">
                Pinjam
              </button>
            </div>
          </div>

          {/* Detail Buku */}
          <div className="text-[#0E4D97] text-sm leading-relaxed max-w-4xl pr-12">
            <p className="mb-1">
              <strong>Judul :</strong> The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness
            </p>
            <p className="mb-1"><strong>Penulis :</strong> Morgan Housel</p>
            <p className="mb-1"><strong>Penerbit :</strong> Harriman House</p>
            <p className="mb-1"><strong>Tahun Terbit :</strong> 2020</p>
            <p className="mt-3 mb-1"><strong>Sinopsis :</strong></p>
            <p className="text-justify">
              The Psychology of Money mengeksplorasi bagaimana perilaku manusia memengaruhi 
              keputusan finansial lebih dari sekadar angka atau teori ekonomi. Melalui 19 esai pendek, 
              Morgan Housel menyoroti bahwa kesuksesan finansial lebih ditentukan oleh perilaku seperti kesabaran, 
              pengendalian diri, dan pemahaman akan risiko, dibandingkan dengan kecerdasan atau pengetahuan teknis semata.
              Buku ini menekankan bahwa pengalaman pribadi sangat memengaruhi cara seseorang memandang uang. 
              Housel juga membahas peran keberuntungan dan risiko dalam pencapaian finansial, 
              serta pentingnya memiliki tujuan yang masuk akal dan tidak terjebak dalam 
              keinginan yang tak pernah puas. Dengan gaya penulisan yang ringan dan penuh cerita, 
              buku ini memberikan wawasan mendalam tentang hubungan antara uang dan perilaku manusia.
            </p>

            {/* Tombol kembali */}
            <Link href="/" className="absolute bottom-4 right-4" title="Kembali ke halaman utama">
              <Image
                src="/undo.png"
                width={40}
                height={40}
                alt="kembali"
              />
            </Link>
          </div>
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
