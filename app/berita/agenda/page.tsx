"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

type Agenda = {
  id: number;
  judul: string;
  deskripsi: string;
  lokasi: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  poster_url: string | null;
};

export default function AgendaPage() {
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"coming" | "ongoing" | "past">("coming");
  const [page, setPage] = useState(1);
  const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchAgenda = async () => {
      const { data, error } = await supabase
        .from("agenda_kegiatan")
        .select("*")
        .order("tanggal_mulai", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setAgenda(data || []);
      }
      setLoading(false);
    };

    fetchAgenda();
  }, []);

  // Fungsi untuk truncate text dengan elegan
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  };

  // Fungsi menentukan status agenda
  const getStatus = (a: Agenda): "coming" | "ongoing" | "past" => {
    const now = new Date();
    const mulai = new Date(a.tanggal_mulai);
    const selesai = new Date(a.tanggal_selesai);

    if (now < mulai) return "coming";
    if (now >= mulai && now <= selesai) return "ongoing";
    return "past";
  };

  // Filter agenda sesuai tab aktif
  const filteredAgenda = agenda.filter((a) => getStatus(a) === activeTab);

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedAgenda = filteredAgenda.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredAgenda.length / itemsPerPage);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAgenda(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Memuat agenda kegiatan...</p>
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
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6">
            Agenda <span className="text-red-500 font-medium">Kegiatan</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Daftar lengkap kegiatan GMNI, mulai dari yang akan datang, sedang berlangsung, hingga yang sudah selesai.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex rounded-full shadow bg-gray-100 p-1">
            <button
              onClick={() => { setActiveTab("coming"); setPage(1); }}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all ${
                activeTab === "coming" ? "bg-red-500 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Coming Soon
            </button>
            <button
              onClick={() => { setActiveTab("ongoing"); setPage(1); }}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all ${
                activeTab === "ongoing" ? "bg-red-500 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sedang Berlangsung
            </button>
            <button
              onClick={() => { setActiveTab("past"); setPage(1); }}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all ${
                activeTab === "past" ? "bg-red-500 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sudah Selesai
            </button>
          </div>
        </div>
      </section>

      {/* Daftar Agenda */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedAgenda.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              Tidak ada agenda pada tab ini.
            </div>
          ) : (
            paginatedAgenda.map((item) => {
              const status = getStatus(item);
              return (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => setSelectedAgenda(item)}
                >
                  {item.poster_url && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.poster_url}
                        alt={item.judul}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 text-left">
                    {/* Badge Status */}
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                        status === "coming"
                          ? "bg-yellow-100 text-yellow-700"
                          : status === "ongoing"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {status === "coming"
                        ? "Coming Soon"
                        : status === "ongoing"
                        ? "Sedang Berlangsung"
                        : "Sudah Selesai"}
                    </span>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      📍 {item.lokasi || "Lokasi belum ditentukan"}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      🗓 {new Date(item.tanggal_mulai).toLocaleString("id-ID", {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}{" "}
                      –{" "}
                      {new Date(item.tanggal_selesai).toLocaleString("id-ID", {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="text-gray-600">
                      {truncateText(item.deskripsi || "Tidak ada deskripsi.", 50)}
                    </p>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg border ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              ⬅️ Prev
            </button>
            <span className="px-4 py-2 text-gray-700">
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg border ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Next ➡️
            </button>
          </div>
        )}
      </section>

      {/* Modal Pop Up */}
      {selectedAgenda && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto"
          onClick={() => setSelectedAgenda(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full m-4 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAgenda(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedAgenda.judul}</h2>

            {selectedAgenda.poster_url && (
              <div className="relative h-96 w-full mb-6">
                <Image
                  src={selectedAgenda.poster_url}
                  alt={selectedAgenda.judul}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}

            <p className="text-sm text-gray-500 mb-2">
              📍 {selectedAgenda.lokasi || "Lokasi belum ditentukan"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              🗓 {new Date(selectedAgenda.tanggal_mulai).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })}{" "}
              –{" "}
              {new Date(selectedAgenda.tanggal_selesai).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
            <p className="text-gray-700 whitespace-pre-line">
              {selectedAgenda.deskripsi || "Tidak ada deskripsi."}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}