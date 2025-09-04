"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialMedia = [
    {
      nama: "Email",
      link: "mailto:dpk.t2p2.blitar",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      nama: "Instagram",
      link: "https://www.instagram.com/dpk_gmni.t2p2?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      nama: "TikTok",
      link: "https://www.tiktok.com/@dpk.t2p2.gmni.uni?_t=ZS-8zRM4mErrKT&_r=1",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: "bg-black hover:bg-gray-800",
    },
  ];

  const logoUrl = "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/logo/logogmni.png";

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Identitas */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src={logoUrl}
              alt="GMNI"
              width={48}
              height={48}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-red-500">
              GMNI T2P2 UNISBA BLITAR
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Gerakan Mahasiswa Nasional Indonesia <br />
            T2P2 Universitas Islam Balitar
          </p>
          <p className="text-gray-400 text-sm italic">
            &quot;Menjebol dan Membangun.&quot;
          </p>
        </div>

        {/* Navigasi Cepat */}
        <div>
          <h3 className="font-semibold text-red-500 text-lg mb-4">Navigasi</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <Link href="/tentang/sejarah" className="hover:text-red-500 transition-colors">
                Sejarah
              </Link>
            </li>
            <li>
              <Link href="/tentang/visi-misi" className="hover:text-red-500 transition-colors">
                Visi & Misi
              </Link>
            </li>
            <li>
              <Link href="/tentang/struktur" className="hover:text-red-500 transition-colors">
                Struktur Organisasi
              </Link>
            </li>
            <li>
              <Link href="/perpusgaleri/arsip" className="hover:text-red-500 transition-colors">
                Arsip
              </Link>
            </li>
            <li>
              <Link href="/perpusgaleri/galeri" className="hover:text-red-500 transition-colors">
                Galeri
              </Link>
            </li>
            <li>
              <Link href="/berita/agenda" className="hover:text-red-500 transition-colors">
                Agenda
              </Link>
            </li>
            <li>
              <Link href="/hubungi/gabung" className="hover:text-red-500 transition-colors">
                Gabung Anggota
              </Link>
            </li>
            <li>
              <Link href="/hubungi/kontak" className="hover:text-red-500 transition-colors">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-red-500 text-lg mb-4">Kontak</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Jl. DR. Sutomo, Sananwetan, Kota Blitar, Jawa Timur 66137
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              dpk.t2p2.blitar@gmail.com
            </li>
            <li>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Media Sosial:
              </span>
              <div className="flex gap-3 mt-2">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} p-2 rounded-full text-white hover:scale-110 transition-transform`}
                    title={social.nama}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-red-500 text-lg mb-4">Hak Cipta</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            © 2025 GMNI T2P2 UNISBA Blitar. <br />
            Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400 text-xs">
        Dibuat untuk mendukung perjuangan rakyat.
      </div>
    </footer>
  );
}