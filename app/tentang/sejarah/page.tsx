"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function SejarahGMNIPage() {
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
  Sejarah <span className="text-red-500 font-medium">GMNI</span>
</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Perjalanan panjang Gerakan Mahasiswa Nasional Indonesia dalam memperjuangkan cita-cita kemerdekaan dan keadilan sosial
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white">
        <div className="container-article">
          <div className="text-center mb-16">
            <div style={{ height: "40px" }}></div>
  <h2 className="text-3xl font-bold mb-4">
    Kronologi Perjalanan
  </h2>
            <div className="accent-divider"></div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-red-400 to-red-300"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* 1954 - Lahirnya GMNI */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-5 h-5 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 card-base p-8 hover-group">
                  <div className="badge-primary mb-4">23 Maret 1954</div>
                  <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Lahirnya GMNI</h3>
                  <p className="text-card mb-4">
                    Gerakan Mahasiswa Nasional Indonesia (GMNI) resmi berdiri di Surabaya sebagai hasil fusi dari Gerakan Mahasiswa Demokrat Indonesia (GMDI) dan Gerakan Mahasiswa Marhaenis (GMM). Dorongan utama penyatuan ini datang dari Bung Karno yang menekankan pentingnya persatuan mahasiswa progresif dalam mengawal revolusi nasional.
                  </p>
                  <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-sm rounded-full">
                    Marhaenisme • Nasionalisme • Demokrasi
                  </div>
                </div>
              </div>

              {/* 1954-1958 - Masa Awal */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-5 h-5 bg-red-400 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 card-base p-8 hover-group">
                  <div className="badge-primary mb-4">1954 - 1958</div>
                  <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Masa Awal dan Konsolidasi</h3>
                  <p className="text-card mb-4">
                    GMNI fokus memperluas basis organisasi di berbagai kampus dan kota. Menjadi wadah bagi mahasiswa yang tidak hanya haus akan ilmu, tetapi juga ingin terlibat langsung dalam perjuangan politik kebangsaan.
                  </p>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                    Nasionalis, Demokratis, Marhaenis
                  </div>
                </div>
              </div>

              {/* 1958-1965 - Era Demokrasi Terpimpin */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-5 h-5 bg-red-400 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 card-base p-8 hover-group">
                  <div className="badge-primary mb-4">1958 - 1965</div>
                  <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Era Demokrasi Terpimpin</h3>
                  <p className="text-card mb-4">
                    GMNI mendukung gagasan Bung Karno tentang Trisakti: berdaulat dalam politik, berdikari dalam ekonomi, dan berkepribadian dalam kebudayaan. Aktif dalam gerakan mahasiswa yang menentang imperialisme dan neokolonialisme.
                  </p>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">Trisakti</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full">Anti-Imperialisme</span>
                  </div>
                </div>
              </div>

              {/* 1965 - Perpecahan */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-5 h-5 bg-yellow-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 card-base p-8 hover-group">
                  <div className="badge-primary mb-4">Pasca 1965</div>
                  <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Perpecahan Internal</h3>
                  <p className="text-card mb-4">
                    Peristiwa politik 1965 membawa dampak besar. Stigma politik dan tekanan rezim Orde Baru membuat GMNI terdesak dan terjadi perpecahan internal menjadi GMNI Soekarnois dan GMNI Zamrud.
                  </p>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-sm rounded-full">GMNI Soekarnois</span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full">GMNI Zamrud</span>
                  </div>
                </div>
              </div>

              {/* 1966-1998 - Era Orde Baru */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-5 h-5 bg-gray-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 card-base p-8 hover-group">
                  <div className="badge-primary mb-4">1966 - 1998</div>
                  <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Era Orde Baru</h3>
                  <p className="text-card mb-4">
                    Ruang gerak mahasiswa sangat dibatasi melalui NKK/BKK. GMNI menghadapi represi dan pembatasan, namun tetap berusaha menjaga eksistensi melalui gerakan intelektual dan kaderisasi di luar struktur resmi kampus.
                  </p>
                  <div className="inline-block px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full">
                    Periode Represi
                  </div>
                </div>
              </div>

              {/* 1998-Sekarang - Era Reformasi */}
              <div className="relative flex items-start">
                <div className="absolute left-6 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16 card-base p-8 hover-group">
                  <div className="badge-primary mb-4">1998 - Sekarang</div>
                  <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Era Reformasi</h3>
                  <p className="text-card mb-4">
                    GMNI kembali bangkit dan mengambil peran aktif dalam gerakan mahasiswa yang menumbangkan rezim Orde Baru. Menegaskan kembali identitas sebagai organisasi kader dan perjuangan yang berpihak pada rakyat kecil.
                  </p>
                  <div className="inline-block px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">
                    Kebangkitan Kembali
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo & Ideology Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Logo Section */}
            <div className="text-center lg:text-left">
              <div style={{ height: "40px" }}></div>
  <h2 className="text-3xl text-center font-bold mb-4">
  Arti Logo
  </h2>
              <div className="mb-8">
                <Image
                  src="https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/logo/logoresmi.png"
                  alt="Logo GMNI"
                  width={200}
                  height={200}
                  className="mx-auto lg:mx-0 drop-shadow-2xl"
                />
              </div>
              <div className="space-y-4">
                <div className="card-base p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Makna Perisai</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>3 Sudut Atas:</strong> Melambangkan Marhaenisme</p>
                    <p><strong>3 Sudut Bawah:</strong> Melambangkan Tri Dharma Perguruan Tinggi</p>
                    <p><strong>Warna Merah:</strong> Keberanian</p>
                    <p><strong>Warna Putih:</strong> Kesucian</p>
                  </div>
                </div>
                <div className="card-base p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Simbol Tengah</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Bintang Merah:</strong> Ketinggian cita-cita dan keluhuran budi</p>
                    <p><strong>Kepala Banteng Hitam:</strong> Potensi rakyat Marhaen dan keteguhan pendirian</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ideology Section */}
            <div>
  <h2 className="text-3xl text-center font-bold mb-4">
  MARHAENISME
  </h2>
              <div className="space-y-6">
                <div className="card-base p-8 hover-group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Sosio-Nasionalisme</h3>
                      <p className="text-gray-600">Nasionalisme yang memiliki watak sosial, ditempatkan di atas nilai-nilai kemanusiaan</p>
                    </div>
                  </div>
                </div>

                <div className="card-base p-8 hover-group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Sosio-Demokrasi</h3>
                      <p className="text-gray-600">Demokrasi yang memiliki watak sosial - demokrasi politik dan ekonomi yang menyelamatkan kaum marhaen</p>
                    </div>
                  </div>
                </div>

                <div className="card-base p-8 hover-group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Ketuhanan Yang Maha Esa</h3>
                      <p className="text-gray-600">GMNI meyakini eksistensi Tuhan, setiap anggota GMNI adalah manusia yang theis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pancalogi Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
              <div style={{ height: "40px" }}></div>
  <h2 className="text-3xl text-center font-bold mb-4">
PANCALOGI GMNI
  </h2>
            <div className="accent-divider"></div>
            <p className="text-featured mt-6 max-w-2xl mx-auto">
              Lima pilar fundamental yang menjadi pedoman perjuangan setiap anggota GMNI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ideologi */}
            <div className="card-base p-8 text-center hover-group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Ideologi</h3>
              <p className="text-card">Perjuangan berlandaskan Marhaenisme sebagai acuan dasar dalam perumusan format dan pola operasional pergerakan</p>
            </div>

            {/* Revolusi */}
            <div className="card-base p-8 text-center hover-group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Revolusi</h3>
              <p className="text-card">Perubahan nilai-nilai kemasyarakatan secara revolusioner - revolusi pikiran dan perubahan mendasar</p>
            </div>

            {/* Organisasi */}
            <div className="card-base p-8 text-center hover-group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Organisasi</h3>
              <p className="text-card">Perjuangan yang terorganisir, dilakukan secara sadar sesuai dengan ideologi GMNI</p>
            </div>

            {/* Studi */}
            <div className="card-base p-8 text-center hover-group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Studi</h3>
              <p className="text-card">Meningkatkan bobot intelektualitas dengan Amanat Penderitaan Rakyat sebagai fokus studi</p>
            </div>

            {/* Integrasi */}
            <div className="card-base p-8 text-center hover-group lg:col-span-2 lg:max-w-md lg:mx-auto">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <h3 className="heading-card mb-4 group-hover:text-red-600 transition-colors">Integrasi</h3>
              <p className="text-card">Perjuangan yang tidak terlepas dari perjuangan rakyat semesta, selalu berjuang bersama rakyat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kongres Timeline */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
              <div style={{ height: "40px" }}></div>
  <h2 className="text-3xl text-center font-bold mb-4">
Kongres Penting
  </h2>
            <div className="accent-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { no: "I", year: "1954", city: "Surabaya", desc: "Penetapan GMNI sebagai hasil fusi GMDI dan GMM" },
              { no: "II", year: "1956", city: "Semarang", desc: "Perluasan basis organisasi dan perumusan garis perjuangan" },
              { no: "IV", year: "1960", city: "Bandung", desc: "Penegasan posisi mendukung Demokrasi Terpimpin dan Trisakti" },
              { no: "VII", year: "1989", city: "Malang", desc: "Momentum konsolidasi kader di era Orde Baru" },
              { no: "XI", year: "2006", city: "Ambon", desc: "Kebangkitan kembali pasca-Reformasi" },
              { no: "XIII", year: "2019", city: "Manado", desc: "Trisakti sebagai Jalan Kedaulatan Bangsa" }
            ].map((kongres, index) => (
              <div key={index} className="card-base p-6 hover-group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                    {kongres.no}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{kongres.year}</div>
                    <div className="text-red-500 text-sm font-medium">{kongres.city}</div>
                  </div>
                </div>
                <p className="text-card">{kongres.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ikrar Prasetya Korps */}
      <section className="section-padding gradient-hero text-white">
        <div className="container-article">
          <div className="text-center mb-16">
              <div style={{ height: "40px" }}></div>
  <h2 className="text-3xl text-center text-white font-bold mb-4">
  Ikrar Prasetya Korps
  </h2>
            <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 italic">Pejuang Pemikir-Pemikir Pejuang</p>
          </div>

          <div className="card-base p-8 md:p-12 bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="space-y-6 text-white">
              <p className="text-lg leading-relaxed">
                <strong>Kami, anggota Gerakan Mahasiswa Nasional Indonesia adalah Pejuang Pemikir-Pemikir Pejuang Indonesia</strong>, dan berdasar pengakuan ini, kami mengaku bahwa:
              </p>
              
              <div className="space-y-4 pl-4 border-l-4 border-red-500">
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p>Kami adalah makhluk ciptaan Tuhan, dan bersumber serta bertakwa kepada-Nya.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p>Kami adalah warga Negara Republik Indonesia yang bersendikan Pancasila yang setia kepada cita-cita revolusi 17 Agustus 1945.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p>Kami adalah Pejuang Indonesia yang menjunjung tinggi kedaulatan rakyat, lahir dari rakyat yang berjuang dan senantiasa siap sedia berjuang untuk dan bersama rakyat membangun masyarakat Sosialis Indonesia.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p>Kami adalah patriot Indonesia yang percaya pada kekuatan diri sendiri, berjiwa optimis dan dinamis dalam perjuangan, senantiasa bertindak setia kawan kepada sesama kawan seperjuangan.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <p>Kami adalah Mahasiswa Indonesia, penuh kesungguhan menuntut ilmu dan pengetahuan yang setinggi-tingginya untuk diabdikan kepada kepentingan rakyat dan kesejahteraan umat manusia.</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20">
                <p className="text-lg italic text-center">
                  Berdasarkan pengakuan-pengakuan ini, <strong>Demi Kehormatan</strong>, kami berjanji akan bersungguh-sungguh menjalankan kewajiban untuk mengamalkan semua pengakuan ini dalam karya hidup kami sehari-hari.
                </p>
              </div>
              
              <div className="mt-8 text-center">
                <div className="space-y-2 text-2xl font-bold">
                  <p className="text-red-400">Merdeka....!!!</p>
                  <p className="text-white">GMNI, Jaya....!!!</p>
                  <p className="text-red-400">Marhaen, Menang....!!!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Typography Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ height: "40px" }}></div>
  <h2 className="text-3xl text-center font-bold mb-4">
Makna Tipografi Logo
  </h2>
              <div className="space-y-6">
                <div className="card-base p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl font-bold text-red-500 w-12 text-center">G</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">GERAKAN</h4>
                      <p className="text-sm text-gray-600">Huruf kapital - elemen pokok yang harus ditonjolkan</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-base p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl text-gray-600 w-12 text-center">m</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">MAHASISWA</h4>
                      <p className="text-sm text-gray-600">Huruf kecil - predikat yang mempertegas keberadaan</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-base p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl text-gray-600 w-12 text-center">n</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">NASIONAL</h4>
                      <p className="text-sm text-gray-600">Huruf kecil - predikat yang mempertegas keberadaan</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-base p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl font-bold text-red-500 w-12 text-center">I</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">INDONESIA</h4>
                      <p className="text-sm text-gray-600">Huruf kapital - elemen pokok yang harus ditonjolkan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="card-base p-12 bg-gradient-to-br from-red-50 to-white">
                <div className="text-8xl font-bold mb-8">
                  <span className="text-red-500">G</span>
                  <span className="text-gray-600">m</span>
                  <span className="text-gray-600">n</span>
                  <span className="text-red-500">I</span>
                </div>
                <p className="text-gray-700 font-medium">
                  GERAKAN dan INDONESIA sebagai elemen pokok yang menonjol
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}