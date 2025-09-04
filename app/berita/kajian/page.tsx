"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Kajian = {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  link: string[] | string;
  link_download?: string;
};

export default function KajianListPage() {
  const [kajian, setKajian] = useState<Kajian[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredKajian, setFeaturedKajian] = useState<Kajian | null>(null);

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
    const fetchKajian = async () => {
      const { data, error } = await supabase
        .from("kajian")
        .select("*")
        .order("tanggal", { ascending: false });

      if (error) console.error(error);
      else {
        const kajianData = data || [];
        setKajian(kajianData);
        // Set kajian terbaru sebagai featured
        if (kajianData.length > 0) {
          setFeaturedKajian(kajianData[0]);
        }
      }

      setLoading(false);
    };

    fetchKajian();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Memuat kajian terbaru...</p>
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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6">
              Kajian & <span className="text-blue-400 font-medium">Penelitian</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Eksplorasi pemikiran mendalam dan analisis komprehensif untuk kemajuan ilmu pengetahuan
            </p>
          </div>
        </div>
      </section>

      {/* Featured Kajian Section */}
      {featuredKajian && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-gray-900 mb-4">Kajian Utama</h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                      Terbaru
                    </div>
                    {featuredKajian.link_download && (
                      <a
                        href={featuredKajian.link_download}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 text-sm font-medium rounded-full hover:bg-green-100 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </a>
                    )}
                  </div>
                  <h3 className="text-3xl font-light text-gray-900 leading-tight">
                    {featuredKajian.judul}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {truncateText(featuredKajian.isi, 200)}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 8h6m-6-4h6m2 8H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2z" />
                    </svg>
                    <span>
                      {new Date(featuredKajian.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Link 
                    href={`/berita/kajian/${featuredKajian.id}`}
                    className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-all duration-300 group"
                  >
                    Baca Kajian
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                {(() => {
                  const linkArray = parseLinks(featuredKajian.link);
                  const firstImage = linkArray[0];
                  
                  return firstImage ? (
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={firstImage}
                        alt={featuredKajian.judul}
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
                    <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center">
                      <div className="text-center text-blue-500">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="font-medium">Dokumen Kajian</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Kajian Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Kajian Lainnya</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {kajian.slice(1).map((k) => {
              const linkArray = parseLinks(k.link);
              const firstImage = linkArray[0];

              return (
                <article
                  key={k.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    {firstImage ? (
                      <Image
                        src={firstImage}
                        alt={k.judul}
                        width={400}
                        height={250}
                        className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <div className="text-center text-blue-400">
                          <div className="w-12 h-12 mx-auto mb-3 bg-blue-200 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">Kajian</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Download badge jika ada link download */}
                    {k.link_download && (
                      <div className="absolute top-4 right-4">
                        <a
                          href={k.link_download}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-full hover:bg-green-600 transition-colors shadow-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                          </svg>
                          PDF
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-blue-500 text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 8h6m-6-4h6m2 8H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2z" />
                        </svg>
                        {new Date(k.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      <Link href={`/kajian/${k.id}`} className="hover:underline">
                        {k.judul}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {truncateText(k.isi, 120)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/berita/kajian/${k.id}`}
                        className="inline-flex items-center text-blue-500 font-medium hover:text-blue-600 transition-colors duration-300 group/link"
                      >
                        Baca kajian
                        <svg className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      
                      {k.link_download && (
                        <a
                          href={k.link_download}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-500 font-medium hover:text-green-600 transition-colors duration-300"
                          title="Download PDF"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {kajian.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-gray-600 mb-2">Belum ada kajian</h3>
              <p className="text-gray-500">Kajian terbaru akan segera hadir</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}