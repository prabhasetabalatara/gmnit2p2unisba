"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Newspaper,
  FolderOpen,
  Images,
  Bell,
  FileText,
  Download,
  Play,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";

// ====== Types ======
interface HeroSlide { id: number; title: string; subtitle?: string | null; image: string; created_at?: string; }
interface Agenda { id: number; judul: string; deskripsi?: string | null; lokasi?: string | null; tanggal_mulai: string; tanggal_selesai: string; poster_url?: string | null; }
interface Berita { id: number; judul: string; isi: string; tanggal?: string | null; link?: string[] | null; }
interface Pengumuman { id: number; judul: string; isi: string; tanggal?: string | null; link?: string[] | null; }
interface Kajian { id: number; judul: string; isi: string; tanggal?: string | null; link?: string[] | null; link_download?: string | null }
interface Arsip { id: number; judul: string; deskripsi?: string | null; tanggal: string; file_url: string; cover_url?: string | null }
interface Galeri { id: number; nama: string; link_drive: string; tipe?: string | null; created_at?: string | null; cover_url?: string | null }
interface Pendaftaran { id: number; judul: string; deskripsi?: string | null; link_form?: string | null; cover_url?: string | null; kegiatan_url?: string[] | null }

// ====== Utils ======
const fmtDate = (d?: string | null) => {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }); } catch { return ""; }
};
const excerpt = (html: string, n = 140) => {
  const txt = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return txt.length > n ? txt.slice(0, n).trimEnd() + "…" : txt;
};

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

const glowVariants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(239, 68, 68, 0.3)",
      "0 0 40px rgba(239, 68, 68, 0.5)",
      "0 0 20px rgba(239, 68, 68, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const, // Explicitly type ease as a valid easing value
    },
  },
};

export default function HomePage() {
  // Data states
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentHero, setCurrentHero] = useState(0);
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [berita, setBerita] = useState<Berita[]>([]);
  const [pengumuman, setPengumuman] = useState<Pengumuman[]>([]);
  const [kajian, setKajian] = useState<Kajian[]>([]);
  const [arsip, setArsip] = useState<Arsip[]>([]);
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [daftar, setDaftar] = useState<Pendaftaran | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fetch all sections in parallel
  useEffect(() => {
    const load = async () => {
      try {
        const [heroRes, agendaRes, beritaRes, pengumumanRes, kajianRes, arsipRes, galeriRes, daftarRes] = await Promise.all([
          supabase.from("hero_slides").select("*").order("created_at", { ascending: false }).limit(6),
          supabase.from("agenda_kegiatan").select("*").gte("tanggal_mulai", new Date().toISOString()).order("tanggal_mulai", { ascending: true }).limit(4),
          supabase.from("berita").select("*").order("tanggal", { ascending: false }).limit(3),
          supabase.from("pengumuman").select("*").order("tanggal", { ascending: false }).limit(5),
          supabase.from("kajian").select("*").order("tanggal", { ascending: false }).limit(2),
          supabase.from("arsip").select("*").order("tanggal", { ascending: false }).limit(2),
          supabase.from("galeri").select("*").order("created_at", { ascending: false }).limit(8),
          supabase.from("pendaftaran_gmni").select("*").order("created_at", { ascending: false }).limit(1).maybeSingle(),
        ]);

        setSlides((heroRes.data as HeroSlide[]) || []);
        setAgenda((agendaRes.data as Agenda[]) || []);
        setBerita((beritaRes.data as Berita[]) || []);
        setPengumuman((pengumumanRes.data as Pengumuman[]) || []);
        setKajian((kajianRes.data as Kajian[]) || []);
        setArsip((arsipRes.data as Arsip[]) || []);
        setGaleri((galeriRes.data as Galeri[]) || []);
        setDaftar((daftarRes.data as Pendaftaran) || null);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // Auto-advance hero
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCurrentHero((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  const hero = slides[currentHero];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-700 to-red-900 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-500/20 blur-3xl"
        />
        
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-20 h-20 border-4 border-white/30 border-t-white border-r-yellow-300 rounded-full mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              y: [20, 0, 20]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white text-xl font-semibold tracking-wide"
          >
            Memuat...
          </motion.p>
          <motion.div
            animate={{ 
              width: ["0%", "100%", "0%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent mt-4 max-w-xs mx-auto rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* ====== HERO ====== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Enhanced background with parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
              rgba(220, 38, 38, 0.9) 0%, 
              rgba(185, 28, 28, 0.95) 30%, 
              rgba(127, 29, 29, 1) 100%)`
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Enhanced floating elements */}
          <motion.div
            animate={{ 
              x: [0, 100 + mousePosition.x * 20, -50 + mousePosition.x * 15, 0], 
              y: [0, -80 + mousePosition.y * 25, 60 + mousePosition.y * 10, 0],
              rotate: [0, 180, 270, 360],
              scale: [1, 1.3, 0.8, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              x: [0, -150 + mousePosition.x * 30, 80 + mousePosition.x * 20, 0], 
              y: [0, 120 + mousePosition.y * 35, -90 + mousePosition.y * 25, 0],
              rotate: [360, 180, 90, 0],
              scale: [1, 0.7, 1.4, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-tl from-white/15 to-red-300/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              x: [0, 60 + mousePosition.x * 25, -30 + mousePosition.x * 15, 0], 
              y: [0, 90 + mousePosition.y * 20, -60 + mousePosition.y * 30, 0],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 0.9, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-red-400/25 to-pink-500/25 rounded-full blur-lg"
          />
        </motion.div>

        {/* Hero image with parallax */}
        {hero?.image && (
          <motion.div
            className="absolute inset-0"
            style={{
              transform: `translate3d(${mousePosition.x * 5}px, ${mousePosition.y * 5}px, 0)`
            }}
          >
            <Image 
              src={hero.image} 
              alt={hero.title} 
              fill 
              className="object-cover opacity-50 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-red-800/40" />
          </motion.div>
        )}

        {/* Foreground content with enhanced animations */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)",
                borderColor: "rgba(251, 191, 36, 0.5)"
              }}
              variants={glowVariants}
              animate="animate"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
              <span className="text-yellow-100 text-sm font-medium tracking-wide">Sorotan Kegiatan Terbaru</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 60 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
            style={{
              textShadow: "0 0 40px rgba(255, 255, 255, 0.3)",
            }}
          >
            {hero?.title || "Gerak Bersama untuk Rakyat"}
          </motion.h1>
          
          {hero?.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 80 }}
              className="mt-6 text-xl sm:text-2xl text-red-100 max-w-4xl mx-auto leading-relaxed font-light"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)" }}
            >
              {hero.subtitle}
            </motion.p>
          )}

          {/* Enhanced hero controls */}
          {slides.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-4"
            >
              {slides.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentHero(i)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative h-3 rounded-full transition-all duration-500 overflow-hidden ${
                    i === currentHero 
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 w-12 shadow-lg shadow-yellow-400/50" 
                      : "bg-white/60 hover:bg-white/80 w-6"
                  }`}
                >
                  {i === currentHero && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400"
                      layoutId="activeSlide"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Enhanced Prev/Next buttons */}
        {slides.length > 1 && (
          <>
            <motion.button
              onClick={() => setCurrentHero((p) => (p - 1 + slides.length) % slides.length)}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white rounded-full p-4 border border-white/20 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              onClick={() => setCurrentHero((p) => (p + 1) % slides.length)}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white rounded-full p-4 border border-white/20 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ====== ENHANCED PENGUMUMAN TICKER ====== */}
      {pengumuman.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 border-y border-red-100 relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-red-100/50 via-transparent to-red-100/50"
            style={{ backgroundSize: "200% 100%" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bell className="w-6 h-6 text-red-600" />
            </motion.div>
            <div className="overflow-hidden whitespace-nowrap flex-1 relative">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                {pengumuman.map((p, i) => (
                  <span key={p.id} className="mr-12 text-sm text-red-800 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <strong className="text-red-900">{fmtDate(p.tanggal)}:</strong>
                      <span className="hover:text-red-600 transition-colors">{p.judul}</span>
                    </span>
                    {i < pengumuman.length - 1 && <span className="mx-4 text-red-400">•</span>}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ====== ENHANCED AGENDA ====== */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-100 to-orange-100 rounded-full blur-3xl opacity-30"
        />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-full px-6 py-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="w-6 h-6 text-red-600" />
              <span className="text-red-800 font-semibold">Agenda Mendatang</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent mb-4">
              Kegiatan Terdekat
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Jangan lewatkan agenda-agenda menarik yang telah kami persiapkan khusus untuk Anda
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {agenda.map((a, index) => (
              <motion.div 
                key={a.id} 
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="group rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-red-100 to-orange-100 overflow-hidden">
                  {a.poster_url && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="cursor-pointer h-full"
                      onClick={() => a.poster_url && setPreviewImage(a.poster_url)}
                    >
                      <Image
                        src={a.poster_url}
                        alt={a.judul}
                        fill
                        className="object-cover group-hover:brightness-110 transition-all duration-500"
                      />
                    </motion.div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Floating date badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs font-bold text-red-600"
                  >
                    {fmtDate(a.tanggal_mulai).split(' ')[0]}
                    <br />
                    <span className="text-gray-600">{fmtDate(a.tanggal_mulai).split(' ')[1]}</span>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg line-clamp-2 mb-3 group-hover:text-red-600 transition-colors">
                    {a.judul}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{fmtDate(a.tanggal_mulai)}</span>
                    </div>
                    {a.lokasi && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="line-clamp-1">{a.lokasi}</span>
                      </div>
                    )}
                  </div>
                  {a.deskripsi && (
                    <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                      {excerpt(a.deskripsi, 80)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== ENHANCED BERITA ====== */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-red-100 to-pink-100 rounded-full blur-3xl opacity-20"
        />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Newspaper className="w-6 h-6 text-blue-600" />
              <span className="text-blue-800 font-semibold">Berita Terkini</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent mb-4">
              Informasi Terbaru
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tetap terdepan dengan informasi dan berita terkini dari organisasi kami
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {berita.map((b, index) => (
              <Link href={`/berita/berita/${b.id}`} key={b.id}>
                <motion.article 
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  className="group rounded-3xl bg-white p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden cursor-pointer"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>TERBARU</span>
                    </motion.div>
                    
                    <h3 className="font-bold text-xl line-clamp-3 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                      {b.judul}
                    </h3>
                    <p className="text-gray-700 line-clamp-4 mb-6 leading-relaxed">
                      {excerpt(b.isi, 200)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{fmtDate(b.tanggal)}</span>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group/btn"
                      >
                        <span>Baca Selengkapnya</span>
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== ENHANCED KAJIAN & ARSIP ====== */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl"
        />
        
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent mb-4">
              Kajian & Arsip
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Koleksi kajian mendalam dan arsip berharga untuk memperkaya wawasan Anda
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Kajian */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl w-fit"
                whileHover={{ scale: 1.05 }}
              >
                <FileText className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-800">Kajian Terbaru</h3>
              </motion.div>
              
              <div className="space-y-6">
                {kajian.map((k, index) => (
                  <motion.div 
                    key={k.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)" 
                    }}
                    className="group rounded-2xl border border-gray-200 p-6 bg-white hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-lg line-clamp-2 group-hover:text-purple-600 transition-colors flex-1">
                        {k.judul}
                      </h4>
                      {k.link_download && (
                        <motion.a
                          href={k.link_download}
                          target="_blank"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-4 p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-xl transition-colors"
                        >
                          <Download className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{fmtDate(k.tanggal)}</span>
                    </div>
                    
                    <p className="text-gray-700 line-clamp-3 leading-relaxed">
                      {excerpt(k.isi, 180)}
                    </p>
                    
                    {k.link_download && (
                      <motion.a
                        href={k.link_download}
                        target="_blank"
                        whileHover={{ x: 5 }}
                        className="mt-4 inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors group/link"
                      >
                        <Download className="w-4 h-4 group-hover/link:-translate-y-1 transition-transform" />
                        <span>Unduh Kajian</span>
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Arsip */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl w-fit"
                whileHover={{ scale: 1.05 }}
              >
                <FolderOpen className="w-6 h-6 text-orange-600" />
                <h3 className="text-2xl font-bold text-orange-800">Arsip Terbaru</h3>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {arsip.map((ar, index) => (
                  <motion.div 
                    key={ar.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ 
                      y: -8, 
                      rotateY: 5,
                      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)" 
                    }}
                    className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                      {ar.cover_url && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="cursor-pointer h-full"
                          onClick={() => setPreviewImage(ar.cover_url!)}
                        >
                          <Image 
                            src={ar.cover_url} 
                            alt={ar.judul} 
                            fill 
                            className="object-cover group-hover:brightness-110 transition-all duration-500" 
                          />
                        </motion.div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Floating play button */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Play className="w-6 h-6 text-white fill-white" />
                      </motion.div>
                    </div>
                    
                    <div className="p-5">
                      <h4 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                        {ar.judul}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>{fmtDate(ar.tanggal)}</span>
                      </div>
                      {ar.deskripsi && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {excerpt(ar.deskripsi, 100)}
                        </p>
                      )}
                      <motion.a
                        href={ar.file_url}
                        target="_blank"
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:-translate-y-1 transition-transform" />
                        <span>Buka Dokumen</span>
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== ENHANCED GALERI ====== */}
      {galeri.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, -100, 50, 0],
              y: [0, 80, -60, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-bl from-green-200 to-blue-200 rounded-full blur-3xl opacity-20"
          />
          
          <div className="relative max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Images className="w-6 h-6 text-green-600" />
                <span className="text-green-800 font-semibold">Galeri Visual</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-800 to-blue-600 bg-clip-text text-transparent mb-4">
                Momen Berharga
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Dokumentasi visual dari berbagai kegiatan dan momen bersejarah organisasi kami
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {galeri.map((g, index) => (
                <motion.div
                  key={g.id}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    rotateY: 8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  className="group relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-200 cursor-pointer"
                  onClick={() => g.cover_url && setPreviewImage(g.cover_url)}
                >
                  {g.cover_url && (
                    <Image 
                      src={g.cover_url} 
                      alt={g.nama} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  )}
                  
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Floating elements */}
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 }}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Images className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-3 left-3 right-3 text-white"
                  >
                    <h4 className="font-bold text-sm line-clamp-2 mb-1 drop-shadow-lg">
                      {g.nama}
                    </h4>
                    {g.created_at && (
                      <p className="text-xs text-gray-200 drop-shadow">
                        {fmtDate(g.created_at)}
                      </p>
                    )}
                  </motion.div>

                  {/* Hover shine effect */}
                  <motion.div
                    initial={{ x: "-100%", skewX: -20 }}
                    whileHover={{ x: "100%", skewX: -20 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ====== ENHANCED CTA PENDAFTARAN ====== */}
      {daftar && (
        <section className="py-24 relative overflow-hidden">
          {/* Animated background */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
                "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #7f1d1d 100%)",
                "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
          
          {/* Enhanced floating elements */}
          <motion.div
            animate={{ 
              x: [0, 120, -80, 0], 
              y: [0, -100, 80, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.4, 0.8, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              x: [0, -150, 100, 0], 
              y: [0, 120, -90, 0],
              rotate: [360, 180, 0],
              scale: [1, 0.7, 1.3, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-tl from-white/20 to-red-300/25 rounded-full blur-3xl"
          />
          
          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-flex items-center gap-3 bg-yellow-400/20 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-yellow-300/30"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-yellow-100 font-semibold">Bergabung Sekarang</span>
              </motion.div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent leading-tight"
              style={{ textShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }}
            >
              {daftar.judul}
            </motion.h2>
            
            {daftar.deskripsi && (
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-red-100 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                {daftar.deskripsi}
              </motion.p>
            )}
            
            {daftar.link_form && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.a
                  href={daftar.link_form}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={glowVariants}
                  animate="animate"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-red-800 font-black text-lg rounded-2xl shadow-2xl transition-all duration-300 border-2 border-yellow-300/50 group"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="group-hover:pause"
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                  <span>Mulai Pendaftaran</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ====== ENHANCED MODAL PREVIEW GAMBAR ====== */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateY: -90 }}
              transition={{ 
                duration: 0.4, 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={previewImage} 
                alt="Preview" 
                fill 
                className="object-contain rounded-2xl" 
              />
              
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              {/* Image info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white"
              >
                <p className="text-sm opacity-80">Klik di luar gambar atau tombol × untuk menutup</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}