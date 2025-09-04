"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function KontakPage() {
  const kontakPersons = [
    {
      nama: "Adrian Nugraha Ardi",
      nohp: "+62 857-0656-8932",
      waLink: "https://wa.me/6285706568932"
    },
    {
      nama: "Aby Adilla Khas",
      nohp: "+62 815-5367-0516",
      waLink: "https://wa.me/6281553670516"
    },
    {
      nama: "Ahmad Bagus Ramadan",
      nohp: "+62 818-0421-1338",
      waLink: "https://wa.me/6281804211338"
    }
  ];

  const socialMedia = [
    {
      nama: "Email",
      link: "mailto:dpk.t2p2.blitar",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      nama: "Instagram",
      link: "https://www.instagram.com/dpk_gmni.t2p2?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: "bg-pink-500 hover:bg-pink-600"
    },
    {
      nama: "TikTok",
      link: "https://www.tiktok.com/@dpk.t2p2.gmni.uni?_t=ZS-8zRM4mErrKT&_r=1",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: "bg-black hover:bg-gray-800"
    }
  ];

  return (
    <>
      <Navbar />
      <section className="pt-24 pb-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-12 text-center text-red-600">
            Kontak Kami
          </h1>

          {/* Alamat Section */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Alamat
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Jl. DR. Sutomo, Sananwetan, Kec. Sananwetan, Kota Blitar, Jawa Timur 66137
              </p>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-2xl shadow-md p-4 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d228.87542211369927!2d112.17896587768699!3d-8.098447648010062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1756970034051!5m2!1sid!2sid" 
                width="100%" 
                height="400" 
                style={{border:0, borderRadius: "12px"}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Kontak Person Section */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Kontak Person
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kontakPersons.map((person, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 mb-2">{person.nama}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{person.nohp}</span>
                      <a
                        href={person.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors group"
                        title="Chat WhatsApp"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Sosial Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7M5 7h14l-1 10H6L5 7z" />
                </svg>
                Media Sosial
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-4 rounded-xl flex items-center space-x-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
                  >
                    <div className="group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                    <span className="font-semibold">{social.nama}</span>
                    <div className="ml-auto opacity-70 group-hover:opacity-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}