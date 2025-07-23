// FE-LESOR/src/services/motorService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL dasar API Laravel Anda

const getMotors = async () => {
  try {
    const response = await axios.get(`${API_URL}/motors`);
    return response.data.data; // Mengembalikan array motor
  } catch (error) {
    console.error('Error fetching motors:', error);
    throw error; // Lempar error agar bisa ditangani di komponen
  }
};

const getMotorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/motors/${id}`);
    return response.data.data; // Mengembalikan objek motor tunggal
  } catch (error) {
    console.error(`Error fetching motor with ID ${id}:`, error);
    throw error;
  }
};

// Ekspor fungsi-fungsi yang akan digunakan
export default {
  getMotors,
  getMotorById,
  // Anda bisa menambahkan fungsi lain di sini nanti, seperti createMotor, updateMotor, bidMotor
};