"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang",
    children: [
      { label: "Sejarah GMNI", href: "/tentang/sejarah" },
      { label: "Visi & Misi", href: "/tentang/visi-misi" },
      { label: "Struktur Organisasi", href: "/tentang/struktur" },
    ],
  },
  {
    label: "Berita",
    children: [
      { label: "Berita", href: "/berita/berita" },
      { label: "Pengumuman", href: "/berita/pengumuman" },
      { label: "Kajian", href: "/berita/kajian" },
      { label: "Agenda", href: "/berita/agenda" },
      { label: "Kalender", href: "/berita/kalender" },      
    ],
  },
  {
    label: "Perpus & Galeri",
    children: [
      { label: "Perpus", href: "https://perpusgratis.great-site.net/" },
      { label: "Arsip", href: "/perpusgaleri/arsip" },
      { label: "Galeri", href: "/perpusgaleri/galeri" },      
    ],
  },
  {
    label: "Hubungi",
    children: [
      { label: "Kontak", href: "/hubungi/kontak" },
      { label: "Aspirasi", href: "/hubungi/aspirasi" },
      { label: "Gabung", href: "/hubungi/gabung" },    
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  const logoUrl =
    "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/logo/logogmni.png";

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-md text-white shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Nama */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logoUrl}
            alt="GMNI"
            width={48}
            height={48}
            className="rounded-full transition-transform group-hover:scale-110"
          />
          <span className="font-bold text-xl text-red-500 tracking-tight group-hover:text-red-400 transition-colors">
            GMNI T2P2 UNISBA BLITAR
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, i) => (
            <div key={i} className="relative group">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setDropdown(dropdown === item.label ? null : item.label)
                    }
                    className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide hover:text-red-400 transition-colors duration-300"
                  >
                    {item.label}
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 bg-gray-800 text-white rounded-lg shadow-xl mt-3 w-48 border border-gray-700"
                      >
                        {item.children.map((child, ci) => (
                          <Link
                            key={ci}
                            href={child.href}
                            className="block px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-lg"
                            onClick={() => setDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-semibold uppercase tracking-wide hover:text-red-400 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900 text-white px-6 py-6 space-y-4 shadow-lg"
          >
            {navItems.map((item, i) => (
              <div key={i}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer py-3 text-sm font-semibold uppercase tracking-wide hover:text-red-400 transition-colors">
                      {item.label}
                      <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child, ci) => (
                        <Link
                          key={ci}
                          href={child.href}
                          className="block py-2 text-sm hover:text-red-400 transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-sm font-semibold uppercase tracking-wide hover:text-red-400 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}