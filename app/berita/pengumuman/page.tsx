"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Pengumuman = {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  link: string[] | string;
};

export default function PengumumanListPage() {
  const [pengumuman, setPengumuman] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredAnnouncement, setFeaturedAnnouncement] = useState<Pengumuman | null>(null);

  // Fungsi untuk membersihkan dan parse link
  const parseLinks = (linkData: string[] | string): string[] => {
    let linkArray: string[] = [];

    if (Array.isArray(linkData)) {
      linkArray = linkData;
    } else if (typeof linkData === "string") {
      try {
        let cleanedString = linkData;
        
        if (cleanedString.startsWith('["{') && cleanedString.endsWith('}"]')) {
          cleanedString = cleanedString.slice(2, -2);
          if (cleanedString.startsWith('{') && cleanedString.endsWith('}')) {
            cleanedString = cleanedString.slice(1, -1);
          }
          linkArray = cleanedString.split('","').map(url => url.replace(/^"|"$/g, ''));
        } else {
          const parsed = JSON.parse(linkData);
          if (Array.isArray(parsed)) {
            linkArray = parsed;
          } else {
            linkArray = [linkData];
          }
        }
      } catch (error) {
        console.error('Error parsing links:', error);
        linkArray = linkData.split(",").map((l) => l.trim());
      }
    }

    return linkArray.filter(url => {
      if (!url || typeof url !== 'string') return false;
      
      try {
        new URL(url);
        return !url.toLowerCase().endsWith('.heic');
      } catch {
        return false;
      }
    });
  };

  // Fungsi untuk truncate text dengan elegan
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  };

  useEffect(() => {
    const fetchPengumuman = async () => {
      const { data, error } = await supabase
        .from("pengumuman")
        .select("*")
        .order("tanggal", { ascending: false });

      if (error) console.error(error);
      else {
        const pengumumanData = data || [];
        setPengumuman(pengumumanData);
        // Set pengumuman terbaru sebagai featured
        if (pengumumanData.length > 0) {
          setFeaturedAnnouncement(pengumumanData[0]);
        }
      }

      setLoading(false);
    };

    fetchPengumuman();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Memuat pengumuman terbaru...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="absolute inset-0 bg-red-600 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6">
              Pengumuman & <span className="text-red-500 font-medium">Informasi</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tetap terhubung dengan pengumuman terkini dan perkembangan terbaru
            </p>
          </div>
        </div>
      </section>

      {/* Featured Announcement Section */}
      {featuredAnnouncement && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-4">Pengumuman Utama</h2>
              <div className="w-16 h-1 bg-red-500 mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full">
                    Terbaru
                  </div>
                  <h3 className="text-3xl font-light text-gray-900 leading-tight">
                    {featuredAnnouncement.judul}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {truncateText(featuredAnnouncement.isi, 200)}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>
                      {new Date(featuredAnnouncement.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Link 
                    href={`/berita/pengumuman/${featuredAnnouncement.id}`}
                    className="inline-flex items-center px-8 py-4 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-all duration-300 group"
                  >
                    Baca Selengkapnya
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                {(() => {
                  const linkArray = parseLinks(featuredAnnouncement.link);
                  const firstImage = linkArray[0];
                  
                  return firstImage ? (
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={firstImage}
                        alt={featuredAnnouncement.judul}
                        width={600}
                        height={400}
                        className="object-cover w-full h-80 lg:h-96"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="font-medium">Gambar tidak tersedia</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Announcements Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Pengumuman Lainnya</h2>
            <div className="w-16 h-1 bg-red-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {pengumuman.slice(1).map((p) => {
              const linkArray = parseLinks(p.link);
              const firstImage = linkArray[0];

              return (
                <article
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    {firstImage ? (
                      <Image
                        src={firstImage}
                        alt={p.judul}
                        width={400}
                        height={250}
                        className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="w-12 h-12 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">No Image</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-8">
                    <div className="mb-4">
                      <span className="text-red-500 text-sm font-medium">
                        {new Date(p.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors duration-300">
                      <Link href={`/berita/pengumuman/${p.id}`} className="hover:underline">
                        {p.judul}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {truncateText(p.isi, 120)}
                    </p>
                    
                    <Link 
                      href={`/berita/pengumuman/${p.id}`}
                      className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors duration-300 group/link"
                    >
                      Baca selengkapnya
                      <svg className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {pengumuman.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-600 mb-2">Belum ada pengumuman</h3>
              <p className="text-gray-500">Pengumuman terbaru akan segera hadir</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}