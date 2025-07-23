// FE-LESOR/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import authService from '../services/authService'; // Import authService

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '', // Penting untuk validasi 'confirmed' di Laravel
    role: 'masyarakat', // Default role masyarakat
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(null);

    try {
      const data = await authService.register(formData);
      setMessage(data.message || 'Registrasi berhasil! Menunggu verifikasi administrator.');
      // Opsional: reset form atau arahkan ke halaman login
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'masyarakat',
      });
      // setTimeout(() => navigate('/login'), 3000); // Arahkan ke login setelah 3 detik
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(Object.values(err.response.data.errors).flat().join(' ')); // Tampilkan semua error validasi
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Terjadi kesalahan saat registrasi.');
      }
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-amber-400 mb-6">Daftar Akun Baru</h2>
        <p className="text-gray-300 mb-4">Isi data diri Anda untuk membuat akun Lesor.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {message && <p className="text-green-400 text-sm">{message}</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password_confirmation" // Penting: nama ini harus sesuai
              placeholder="Konfirmasi Password"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="masyarakat">Masyarakat</option>
              {/* <option value="petugas">Petugas</option> */} {/* Untuk saat ini, jangan biarkan user register sebagai petugas/admin */}
              {/* <option value="administrator">Administrator</option> */}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">Sudah punya akun? <Link to="/login" className="text-amber-400 hover:underline">Login di sini</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;