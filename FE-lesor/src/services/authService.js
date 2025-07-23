// FE-LESOR/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL dasar API Laravel Anda

// Fungsi untuk mendapatkan CSRF cookie (Penting untuk Laravel Sanctum)
const getCsrfCookie = async () => {
  try {
    // Sanctum akan secara otomatis mengirim CSRF token ke endpoint /sanctum/csrf-cookie
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
    console.log('CSRF cookie obtained.');
  } catch (error) {
    console.error('Failed to get CSRF cookie:', error);
    throw error;
  }
};

const register = async (userData) => {
  await getCsrfCookie(); // Pastikan mendapatkan CSRF cookie sebelum POST
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (credentials) => {
  await getCsrfCookie(); // Pastikan mendapatkan CSRF cookie sebelum POST
  const response = await axios.post(`${API_URL}/login`, credentials);
  // Jika login berhasil, Sanctum akan set session cookie di browser
  return response.data;
};

const logout = async () => {
  try {
    await getCsrfCookie(); // Opsional, tapi bisa bantu memastikan sesi bersih
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

const getUser = async () => {
  try {
    // Sanctum secara otomatis akan menggunakan session cookie untuk mengautentikasi
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    // Ini akan menangkap error 401 jika user belum login
    if (error.response && error.response.status === 401) {
        return null; // Pengguna belum terautentikasi
    }
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export default {
  register,
  login,
  logout,
  getUser,
};