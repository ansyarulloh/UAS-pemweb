// FE-LESOR/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import motorService from '../services/motorService'; // Import motorService

// Hapus atau komen definisi dummyMotors di sini, kita akan pakai data dari API
// const dummyMotors = [...]; // <-- Hapus atau Komen baris ini

function HomePage() {
  const [motors, setMotors] = useState([]); // Inisialisasi dengan array kosong
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds, expired: false };
  };

  const renderTime = (endTime, status) => {
    if (status === 'closed') {
      return 'Lelang Telah Berakhir';
    }
    const time = calculateTimeRemaining(endTime);
    if (time.expired) {
      return 'Lelang Telah Berakhir';
    }
    return `${time.days > 0 ? time.days + ' hari ' : ''}${time.hours} jam ${time.minutes} menit ${time.seconds} detik`;
  };

  // Effect untuk mengambil data motor dari API
  useEffect(() => {
    const fetchMotors = async () => {
      try {
        setLoading(true);
        const data = await motorService.getMotors();
        setMotors(data);
        setError(null);
      } catch (err) {
        setError('Gagal memuat daftar motor. Silakan coba lagi nanti.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotors(); // Panggil fungsi fetch saat komponen mount

    // Effect untuk mengatur interval timer (tetap sama)
    const interval = setInterval(() => {
      setMotors(prevMotors =>
        prevMotors.map(motor => {
          if (motor.status === 'open') {
            const time = calculateTimeRemaining(motor.end_time); // Gunakan end_time dari DB
            if (time.expired) {
              return { ...motor, status: 'closed' };
            }
          }
          return motor;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Dependency array kosong

  if (loading) {
    return <div className="text-center py-10 text-xl text-gray-400">Memuat daftar motor...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="home-page py-8">
      <h2 className="text-4xl font-extrabold text-amber-400 text-center mb-12">
        Daftar Lelang Motor Eksklusif
      </h2>

      {/* Bagian Pencarian dan Filter tetap sama */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
        <p className="text-lg text-gray-300 mb-4">Cari dan Filter Motor:</p>
        <input
          type="text"
          placeholder="Cari motor..."
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <div className="flex space-x-4">
          <select className="flex-grow p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500">
            <option value="">Urutkan Berdasarkan...</option>
            <option value="name-asc">Nama (A-Z)</option>
            <option value="name-desc">Nama (Z-A)</option>
            <option value="price-asc">Harga (Terendah)</option>
            <option value="price-desc">Harga (Tertinggi)</option>
          </select>
          <select className="flex-grow p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500">
            <option value="">Status Lelang</option>
            <option value="open">Sedang Berlangsung</option>
            <option value="closed">Selesai</option>
            <option value="upcoming">Akan Datang</option>
          </select>
        </div>
      </div>


      {motors.length === 0 ? (
        <p className="text-center text-gray-400 text-xl mt-10">Tidak ada motor yang sedang dilelang saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {motors.map((motor) => (
            <div
              key={motor.id}
              className={`bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105
                ${motor.status === 'closed' ? 'opacity-70 grayscale' : ''}
              `}
            >
              <img
                src={motor.image_url || 'https://via.placeholder.com/400x300/1e293b/FFFFFF?text=No+Image'} // Gunakan image_url dari DB
                alt={motor.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">{motor.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{motor.description}</p>

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-gray-300 text-sm">Harga Awal:</p>
                    <p className="text-white font-semibold text-lg">{formatCurrency(motor.starting_price)}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Penawaran Tertinggi:</p>
                    <p className="text-amber-300 font-bold text-xl">{formatCurrency(motor.current_price)}</p>
                  </div>
                </div>

                <div className="text-center bg-gray-700 p-3 rounded-md mb-4">
                  {motor.status === 'open' ? (
                    <p className="text-yellow-200 font-bold text-md animate-pulse">
                      Sisa Waktu: {renderTime(motor.end_time, motor.status)} {/* Gunakan end_time */}
                    </p>
                  ) : (
                    <p className="text-red-400 font-bold text-md">
                      {renderTime(motor.end_time, motor.status)} {/* Gunakan end_time */}
                    </p>
                  )}
                </div>

                <Link
                  to={`/auctions/${motor.id}`}
                  className={`w-full py-3 rounded-md font-bold text-lg text-center block transition duration-300
                    ${motor.status === 'open'
                      ? 'bg-amber-500 hover:bg-amber-600 text-gray-900 shadow-md'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                >
                  {motor.status === 'open' ? 'Ikuti Lelang' : 'Lihat Detail'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;