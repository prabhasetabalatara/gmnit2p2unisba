"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function VisiMisiGMNIT2P2Page() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden pt-20 md:pt-50">
        <div className="absolute inset-0">
          <Image
            src="https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/visi/12.jpg"
            alt="GMNI T2P2 Unisba Blitar"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="backdrop-overlay"></div>
        <div className="container-main section-padding relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Visi & Misi <span className="text-red-500 font-medium">GMNI T2P2</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 animate-fade-in">
              Unisba Blitar
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Bergerak Bersama dalam Semangat <span className="text-red-400 font-bold">#T2P2SOLID</span>
            </p>
          </div>
        </div>
      </section>

      {/* Visi Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ height: "40px" }}></div>
              <h2 className="text-3xl text-center font-bold mb-4">
                Visi
              </h2>
              <div className="accent-divider mb-8"></div>
              <div className="card-base p-8 hover-group">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Mewujudkan GMNI T2P2 Unisba Blitar sebagai ruang kaderisasi yang solid, progresif, dan berkarakter nasionalis dengan berlandaskan <strong className="text-red-600">T2P2SOLID</strong> demi tercapainya gerakan mahasiswa yang berdaya, inklusif, serta mampu membawa perubahan sosial dari akar rumput.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="card-base p-8 bg-gradient-to-br from-red-50 to-white">
                <Image
                  src="https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/visi/bersama.jpg"
                  alt="Visi GMNI T2P2"
                  width={400}
                  height={300}
                  className="mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <div style={{ height: "40px" }}></div>
            <h2 className="text-3xl font-bold mb-4">
              Misi
            </h2>
            <div className="accent-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                no: "1",
                title: "Membangun Kader Berintegritas",
                desc: "Mengembangkan karakter dan kepribadian anggota yang berpegang teguh pada nilai-nilai moral dan etika perjuangan",
                icon: "👤"
              },
              {
                no: "2", 
                title: "Mendorong Transparansi Organisasi",
                desc: "Menciptakan sistem organisasi yang terbuka, akuntabel, dan dapat dipertanggungjawabkan kepada seluruh anggota",
                icon: "🔍"
              },
              {
                no: "3",
                title: "Menguatkan Partisipasi Kolektif", 
                desc: "Memastikan setiap anggota memiliki kesempatan yang sama untuk berpartisipasi dalam setiap kegiatan organisasi",
                icon: "🤝"
              },
              {
                no: "4",
                title: "Menegakkan Profesionalisme",
                desc: "Mengutamakan kualitas kerja dan dedikasi tinggi dalam setiap program dan kegiatan organisasi",
                icon: "💼"
              },
              {
                no: "5",
                title: "Menumbuhkan Solidaritas",
                desc: "Membangun rasa kebersamaan dan saling mendukung antar anggota dalam perjuangan bersama",
                icon: "✊"
              },
              {
                no: "6",
                title: "Menghidupkan Nilai Integritas dan Dedikasi",
                desc: "Menanamkan komitmen yang kuat terhadap perjuangan dan pengabdian kepada rakyat",
                icon: "❤️"
              }
            ].map((misi, index) => (
              <div key={index} className="card-base p-6 hover-group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                    {misi.no}
                  </div>
                  <div className="ml-4 text-2xl">{misi.icon}</div>
                </div>
                <h3 className="heading-card mb-3 group-hover:text-red-600 transition-colors">{misi.title}</h3>
                <p className="text-card">{misi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* T2P2SOLID Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <div style={{ height: "40px" }}></div>
            <h2 className="text-3xl font-bold mb-4">
              Pilar-Pilar <span className="text-red-500">#T2P2SOLID</span>
            </h2>
            <div className="accent-divider"></div>
            <p className="text-featured mt-6 max-w-2xl mx-auto">
              Tujuh pilar fundamental yang menjadi landasan gerakan GMNI T2P2 Unisba Blitar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Tanggung Jawab",
                subtitle: "Responsibility",
                desc: "Bertanggung jawab atas setiap tindakan dan keputusan yang diambil demi kemajuan organisasi dan masyarakat",
                color: "red",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Transparansi",
                subtitle: "Transparency", 
                desc: "Keterbukaan dalam setiap proses organisasi untuk membangun kepercayaan dan akuntabilitas",
                color: "blue",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )
              },
              {
                title: "Partisipasi",
                subtitle: "Participation",
                desc: "Melibatkan seluruh anggota dalam proses pengambilan keputusan dan pelaksanaan program",
                color: "green",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Profesionalisme",
                subtitle: "Professionalism",
                desc: "Mengutamakan kualitas kerja dan standar tinggi dalam setiap aktivitas organisasi",
                color: "purple",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" />
                  </svg>
                )
              },
              {
                title: "Solidaritas",
                subtitle: "Solidarity",
                desc: "Membangun kebersamaan dan saling mendukung dalam perjuangan mencapai tujuan bersama",
                color: "orange",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                )
              },
              {
                title: "Integritas",
                subtitle: "Integrity",
                desc: "Konsistensi antara kata dan perbuatan, menjunjung tinggi kejujuran dan nilai-nilai moral",
                color: "indigo",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                title: "Dedikasi",
                subtitle: "Dedication", 
                desc: "Pengabdian penuh terhadap perjuangan organisasi dan kepentingan rakyat marhaen",
                color: "pink",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )
              }
            ].map((pilar, index) => (
              <div key={index} className="card-base p-8 text-center hover-group">
                <div className={`w-16 h-16 bg-${pilar.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <div className={`text-${pilar.color}-500`}>
                    {pilar.icon}
                  </div>
                </div>
                <h3 className="heading-card mb-2 group-hover:text-red-600 transition-colors">{pilar.title}</h3>
                <p className="text-sm text-gray-500 mb-4 italic">({pilar.subtitle})</p>
                <p className="text-card">{pilar.desc}</p>
              </div>
            ))}
          </div>

          {/* T2P2SOLID Visual */}
          <div className="mt-16 text-center">
            <div className="card-base p-12 bg-gradient-to-br from-red-50 to-white">
              <Image
                src="https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/visi/semua.jpg"
                alt="T2P2SOLID GMNI"
                width={600}
                height={400}
                className="mx-auto rounded-lg shadow-lg mb-8"
              />
              <div className="text-4xl font-bold mb-4">
                <span className="text-red-500">#T2P2SOLID</span>
              </div>
              <p className="text-gray-700 font-medium">
                Landasan gerakan yang menguatkan soliditas organisasi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed T2P2SOLID Breakdown */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <div style={{ height: "40px" }}></div>
            <h2 className="text-3xl font-bold mb-4">
              Penjelasan <span className="text-red-500">#T2P2SOLID</span>
            </h2>
            <div className="accent-divider"></div>
          </div>

          {/* Timeline Style Layout for T2P2SOLID */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-red-400 to-red-300"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                {
                  letter: "T",
                  word: "TANGGUNG JAWAB",
                  eng: "Responsibility",
                  desc: "Setiap anggota GMNI T2P2 memiliki tanggung jawab moral dan sosial untuk menjaga nama baik organisasi serta berkontribusi positif bagi masyarakat. Tanggung jawab ini mencakup komitmen terhadap tugas, kejujuran dalam bertindak, dan keberanian mengambil keputusan yang tepat.",
                  color: "red"
                },
                {
                  letter: "T", 
                  word: "TRANSPARANSI",
                  eng: "Transparency",
                  desc: "Keterbukaan informasi dan proses pengambilan keputusan menjadi kunci kepercayaan. Setiap kegiatan, program, dan kebijakan organisasi harus dapat diakses dan dipahami oleh seluruh anggota untuk membangun akuntabilitas yang kuat.",
                  color: "red"
                },
                {
                  letter: "P",
                  word: "PARTISIPASI", 
                  eng: "Participation",
                  desc: "Memberikan kesempatan yang sama bagi setiap anggota untuk terlibat aktif dalam setiap aspek organisasi. Partisipasi aktif menciptakan rasa memiliki dan tanggung jawab bersama dalam mencapai tujuan organisasi.",
                  color: "red"
                },
                {
                  letter: "P",
                  word: "PROFESIONALISME",
                  eng: "Professionalism", 
                  desc: "Mengutamakan kualitas, efisiensi, dan standar kerja yang tinggi. Profesionalisme dalam GMNI T2P2 berarti bekerja dengan dedikasi tinggi, menggunakan metode yang tepat, dan selalu berorientasi pada hasil yang optimal.",
                  color: "red"
                },
                {
                  letter: "S",
                  word: "SOLIDARITAS",
                  eng: "Solidarity",
                  desc: "Membangun ikatan persaudaraan yang kuat antar anggota. Solidaritas bukan hanya dalam kebersamaan, tetapi juga dalam perjuangan menghadapi tantangan dan mendukung sesama dalam mencapai cita-cita bersama.",
                  color: "red"
                },
                {
                  letter: "O",
                  word: "INTEGRITAS",
                  eng: "Integrity", 
                  desc: "Konsistensi antara nilai yang dianut, kata yang diucapkan, dan tindakan yang dilakukan. Integritas menjadi fondasi kepercayaan dan kredibilitas organisasi di mata internal maupun eksternal.",
                  color: "red"
                },
                {
                  letter: "D",
                  word: "DEDIKASI",
                  eng: "Dedication",
                  desc: "Pengabdian total terhadap perjuangan organisasi dan kepentingan rakyat. Dedikasi mencerminkan komitmen jangka panjang yang tidak mudah surut meskipun menghadapi berbagai rintangan dan tantangan.",
                  color: "red"
                }
              ].map((item, index) => (
                <div key={index} className="relative flex items-start">
                  <div className={`absolute left-6 w-5 h-5 bg-${item.color}-500 rounded-full border-4 border-white shadow-lg`}></div>
                  <div className="ml-16 card-base p-8 hover-group">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-${item.color}-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4`}>
                        {item.letter}
                      </div>
                      <div>
                        <h3 className="heading-card group-hover:text-red-600 transition-colors">{item.word}</h3>
                        <p className="text-sm text-gray-500 italic">({item.eng})</p>
                      </div>
                    </div>
                    <p className="text-card">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding gradient-hero text-white">
        <div className="container-article">
          <div className="text-center">
            <div style={{ height: "40px" }}></div>
            <h2 className="text-3xl text-white font-bold mb-4">
              Bergabunglah dengan Kami
            </h2>
            <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari gerakan mahasiswa yang berlandaskan Marhaenisme dan berkomitmen pada perubahan sosial
            </p>
            
            <div className="card-base p-8 bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="space-y-4 text-white">
                <p className="text-lg font-semibold">
                  &quot;Dari Mahasiswa, Oleh Mahasiswa, Untuk Rakyat&quot;
                </p>
                <p className="text-gray-300">
                  GMNI T2P2 Unisba Blitar mengajak seluruh mahasiswa progresif untuk bersama-sama membangun masa depan yang lebih baik bagi bangsa dan rakyat Indonesia.
                </p>
              </div>
            </div>
            
            <div className="mt-8 space-y-2 text-2xl font-bold">
              <p className="text-red-400">Merdeka....!!!</p>
              <p className="text-white">GMNI, Jaya....!!!</p>
              <p className="text-red-400">Marhaen, Menang....!!!</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}