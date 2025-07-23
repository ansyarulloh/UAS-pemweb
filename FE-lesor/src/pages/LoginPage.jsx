// FE-LESOR/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import authService from '../services/authService'; // Tidak lagi perlu import authService di sini
import { useAuth } from '../context/AuthContext'; // Import useAuth

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // <<<--- Ambil fungsi login dari AuthContext

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(credentials); // <<<--- Panggil fungsi login dari AuthContext
      console.log('Login successful.'); // Tidak perlu data return karena sudah di AuthContext
      navigate('/'); // Arahkan user setelah login
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(Object.values(err.response.data.errors).flat().join(' '));
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Terjadi kesalahan saat login.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-amber-400 mb-6">Login ke Lesor</h2>
        <p className="text-gray-300 mb-4">Masukkan kredensial Anda untuk masuk.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? 'Masuk...' : 'Login'}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">Belum punya akun? <Link to="/register" className="text-amber-400 hover:underline">Daftar di sini</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;