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
      { label: "Struktur Organisasi", href: "/pengembangan" },
    ],
  },
  {
    label: "Agenda",
    children: [
      { label: "Agenda", href: "/pengembangan" },
      { label: "Kalender", href: "/pengembangan" },
    ], 
 },
  {
    label: "Perpustakaan Digital",
    children: [
      { label: "Buku", href: "https://perpusgratis.great-site.net/" },
      { label: "Multimedia", href: "/pengembangan" },
      { label: "Dokumen", href: "/pengembangan" },      
    ],
  },
  {
    label: "Berita",
    children: [
      { label: "Berita", href: "/berita/berita" },
      { label: "Pengumuman", href: "/pengembangan" },
      { label: "Kajian", href: "/pengembangan" },      
    ],
  },
  { label: "Galeri", href: "/pengembangan" },
  {
    label: "Partisipasi",
    children: [
      { label: "Gabung Anggota", href: "/pengembangan" },
      { label: "Aspirasi Rakyat", href: "/pengembangan" },
    ],
  },
  { label: "Kontak", href: "/pengembangan" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  // ⚠️ Ganti dengan URL logo dari Supabase bucket
  const logoUrl =
    "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/logo/logogmni.png";

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Nama */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoUrl}
            alt="GMNI"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-lg text-red-500">
            GMNI T2P2 UNISBA BLITAR
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, i) => (
            <div key={i} className="relative group">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setDropdown(dropdown === item.label ? null : item.label)
                    }
                    className="flex items-center gap-1 hover:text-red-500 font-medium"
                  >
                    {item.label}
                    <ChevronDown size={16} />
                  </button>
                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 bg-white text-black rounded-md shadow-md mt-2 w-48"
                      >
                        {item.children.map((child, ci) => (
                          <Link
                            key={ci}
                            href={child.href}
                            className="block px-4 py-2 hover:bg-red-500 hover:text-white"
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
                  className="hover:text-red-500 font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black text-white px-6 py-4 space-y-3"
          >
            {navItems.map((item, i) => (
              <div key={i}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer py-2 hover:text-red-500">
                      {item.label}
                    </summary>
                    <div className="ml-4 space-y-2">
                      {item.children.map((child, ci) => (
                        <Link
                          key={ci}
                          href={child.href}
                          className="block hover:text-red-500"
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
                    className="block py-2 hover:text-red-500"
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
