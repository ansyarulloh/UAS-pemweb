// FE-LESOR/src/pages/AuctionDetail/AuctionDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import motorService from '../../services/motorService'; // Import motorService (sesuaikan path)

// Hapus atau komen definisi dummyMotors di sini, kita akan pakai data dari API
// const dummyMotors = [...]; // <-- Hapus atau Komen baris ini

function AuctionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [motor, setMotor] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
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

  // Effect untuk mengambil data motor berdasarkan ID dari API
  useEffect(() => {
    const fetchMotor = async () => {
      try {
        setLoading(true);
        const data = await motorService.getMotorById(id);
        setMotor(data);
        setTimeRemaining(calculateTimeRemaining(data.end_time)); // Gunakan end_time dari DB
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Motor tidak ditemukan.');
          // Opsional: arahkan ke halaman 404 atau kembali ke beranda
          // navigate('/auctions');
        } else {
          setError('Gagal memuat detail motor. Silakan coba lagi nanti.');
        }
        console.error(err);
        setMotor(null); // Penting untuk mereset motor jika ada error
      } finally {
        setLoading(false);
      }
    };

    fetchMotor();
  }, [id, navigate]); // Bergantung pada ID dan fungsi navigate

  // Effect untuk timer dinamis (tetap sama, disesuaikan ke motor.end_time)
  useEffect(() => {
    if (!motor || motor.status === 'closed') return;

    const interval = setInterval(() => {
      const time = calculateTimeRemaining(motor.end_time); // Gunakan end_time
      setTimeRemaining(time);
      if (time.expired) {
        setMotor(prevMotor => ({ ...prevMotor, status: 'closed' }));
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [motor]);

  if (loading) {
    return <div className="text-center py-10 text-xl text-gray-400">Memuat detail motor...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-500">{error}</div>;
  }

  if (!motor) { // Jika loading selesai tapi motor null (misal 404)
     return <div className="text-center py-10 text-xl text-gray-400">Motor tidak ditemukan.</div>;
  }

  return (
    <div className="auction-detail-page py-8">
      <h2 className="text-4xl font-extrabold text-amber-400 text-center mb-10">
        Detail Lelang: {motor.name}
      </h2>

      <div className="bg-gray-800 rounded-lg shadow-xl p-8 mb-8 flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="lg:w-1/2 w-full flex-shrink-0">
          <img
            src={motor.image_url || 'https://via.placeholder.com/800x600/1e293b/FFFFFF?text=No+Image'} // Gunakan image_url dari DB
            alt={motor.name}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <h3 className="text-3xl font-bold text-amber-400 mb-4">{motor.name}</h3>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">{motor.description}</p>

          {/* Spesifikasi masih dummy, nanti bisa dari DB jika Anda tambahkan kolom specs di DB */}
          <div className="grid grid-cols-2 gap-4 text-gray-300 text-md mb-6 border-t border-b border-gray-700 py-4">
            <div><strong>Tahun:</strong> N/A</div>
            <div><strong>Jarak Tempuh:</strong> N/A</div>
            <div><strong>Warna:</strong> N/A</div>
            <div><strong>Lokasi:</strong> N/A</div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-400 text-md">Harga Awal:</p>
              <p className="text-white font-semibold text-2xl">{formatCurrency(motor.starting_price)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-md">Penawaran Tertinggi:</p>
              <p className="text-amber-300 font-bold text-3xl">{formatCurrency(motor.current_price)}</p>
            </div>
          </div>

          <div className="text-center bg-gray-700 p-4 rounded-md mb-6">
            {motor.status === 'open' && timeRemaining ? (
              <p className="text-yellow-200 font-bold text-xl animate-pulse">
                Sisa Waktu: {renderTime(motor.end_time, motor.status)} {/* Gunakan end_time */}
              </p>
            ) : (
              <p className="text-red-400 font-bold text-xl">
                {renderTime(motor.end_time, motor.status)} {/* Gunakan end_time */}
              </p>
            )}
          </div>

          {motor.status === 'open' && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-200 mb-3">Ajukan Penawaran Anda</h4>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder={`Minimal ${formatCurrency(motor.current_price + 100000)}`}
                  className="flex-grow p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-6 rounded-md transition duration-300 shadow-md">
                  Tawar Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Histori Penawaran (masih dummy atau kosong, nanti dari API) */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-8">
        <h4 className="text-2xl font-semibold text-amber-400 mb-6">Histori Penawaran</h4>
        {/* Untuk saat ini, bidHistory belum ada di API, jadi kita tampilkan pesan ini */}
        <p className="text-gray-400 text-center">Belum ada histori penawaran dari database.</p>
        {/* Jika nanti ada bidHistory dari API, bisa di-map di sini */}
        {/*
        {motor.bidHistory && motor.bidHistory.length > 0 ? (
          <ul className="divide-y divide-gray-700">
            {motor.bidHistory.map((bid, index) => (
              <li key={index} className="py-3 flex justify-between items-center text-gray-300">
                <div>
                  <span className="font-semibold text-lg text-white">{bid.user_name}</span> // Sesuaikan dengan nama user dari API
                  <span className="ml-2 text-sm text-gray-400">{new Date(bid.created_at).toLocaleString('id-ID')}</span>
                </div>
                <span className="text-amber-300 font-bold text-lg">{formatCurrency(bid.bid_amount)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">Belum ada penawaran untuk motor ini.</p>
        )}
        */}
      </div>
    </div>
  );
}

export default AuctionDetailPage;