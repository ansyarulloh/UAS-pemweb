// FE-LESOR/src/layouts/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

function Navbar() {
  return (
    <nav className="bg-gray-800 text-gray-200 p-3 shadow-inner">
      <div className="container mx-auto flex justify-start space-x-8">
        {/* Gunakan <Link> daripada <a> */}
        <Link to="/" className="hover:text-amber-400 transition duration-300 font-medium text-lg">Beranda</Link>
        <Link to="/auctions" className="hover:text-amber-400 transition duration-300 font-medium text-lg">Daftar Lelang</Link>
        <Link to="/about" className="hover:text-amber-400 transition duration-300 font-medium text-lg">Tentang Kami</Link>
        {/* Jika nanti ada halaman spesifik */}
        {/* <Link to="/login" className="hover:text-amber-400 transition duration-300 font-medium text-lg">Login</Link> */}
        {/* <Link to="/register" className="hover:text-amber-400 transition duration-300 font-medium text-lg">Register</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;