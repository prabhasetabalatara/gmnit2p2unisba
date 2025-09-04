"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { 
  X, 
  ExternalLink, 
  Users, 
  Heart, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Award,
  Target
} from "lucide-react";

type Pendaftaran = {
  id: number;
  judul: string;
  deskripsi: string;
  link_form: string;
  cover_url: string;
  kegiatan_url: string[];
  created_at: string;
};

export default function GabungPage() {
  const [data, setData] = useState<Pendaftaran | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("pendaftaran_gmni")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    if (data?.kegiatan_url) {
      setCurrentSlide((prev) => 
        prev === data.kegiatan_url.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (data?.kegiatan_url) {
      setCurrentSlide((prev) => 
        prev === 0 ? data.kegiatan_url.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-4 text-white text-xl font-semibold"
        >
          Memuat informasi pendaftaran...
        </motion.p>
      </div>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16 sm:pt-20">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Belum Ada Pendaftaran Aktif
            </h2>
            <p className="text-gray-600">
              Silakan kembali lagi nanti atau hubungi admin GMNI
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-700">
          <div className="absolute inset-0 bg-black/20" />
          {/* Floating shapes */}
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              x: [0, -150, 0],
              y: [0, 100, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-100 font-medium">Pendaftaran Terbuka</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              {data.judul}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-red-100 leading-relaxed mb-12"
          >
            {data.deskripsi}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href={data.link_form}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-800 font-bold rounded-2xl shadow-2xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <ExternalLink className="w-5 h-5" />
              <span className="text-lg">Daftar Sekarang</span>
            </motion.a>

            <motion.button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              Pelajari Lebih Lanjut
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* About GMNI Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-6">
                <Heart className="w-4 h-4" />
                <span className="font-medium">Tentang Organisasi</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Sekilas Tentang{" "}
                <span className="text-red-600">GMNI</span>
              </h2>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  GMNI adalah organisasi mahasiswa yang memperjuangkan keadilan dan
                  kepentingan rakyat kecil berdasarkan semangat Marhaenisme dan cinta
                  tanah air.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Misi Sosial</h4>
                      <p className="text-sm text-gray-600">Memperjuangkan keadilan sosial dan kemakmuran rakyat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Prestasi</h4>
                      <p className="text-sm text-gray-600">Organisasi mahasiswa bersejarah dengan dedikasi tinggi</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <div
                  className="relative aspect-[4/5] w-full max-w-md mx-auto cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                  onClick={() => setSelectedImage(data.cover_url)}
                >
                  <Image
                    src={data.cover_url}
                    alt="Poster GMNI"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5 text-red-600" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-6">
              <Users className="w-4 h-4" />
              <span className="font-medium">Kegiatan Kami</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Mari Gabung Bersama Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bergabunglah dalam berbagai kegiatan yang bermakna dan membangun karakter kepemimpinan
            </p>
          </motion.div>

          {data.kegiatan_url && data.kegiatan_url.length > 0 && (
            <>
              {/* Featured Slider */}
              <div className="relative mb-12">
                <div className="relative aspect-[21/9] w-full max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setSelectedImage(data.kegiatan_url[currentSlide])}
                    >
                      <Image
                        src={data.kegiatan_url[currentSlide]}
                        alt={`Kegiatan ${currentSlide + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                          Kegiatan GMNI
                        </div>
                        <h3 className="text-xl font-bold">Dokumentasi Kegiatan {currentSlide + 1}</h3>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  {data.kegiatan_url.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 group"
                      >
                        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 group"
                      >
                        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 right-6 flex gap-2">
                        {data.kegiatan_url.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentSlide
                                ? 'bg-white scale-110'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.kegiatan_url.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-lg group ${
                      i === currentSlide ? 'ring-4 ring-red-500' : ''
                    }`}
                    onClick={() => {
                      setCurrentSlide(i);
                      setSelectedImage(img);
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Kegiatan ${i + 1}`}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <ExternalLink className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Siap Bergabung dengan GMNI?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari gerakan mahasiswa yang memperjuangkan keadilan dan kepentingan rakyat
            </p>
            
            <motion.a
              href={data.link_form}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold rounded-2xl shadow-2xl transition-all duration-300 text-lg"
            >
              <ExternalLink className="w-6 h-6" />
              Mulai Pendaftaran
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Preview"
                  fill
                  className="object-contain rounded-2xl shadow-2xl"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}