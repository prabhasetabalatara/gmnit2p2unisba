"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

type Arsip = {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  file_url: string;
  cover_url: string;
};

export default function ArsipPage() {
  const [arsip, setArsip] = useState<Arsip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Arsip | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchArsip = async () => {
      const { data, error } = await supabase
        .from("arsip")
        .select("*")
        .order("tanggal", { ascending: false });

      if (error) console.error(error);
      else setArsip(data || []);

      setLoading(false);
    };

    fetchArsip();
  }, []);

  // Truncate text
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
  };

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDoc(null);
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const totalPages = Math.ceil(arsip.length / itemsPerPage);
  const paginatedData = arsip.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Memuat arsip...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl font-light text-gray-900 mb-4">
              Arsip <span className="text-red-500 font-medium">Dokumen</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Kumpulan surat pengesahan dan dokumen penting lainnya
            </p>
          </div>

          {/* Grid Arsip */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {paginatedData.map((doc) => (
              <motion.article
                key={doc.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Cover Buku */}
                <div className="relative overflow-hidden aspect-[2/3] w-full">
                  {doc.cover_url ? (
                    <Image
                      src={doc.cover_url}
                      alt={doc.judul}
                      fill
                      className="object-cover w-full h-full rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => setSelectedImage(doc.cover_url)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Cover</span>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <span className="text-xs sm:text-sm text-red-500 font-medium">
                    {new Date(doc.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <h3 className="text-base sm:text-xl font-semibold text-gray-900 mt-2 mb-4 line-clamp-2">
                    {truncateText(doc.judul, 50)}
                  </h3>

                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all"
                  >
                    Lihat Detail
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 sm:mt-12 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                    currentPage === i + 1
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Detail Modal */}
      {selectedDoc && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-2xl m-4 p-4 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              {selectedDoc.judul}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 whitespace-pre-line">
              {selectedDoc.deskripsi}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-500">
                {new Date(selectedDoc.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <a
                href={selectedDoc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 sm:px-5 py-1 sm:py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Image Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-60 overflow-auto"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[90%] max-h-[85vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt="Full-size cover"
              width={500}
              height={750}
              className="object-contain max-w-full max-h-[85vh] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
