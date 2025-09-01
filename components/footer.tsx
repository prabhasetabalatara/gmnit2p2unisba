"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // pastikan sudah ada supabaseClient

type Sosmed = {
  id: number;
  platform: string;
  url: string;
};

export default function Footer() {
  const [sosmed, setSosmed] = useState<Sosmed[]>([]);

  const logoUrl = "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/logo/logogmni.png";

  // Fetch link media sosial dari Supabase
  useEffect(() => {
    const fetchSosmed = async () => {
      const { data, error } = await supabase
        .from("link_sosmed")
        .select("*");
      if (error) console.error(error);
      else setSosmed(data || []);
    };
    fetchSosmed();
  }, []);

  return (
    <footer className="bg-black text-white mt-16">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Identitas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image
              src={logoUrl}
              alt="GMNI"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-red-600 text-lg">
              GMNI T2P2 UNISBA BLITAR
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            Gerakan Mahasiswa Nasional Indonesia <br />
            Cabang T2P2 Universitas Islam Balitar
          </p>
<p className="italic text-gray-400 text-sm">
  &quot;Nasionalisme adalah perjuangan, bukan sekadar kata.&quot; – GMNI
</p>
        </div>

        {/* Navigasi Cepat */}
        <div>
          <h3 className="font-semibold text-red-600 mb-3">Navigasi</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/tentang/sejarah" className="hover:text-red-500">Sejarah</Link></li>
            <li><Link href="/tentang/visi-misi" className="hover:text-red-500">Visi & Misi</Link></li>
            <li><Link href="/tentang/struktur" className="hover:text-red-500">Struktur</Link></li>
            <li><Link href="/perpus/artikel" className="hover:text-red-500">Artikel & Buku PDF</Link></li>
            <li><Link href="/perpus/multimedia" className="hover:text-red-500">Multimedia & Dokumentasi</Link></li>
            <li><Link href="/agenda/terdekat" className="hover:text-red-500">Agenda Terdekat</Link></li>
            <li><Link href="/partisipasi/gabung" className="hover:text-red-500">Gabung Anggota</Link></li>
            <li><Link href="/kontak" className="hover:text-red-500">Kontak</Link></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-red-600 mb-3">Kontak</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>📍 Jalan Kampus No. XX, Blitar</li>
            <li>✉️ info@gmni-blitar.ac.id</li>
            <li>
              🌐 Media Sosial:
              <div className="flex gap-2 mt-1">
                {sosmed.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-red-500"
                  >
                    {item.platform}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-red-600 mb-3">Hak Cipta</h3>
          <p className="text-gray-400 text-sm">
            © 2025 GMNI T2P2 UNISBA Blitar. <br />
            Seluruh hak cipta dilindungi. <br />
            Dibangun dengan ❤️ untuk perjuangan rakyat.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-xs">
        Developed with Next.js & Tailwind by IT Team GMNI
      </div>
    </footer>
  );
}

