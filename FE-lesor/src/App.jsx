// FE-LESOR/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import AuctionDetailPage from './pages/AuctionDetail/AuctionDetailPage'; // Pastikan ini di-uncomment

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auctions" element={<HomePage />} />
          <Route path="/auctions/:id" element={<AuctionDetailPage />} /> {/* Pastikan ini di-uncomment */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Rute lainnya akan ditambahkan di sini nanti */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;