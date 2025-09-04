"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function StrukturOrganisasiPage() {
  const pengurus = {
    pimpinan: [
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/1.webp", nama: "Ahmad Bagus Ramadhan", jabatan: "Ketua" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/2.webp", nama: "Ardian Nugraha Ardi", jabatan: "Sekretaris" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/3.webp", nama: "Florentia Callista Billa M", jabatan: "Bendahara" }
    ],
    bidangKaderisasi: [
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/4.webp", nama: "Abi Adilla Khas", jabatan: "Wakabid" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/5.webp", nama: "M Azkarmin Muhusini", jabatan: "Biro" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/6.webp", nama: "Putri Perwitasari", jabatan: "Biro" }
    ],
    bidangPolitik: [
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/14.webp", nama: "Esa Bagus Kurniawan", jabatan: "Wakabid" }
    ],
    bidangSarinah: [
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/7.webp", nama: "Henri Dunand", jabatan: "Wakabid" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/8.webp", nama: "Angela Zena Agustira", jabatan: "Biro" }
    ],
    bidangOrganisasi: [
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/9.webp", nama: "M. Diki Fahriza", jabatan: "Wakabid" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/10.webp", nama: "Abimayu Latipe P", jabatan: "Biro" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/11.webp", nama: "Nedy Bagus Wicaksono", jabatan: "Biro" }
    ],
    bidangAgitprop: [
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/12.webp", nama: "Rafif Taufiqurahman", jabatan: "Wakabid" },
      { img: "https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/pengurus/13.webp", nama: "M Saifuddin Zuhri", jabatan: "Biro" }
    ]
  };



  interface Person {
    img: string;
    nama: string;
    jabatan: string;
  }

  const PersonCard = ({ person }: { person: Person }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="relative">
        <img
          src={person.img}
          alt={person.nama}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 text-center">
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-red-600 transition-colors">{person.nama}</h3>
        <p className="text-red-500 font-medium text-sm bg-red-50 px-3 py-1 rounded-full inline-block">{person.jabatan}</p>
      </div>
    </div>
  );

  const SectionTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{children}</h2>
      <div className="w-16 h-1 bg-red-500 mx-auto"></div>
    </div>
  );

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <img
                src="https://gqdbqvxnctxrgtjimqxn.supabase.co/storage/v1/object/public/foto/logo/logogmni.png"
                alt="Logo GMNI"
                className="w-32 h-32 mx-auto animate-pulse"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              DPK<span className="text-yellow-300"> GMNI</span>
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
              Teknik dan Informatika Pertanian dan Peternakan (T2P2) UNISBA BLITAR
            </p>
            <p className="text-2xl font-semibold mt-4 text-yellow-300">
              Periode 2025/2026
            </p>
          </div>
        </div>
      </section>

      {/* Pimpinan Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>
            Pimpinan DPK T2P2
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pengurus.pimpinan.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Bidang Kaderisasi */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>
            Bidang Kaderisasi
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pengurus.bidangKaderisasi.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Bidang Politik */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>
            Bidang Politik
          </SectionTitle>
          
          <div className="grid md:grid-cols-1 gap-8 mb-16 max-w-md mx-auto">
            {pengurus.bidangPolitik.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Bidang Sarinah */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>
            Bidang Sarinah
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {pengurus.bidangSarinah.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Bidang Organisasi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>
            Bidang Organisasi
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pengurus.bidangOrganisasi.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Bidang Agitasi dan Propaganda */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle>
            Bidang Agitasi dan Propaganda
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {pengurus.bidangAgitprop.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}