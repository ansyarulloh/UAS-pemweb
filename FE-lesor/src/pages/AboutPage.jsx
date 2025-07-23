// FE-LESOR/src/pages/AboutPage.jsx
import React from 'react';

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-800 rounded-lg shadow-xl my-8 mx-auto max-w-3xl">
      <h2 className="text-4xl font-extrabold text-amber-400 mb-6">
        Tentang Lesor (Lelang Ansor)
      </h2>
      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
        Lesor adalah platform lelang motor online terkemuka yang didedikasikan untuk memberikan pengalaman lelang yang transparan, aman, dan eksklusif. Kami menghubungkan penjual motor berkualitas tinggi dengan pembeli yang mencari kendaraan impian mereka.
      </p>
      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
        Dengan antarmuka yang intuitif dan fitur-fitur canggih, Lesor memastikan setiap transaksi berjalan lancar. Bergabunglah dengan komunitas kami dan temukan berbagai pilihan motor, dari klasik hingga modern, dengan harga terbaik melalui sistem penawaran kompetitif kami.
      </p>
      <p className="text-md text-gray-400 mt-6">
        Visi kami adalah menjadi destinasi utama bagi para pecinta motor untuk jual beli melalui lelang digital.
      </p>
    </div>
  );
}

export default AboutPage;