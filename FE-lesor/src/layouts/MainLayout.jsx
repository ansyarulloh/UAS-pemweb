// FE-LESOR/src/layouts/MainLayout.jsx
import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full"> {/* Tambahkan w-full di sini */}
      <Header />
      <Navbar />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8"> {/* Ini sudah benar untuk konten */}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;