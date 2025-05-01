import Image from "next/image";
import Link from "next/link";

export default function DetailBuku() {
  return (
    <div className="min-h-screen bg-[#E9EAFD] p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-8 flex gap-8 w-full max-w-6xl">
        {/* Gambar buku + tombol */}
        <div className="flex flex-col items-center">
            {/* Gambar dibungkus agar ukuran konsisten */}
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


        {/* Detail buku */}
        <div className="text-[#0E4D97] text-sm leading-relaxed max-w-4xl">
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
    </div>
  );
}
