"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Berita = {
  id: number;
  judul: string;
  isi: string;
  tanggal: string;
  link: string[] | string;
};

export default function BeritaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [berita, setBerita] = useState<Berita | null>(null);
  const [relatedNews, setRelatedNews] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

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

  // Navigation functions for slider
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setShowLightbox(true);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'unset';
  };

  const nextLightboxImage = () => {
    const nextIndex = (lightboxImageIndex + 1) % images.length;
    setLightboxImageIndex(nextIndex);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const prevLightboxImage = () => {
    const prevIndex = (lightboxImageIndex - 1 + images.length) % images.length;
    setLightboxImageIndex(prevIndex);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) {
      setZoomPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setZoomPosition({ x: x * (zoomLevel - 1) * 100, y: y * (zoomLevel - 1) * 100 });
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showLightbox) {
        switch (e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            if (images.length > 1) prevLightboxImage();
            break;
          case 'ArrowRight':
            if (images.length > 1) nextLightboxImage();
            break;
          case '+':
          case '=':
            handleZoomIn();
            break;
          case '-':
            handleZoomOut();
            break;
          case '0':
            resetZoom();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showLightbox, images.length, lightboxImageIndex, zoomLevel]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const fetchBerita = async () => {
      const id = params.id as string;
      
      if (!id) {
        router.push('/berita/berita');
        return;
      }

      // Fetch current berita
      const { data: beritaData, error: beritaError } = await supabase
        .from("berita")
        .select("*")
        .eq("id", id)
        .single();

      if (beritaError) {
        console.error(beritaError);
        router.push('/berita/berita');
        return;
      }

      setBerita(beritaData);
      
      // Parse images
      if (beritaData) {
        const parsedImages = parseLinks(beritaData.link);
        setImages(parsedImages);
      }

      // Fetch related news (excluding current)
      const { data: relatedData, error: relatedError } = await supabase
        .from("berita")
        .select("*")
        .neq("id", id)
        .order("tanggal", { ascending: false })
        .limit(3);

      if (!relatedError && relatedData) {
        setRelatedNews(relatedData);
      }

      setLoading(false);
    };

    fetchBerita();
  }, [params.id, router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Memuat berita...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!berita) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Berita tidak ditemukan</h1>
            <p className="text-gray-600 mb-8">Berita yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
            <Link 
              href="/berita/berita"
              className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              Kembali ke Berita
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-red-500 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/berita/berita" className="text-gray-500 hover:text-red-500 transition-colors">
              Berita
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-red-500 font-medium">Detail</span>
          </nav>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full">
                {new Date(berita.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-8">
              {berita.judul}
            </h1>
          </header>

          {/* Image Slider */}
          {images.length > 0 && (
            <div className="mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                {/* Main Image */}
                <div 
                  className="relative aspect-video cursor-zoom-in"
                  onClick={() => openLightbox(currentImageIndex)}
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${berita.judul} - Gambar ${currentImageIndex + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      console.error('Image failed to load:', images[currentImageIndex]);
                    }}
                  />
                  
                  {/* Zoom Indicator */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span>Klik untuk memperbesar</span>
                  </div>
                  
                  {/* Navigation Arrows (only show if more than 1 image) */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
                      >
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
                      >
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation (only show if more than 1 image) */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-red-500 scale-110'
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lightbox Modal */}
          {showLightbox && (
            <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Zoom Controls */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2 z-10">
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </button>

                <button
                  onClick={resetZoom}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white text-xs font-bold"
                >
                  1:1
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                {lightboxImageIndex + 1} / {images.length}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Main Image Container */}
              <div 
                className="relative w-full h-full flex items-center justify-center p-20 overflow-hidden"
                onMouseMove={handleMouseMove}
                style={{ cursor: zoomLevel > 1 ? 'grab' : 'default' }}
              >
                <div className="relative max-w-full max-h-full">
                  <Image
                    src={images[lightboxImageIndex]}
                    alt={`${berita.judul} - Gambar ${lightboxImageIndex + 1}`}
                    width={1200}
                    height={800}
                    className="object-contain max-w-full max-h-full transition-transform duration-200"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${-zoomPosition.x}px, ${-zoomPosition.y}px)`,
                    }}
                    onError={(e) => {
                      console.error('Lightbox image failed to load:', images[lightboxImageIndex]);
                    }}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm text-center">
                <div className="flex items-center space-x-4 text-xs">
                  <span>ESC: Tutup</span>
                  {images.length > 1 && <span>←→: Navigasi</span>}
                  <span>+/-: Zoom</span>
                  <span>0: Reset</span>
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {berita.isi}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Link 
                href="/berita/berita"
                className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors duration-300 group"
              >
                <svg className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Berita
              </Link>
              
              <div className="text-gray-500 text-sm">
                Dipublikasikan {new Date(berita.tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric", 
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </footer>
        </div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Berita Terkait</h2>
              <div className="w-16 h-1 bg-red-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedNews.map((related) => {
                const linkArray = parseLinks(related.link);
                const firstImage = linkArray[0];

                return (
                  <article
                    key={related.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden">
                      {firstImage ? (
                        <Image
                          src={firstImage}
                          alt={related.judul}
                          width={400}
                          height={200}
                          className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-red-500 text-xs font-medium">
                          {new Date(related.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
                        <Link href={`/berita/berita/${related.id}`} className="hover:underline">
                          {related.judul.length > 80 
                            ? related.judul.substring(0, 80) + '...' 
                            : related.judul
                          }
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {related.isi.length > 120 
                          ? related.isi.substring(0, 120).replace(/\s+\S*$/, '') + '...' 
                          : related.isi
                        }
                      </p>
                      
                      <Link 
                        href={`/berita/berita/${related.id}`}
                        className="inline-flex items-center text-red-500 font-medium text-sm hover:text-red-600 transition-colors duration-300 group/link"
                      >
                        Baca selengkapnya
                        <svg className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}