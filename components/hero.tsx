"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "GMNI T2P2 UNISBA Blitar",
    subtitle: "Gerakan Mahasiswa Nasional Indonesia",
    image: "/hero1.jpg",
  },
  {
    id: 2,
    title: "Perpustakaan Digital",
    subtitle: "Akses ribuan bacaan untuk kader progresif",
    image: "/hero2.jpg",
  },
  {
    id: 3,
    title: "Agenda & Aksi",
    subtitle: "Ikuti kegiatan terbaru GMNI",
    image: "/hero3.jpg",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  // Auto slide setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-6">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              {slides[current].title}
            </h1>
            <p className="mt-4 text-lg md:text-2xl drop-shadow-md">
              {slides[current].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Tombol Navigasi */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
