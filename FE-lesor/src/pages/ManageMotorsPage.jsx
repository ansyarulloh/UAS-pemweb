// FE-LESOR/src/pages/ManageMotorsPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function ManageMotorsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [motors, setMotors] = useState([]); // Akan diisi dari API
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);

  // Proteksi rute: Hanya petugas atau administrator yang bisa akses
  useEffect(() => {
    if (!loading && (!user || (user.role !== 'petugas' && user.role !== 'administrator'))) {
      navigate('/'); // Redirect jika bukan petugas/admin
    } else if (user && (user.role === 'petugas' || user.role === 'administrator')) {
      // Panggil API untuk mendapatkan daftar motor yang dikelola
      fetchManagedMotors();
    }
  }, [user, loading, navigate]);

  const fetchManagedMotors = async () => {
    // Nanti kita akan panggil API seperti: motorService.getManagedMotors()
    // Untuk saat ini, dummy data
    const dummyManagedMotors = [
      { id: 101, name: 'Honda CBR 250RR', status: 'open', price: 60000000, addedBy: 'Petugas A', endTime: '2025-08-01T10:00:00Z' },
      { id: 102, name: 'Yamaha R25', status: 'upcoming', price: 55000000, addedBy: 'Petugas B', endTime: '2025-08-05T14:00:00Z' },
      { id: 103, name: 'Suzuki GSX-R150', status: 'closed', price: 30000000, addedBy: 'Petugas A', endTime: '2025-07-20T12:00:00Z' },
    ];
    setMotors(dummyManagedMotors);
    setPageLoading(false);
  };

  const handleToggleStatus = (motorId, currentStatus) => {
    console.log(`Toggle status for motor ID: ${motorId} from ${currentStatus}`);
    // Logika untuk mengirim permintaan update status ke backend
    // Untuk sementara, update state di frontend
    setMotors(motors.map(m => m.id === motorId ? { ...m, status: currentStatus === 'open' ? 'closed' : 'open' } : m));
  };

  const handleDeleteMotor = (motorId) => {
    console.log(`Delete motor ID: ${motorId}`);
    // Logika untuk mengirim permintaan hapus ke backend
    // Untuk sementara, update state di frontend
    setMotors(motors.filter(m => m.id !== motorId));
  };

  if (loading || pageLoading) {
    return <div className="text-center py-10 text-xl text-gray-400">Memuat daftar motor manajemen...</div>;
  }

  if (!user || (user.role !== 'petugas' && user.role !== 'administrator')) {
    return <div className="text-center py-10 text-xl text-red-500">Akses Ditolak. Anda tidak memiliki izin untuk melihat halaman ini.</div>;
  }

  return (
    <div className="manage-motors-page py-8">
      <h2 className="text-4xl font-extrabold text-amber-400 text-center mb-10">
        Kelola Motor Lelang
      </h2>

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end mb-6">
          <Link to="/add-motor" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2 px-4 rounded-md shadow-md transition duration-300">
            + Tambah Motor Baru
          </Link>
        </div>
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gray-600 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nama Motor</th>
              <th className="py-3 px-6 text-left">Harga</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Ditambahkan Oleh</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {motors.map((motor) => (
              <tr key={motor.id} className="border-b border-gray-600 hover:bg-gray-750">
                <td className="py-3 px-6 text-left whitespace-nowrap">{motor.name}</td>
                <td className="py-3 px-6 text-left">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(motor.price)}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs font-semibold
                    ${motor.status === 'open' ? 'bg-green-600' : motor.status === 'upcoming' ? 'bg-blue-600' : 'bg-red-600'}`}>
                    {motor.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{motor.addedBy}</td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(motor.id, motor.status)}
                    className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-md text-xs transition duration-300 mr-2
                      ${motor.status === 'closed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={motor.status === 'closed'}
                  >
                    {motor.status === 'open' ? 'Tutup Lelang' : 'Buka Lelang'}
                  </button>
                  <Link to={`/edit-motor/${motor.id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md text-xs transition duration-300 mr-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteMotor(motor.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md text-xs transition duration-300"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {motors.length === 0 && !pageLoading && (
          <p className="text-center text-gray-400 py-6">Tidak ada motor yang dikelola.</p>
        )}
      </div>
    </div>
  );
}

export default ManageMotorsPage;