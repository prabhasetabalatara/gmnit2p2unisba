"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AspirasiPage() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center items-start">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b text-center">
            <h1 className="text-3xl font-light text-gray-900">
              Formulir Aspirasi
            </h1>
            <p className="text-gray-500 mt-2">
              Silakan isi form di bawah ini untuk menyampaikan aspirasi kamu.
            </p>
          </div>

          {/* Google Form Embed */}
          <div className="p-6">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeVCOaZ7CB-mBORyb-RPB_d0igUkw49kJFTyIX_E_WRwWmkPQ/viewform?embedded=true"
              width="100%"
              height="900"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full rounded-lg"
            >
              Memuat…
            </iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
