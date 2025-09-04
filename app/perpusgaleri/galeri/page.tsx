"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/lib/supabase";

type GaleriItem = {
  id: number;
  nama: string;
  link_drive: string;
  tipe: string;
  created_at: string;
  cover_url?: string;
};

export default function KegiatanPage() {
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("galeri").select("*");
      if (error) {
        console.error("Error fetching galeri:", error);
      } else {
        setGaleri(data || []);
      }
      setLoading(false);
    };

    fetchGaleri();
  }, []);

  return (
    <>
      <Navbar />
      <section className="pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-12 text-center text-red-600">
            Galeri
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : galeri.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📸</div>
              <p className="text-gray-500 text-lg">Belum ada dokumentasi kegiatan</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {galeri.map((item) => (
                <a
                  key={item.id}
                  href={item.link_drive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Gambar */}
                  <img
                    src={item.cover_url || "/placeholder.jpg"}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.jpg";
                    }}
                  />
                  
                  {/* Overlay dengan gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Konten yang muncul saat hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-semibold text-sm md:text-base leading-tight mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.nama}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs">
                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <div className="text-white/80 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge tipe di pojok kanan atas */}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    {item.tipe}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}