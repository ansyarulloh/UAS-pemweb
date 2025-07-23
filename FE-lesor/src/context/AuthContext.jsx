// FE-LESOR/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    // Setelah login berhasil, panggil getUser untuk mendapatkan data user yang terautentikasi
    const loggedInUser = await authService.getUser();
    setUser(loggedInUser); // Update state user
    return response; // Kembalikan response dari login jika dibutuhkan di komponen login page
  };

  const logout = async () => {
    await authService.logout();
    setUser(null); // Set user menjadi null setelah logout
  };

  // Ini yang dijalankan saat AuthProvider pertama kali dimuat (untuk cek sesi)
  useEffect(() => {
    const checkUser = async () => {
      try {
        const loggedInUser = await authService.getUser(); // Coba ambil user dari sesi
        setUser(loggedInUser);
      } catch (error) {
        console.error('Error checking user session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          Memuat sesi pengguna...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};