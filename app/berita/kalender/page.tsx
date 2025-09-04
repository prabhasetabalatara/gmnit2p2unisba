"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";

type Agenda = {
  id: number;
  judul: string;
  deskripsi: string;
  lokasi: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  poster_url: string | null;
};

export default function AgendaCalendarPage() {
  const [agenda, setAgenda] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8, 1)); // September 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch agenda for the current month
  useEffect(() => {
    const fetchAgendaForMonth = async () => {
      setLoading(true);
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0, 23, 59, 59);

      const { data, error } = await supabase
        .from("agenda_kegiatan")
        .select("*")
        .gte("tanggal_mulai", startOfMonth.toISOString())
        .lte("tanggal_mulai", endOfMonth.toISOString())
        .order("tanggal_mulai", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setAgenda(data || []);
      }
      setLoading(false);
    };

    fetchAgendaForMonth();
  }, [currentMonth]);

  // Group agenda by date
  const groupAgendaByDate = () => {
    const grouped: { [key: string]: Agenda[] } = {};
    agenda.forEach((a) => {
      const dateKey = new Date(a.tanggal_mulai).toISOString().split("T")[0];
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(a);
    });
    return grouped;
  };

  const groupedAgenda = groupAgendaByDate();

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    while (days.length < 42) {
      days.push(null);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Get agendas for a specific date
  const getAgendasForDate = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0];
    return groupedAgenda[dateKey] || [];
  };

  // Get status of an agenda
  const getStatus = (agenda: Agenda): "coming" | "ongoing" | "finished" => {
    const now = new Date();
    const start = new Date(agenda.tanggal_mulai);
    const end = new Date(agenda.tanggal_selesai);

    if (now < start) return "coming";
    if (now > end) return "finished";
    return "ongoing";
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
  };

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setSelectedDate(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-4 sm:mb-6">
            Agenda <span className="text-red-500 font-medium">GMNI</span>
          </h1>
        </div>
      </section>

      {/* Month Navigation */}
      <section className="py-4 sm:py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={prevMonth} 
            className="px-3 py-2 bg-gray-200 rounded text-sm sm:text-base hover:bg-gray-300 w-full sm:w-auto"
          >
            ←
          </button>
          <h2 className="text-lg sm:text-2xl font-semibold text-center">
            {currentMonth.toLocaleString("id-ID", { month: "long", year: "numeric" })}
          </h2>
          <button 
            onClick={nextMonth} 
            className="px-3 py-2 bg-gray-200 rounded text-sm sm:text-base hover:bg-gray-300 w-full sm:w-auto"
          >
            →
          </button>
        </div>
      </section>

      {/* Calendar Grid */}
      <AnimatePresence mode="wait">
        <motion.section
          key={currentMonth.toISOString()}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="py-8 sm:py-12 bg-gray-50 overflow-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-semibold text-gray-700 mb-2 hidden sm:grid">
              <div>Sen</div>
              <div>Sel</div>
              <div>Rab</div>
              <div>Kam</div>
              <div>Jum</div>
              <div>Sab</div>
              <div>Min</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((day, index) => {
                if (!day) return <div key={index} className="h-24 sm:h-32 bg-gray-100 rounded"></div>;

                const agendas = getAgendasForDate(day);
                const hasAgendas = agendas.length > 0;
                const today = new Date();
                const isToday = day.toDateString() === today.toDateString();

                return (
                  <div
                    key={index}
                    className={`relative h-24 sm:h-32 bg-white rounded shadow hover:shadow-md transition cursor-pointer p-2 sm:p-3 ${
                      isToday ? "border-2 border-red-500" : ""
                    }`}
                    onClick={() => setSelectedDate(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    <div className="absolute top-1 left-1 text-xs sm:text-sm text-gray-500">{day.getDate()}</div>
                    <div className="pt-4 sm:pt-6 overflow-hidden">
                      {agendas.slice(0, 2).map((a, i) => {
                        const status = getStatus(a);
                        return (
                          <div key={i} className="mb-1 flex items-center">
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                status === "coming" ? "bg-yellow-400" : status === "ongoing" ? "bg-green-400" : "bg-gray-400"
                              }`}
                            ></span>
                            <span className="text-xs sm:text-sm text-gray-700 line-clamp-2">{truncateText(a.judul, 20)}</span>
                          </div>
                        );
                      })}
                      {agendas.length > 2 && (
                        <div className="text-xs text-gray-500">+{agendas.length - 2} kegiatan lagi</div>
                      )}
                    </div>

                    {/* Popover on hover (desktop only) */}
                    {hoveredDate?.toDateString() === day.toDateString() && agendas.length > 0 && (
                      <div className="hidden sm:block absolute z-10 bg-white shadow-lg rounded p-3 top-full left-0 w-64">
                        <h4 className="font-semibold text-sm mb-2">
                          {day.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
                        </h4>
                        {agendas.map((a, i) => (
                          <div key={i} className="mb-2">
                            <p className="text-sm font-medium">{a.judul}</p>
                            <p className="text-xs text-gray-500">{truncateText(a.deskripsi, 50)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Detail Modal */}
      {selectedDate && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto"
          onClick={() => setSelectedDate(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-md sm:max-w-2xl m-4 p-4 sm:p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDate(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Kegiatan pada {selectedDate.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </h2>

            {getAgendasForDate(selectedDate).map((item) => (
              <div key={item.id} className="mb-6 sm:mb-8 border-b pb-4">
                {item.poster_url && (
                  <div className="relative h-48 sm:h-64 w-full mb-4 cursor-pointer">
                    <Image
                      src={item.poster_url}
                      alt={item.judul}
                      fill
                      className="object-contain rounded-lg"
                      onClick={() => setSelectedImage(item.poster_url)}
                    />
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.judul}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">📍 {item.lokasi || "Lokasi belum ditentukan"}</p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                  🗓 {new Date(item.tanggal_mulai).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" })} – 
                  {new Date(item.tanggal_selesai).toLocaleString("id-ID", { dateStyle: "full", timeStyle: "short" })}
                </p>
                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line">{item.deskripsi || "Tidak ada deskripsi."}</p>
              </div>
            ))}

            {getAgendasForDate(selectedDate).length === 0 && (
              <p className="text-gray-600 text-sm sm:text-base">Tidak ada kegiatan pada tanggal ini.</p>
            )}
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
            className="relative max-w-full max-h-[80vh] m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt="Full-size poster"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}