"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselSlide {
  id: number
  title: string
  description: string
  image: string
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Cari, baca, dan pinjam buku favoritmu dengan mudah",
    description: "Semuanya dari manapun, kapan saja",
    image: "/library.png",
  },
  {
    id: 2,
    title: "Buku adalah jendela dunia",
    description: "Buka wawasanmu dengan ribuan koleksi buku terbaik",
    image: "/library.png",
  },
  {
    id: 3,
    title: "Membaca adalah investasi terbaik",
    description: "Tingkatkan pengetahuan dan keterampilan melalui membaca",
    image: "/library.png",
  },
  {
    id: 4,
    title: "Perpustakaan digital masa depan",
    description: "Akses jutaan buku dari genggaman tanganmu",
    image: "/library.png",
  },
  {
    id: 5,
    title: "Jadilah bagian komunitas pembaca",
    description: "Bergabunglah dengan ribuan pecinta buku lainnya",
    image: "/library.png",
  },
]

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Auto-rotate every 4 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-2sm">
        <div className="relative h-80 md:h-96">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center justify-between h-full p-8 md:p-12">
                <div className="flex-1 text-white space-y-4">
                  <h2 className="text-2xl md:text-4xl font-bold leading-tight">{slide.title}</h2>
                  <p className="text-lg md:text-xl text-blue-100">{slide.description}</p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <div className="w-64 h-64 md:w-80 md:h-80">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt="Library illustration"
                      width={320}
                      height={320}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
