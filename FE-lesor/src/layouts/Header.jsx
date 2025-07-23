// FE-LESOR/src/layouts/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Pastikan ini diimpor

function Header() {
  const { user, logout } = useAuth(); // Pastikan user dan logout diambil dari useAuth
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Arahkan ke halaman login setelah logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Tampilkan pesan error jika diperlukan
    }
  };

  return (
    <header className="bg-gray-950 text-white p-4 shadow-xl border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-4xl font-extrabold text-amber-400 tracking-wider hover:text-amber-300 transition duration-300">Lesor</Link>
          <span className="ml-2 text-md text-gray-400 italic">(Lelang Ansor)</span>
        </div>

        <nav className="space-x-4">
          {user ? ( // <<<--- BAGIAN KONDISIONAL INI SANGAT PENTING
            <div className="flex items-center space-x-4">
              <span className="text-white text-lg font-medium">Halo, {user.name} ({user.role})</span> {/* Pastikan user.name dan user.role ada */}
              <button
                onClick={handleLogout} // Pastikan onClick memanggil handleLogout
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          ) : ( // <<<--- BAGIAN JIKA USER BELUM LOGIN
            <> {/* Fragment ini diperlukan jika ada lebih dari satu elemen di sini */}
              <Link
                to="/login"
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300 shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300 shadow-md"
              >
                Daftar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;