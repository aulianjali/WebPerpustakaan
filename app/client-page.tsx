"use client"
import Header from "@/app/_components/landingpage/header"
import Carousel from "@/app/_components/landingpage/carousel"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-50">
      <Header />

      <main className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <Carousel />

          {/* Additional content sections can be added here */}
          <section className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Mengapa Kita Harus Sering ke Perpustakaan?</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl mb-4">📚</div>
                <h4 className="text-xl font-semibold mb-2">Koleksi Lengkap</h4>
                <p className="text-gray-600">Ribuan buku dari berbagai kategori dan penulis terbaik</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl mb-4">🌐</div>
                <h4 className="text-xl font-semibold mb-2">Akses 24/7</h4>
                <p className="text-gray-600">Baca kapan saja, pinjam dari mana saja</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="text-xl font-semibold mb-2">Temui Teman Baru</h4>
                <p className="text-gray-600">Temukan teman dengan hobby yang sama di perpustakaan</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
