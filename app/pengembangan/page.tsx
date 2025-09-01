"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function UnderDevelopmentPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden pt-20 md:pt-24">
        <div className="backdrop-overlay"></div>
        <div className="container-main section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="mb-8">
              <Image
                src="https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/logo/logogmni.png"
                alt="Logo GMNI"
                width={Math.max(300, 0.4 * 300)}
                height={Math.max(300, 0.4 * 300)}
                className="mx-auto animate-scale-in"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Website Sedang <span className="text-red-500 font-medium">Dikembangkan</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Mohon maaf atas ketidaknyamanan ini. Tim pengembang kami sedang bekerja keras untuk memberikan pengalaman terbaik
            </p>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <div style={{ height: "40px" }}></div>
            <h2 className="text-3xl font-bold mb-4">
              Status Pengembangan
            </h2>
            <div className="accent-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tersedia */}
            <div className="card-base p-8 text-center hover-group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 text-green-600 group-hover:text-green-700 transition-colors">✅ Sudah Tersedia</h3>
              <div className="space-y-3">
                <div className="inline-block px-4 py-2 bg-green-50 text-green-700 text-sm rounded-full">
                  📰 Berita
                </div>
                <div className="inline-block px-4 py-2 bg-green-50 text-green-700 text-sm rounded-full">
                  📜 Sejarah GMNI
                </div>
                <div className="inline-block px-4 py-2 bg-green-50 text-green-700 text-sm rounded-full">
                  🎯 Visi & Misi
                </div>
                <div className="inline-block px-4 py-2 bg-green-50 text-green-700 text-sm rounded-full">
                  📰 Perpustakaan Digital
                </div>
              </div>
            </div>

            {/* Dalam Pengembangan */}
            <div className="card-base p-8 text-center hover-group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 text-yellow-600 group-hover:text-yellow-700 transition-colors">⚠️ Dalam Proses</h3>
              <div className="space-y-3">
                <div className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 text-sm rounded-full">
                  🏛️ Profil Organisasi
                </div>
                <div className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 text-sm rounded-full">
                  👥 Data Anggota
                </div>
                <div className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 text-sm rounded-full">
                  📅 Agenda Kegiatan
                </div>
              </div>
            </div>

            {/* Belum Tersedia */}
            <div className="card-base p-8 text-center hover-group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 text-red-600 group-hover:text-red-700 transition-colors">❌ Belum Tersedia</h3>
              <div className="space-y-3">
                <div className="inline-block px-4 py-2 bg-red-50 text-red-700 text-sm rounded-full">
                  📊 Dashboard Admin
                </div>
                <div className="inline-block px-4 py-2 bg-red-50 text-red-700 text-sm rounded-full">
                  💬 Forum Diskusi
                </div>
                <div className="inline-block px-4 py-2 bg-red-50 text-red-700 text-sm rounded-full">
                  📱 Aplikasi Mobile
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmer Status */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <div style={{ height: "40px" }}></div>
            <h2 className="text-3xl font-bold mb-4">
              Tim <span className="text-red-500">Developer</span>
            </h2>
            <div className="accent-divider"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-base p-8 md:p-12 text-center hover-group">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-red-600 transition-colors">
                Status Programmer 🧑‍💻
              </h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <span className="text-3xl">😴</span>
                    <span className="text-xl font-semibold text-yellow-700">Programmer Masih Lelah</span>
                    <span className="text-3xl">☕</span>
                  </div>
                  <p className="text-gray-700">
                    Tim developer sedang dalam masa recovery setelah bekerja siang malam mengembangkan fitur-fitur yang sudah tersedia. 
                    Mohon bersabar ya! 🙏
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl mb-2">📊</div>
                    <p className="text-sm text-gray-700">Progress: <strong className="text-red-600">35%</strong></p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">⏰</div>
                    <p className="text-sm text-gray-700">ETA: <strong className="text-blue-600">Soon™</strong></p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">☕</div>
                    <p className="text-sm text-gray-700">Kopi: <strong className="text-green-600">Habis</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Message */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="card-base p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👨‍💻</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pesan dari Developer</h3>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <div className="p-6 bg-white rounded-2xl shadow-sm">
                  <p className="text-lg italic text-center mb-4">
                    Halo teman-teman GMNI! 👋
                  </p>
                  <p className="leading-relaxed">
                    Website ini dikembangkan dengan penuh cinta dan semangat untuk mendukung perjuangan GMNI T2P2 Unisba Blitar. 
                    Saat ini developer sedang dalam fase <strong className="text-blue-600">recharge battery</strong> setelah begadang beberapa malam 
                    untuk menyelesaikan bagian berita, sejarah, dan visi misi.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">🔋 Status Energy</h4>
                    <div className="w-full bg-red-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full" style={{width: "15%"}}></div>
                    </div>
                    <p className="text-sm text-red-600 mt-2">Low Battery (15%)</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2">☕ Stok Kopi</h4>
                    <div className="w-full bg-yellow-200 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{width: "5%"}}></div>
                    </div>
                    <p className="text-sm text-yellow-600 mt-2">Critical Level (5%)</p>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                  <p className="text-center text-gray-700">
                    <strong>Estimasi pemulihan:</strong> Setelah tidur yang cukup + kopi yang banyak + semangat #T2P2SOLID! 
                    <span className="text-purple-600 font-semibold">💪</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding gradient-hero text-white">
        <div className="container-article">
          <div className="text-center">
            <div style={{ height: "40px" }}></div>

            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Saran dan kritik sangat diterima untuk perbaikan website ini 📝
              </p>
              
              <div className="mt-8 space-y-2 text-2xl font-bold">
                <p className="text-red-400">Merdeka....!!!</p>
                <p className="text-white">GMNI T2P2, Jaya....!!!</p>
                <p className="text-red-400">Website, Loading....!!! 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}