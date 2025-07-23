import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-950 text-gray-500 p-6 mt-8 shadow-inner border-t border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {currentYear} Lesor (Lelang Ansor). All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Dibuat dengan ❤️ untuk Lelang Motor Eksklusif.
        </p>
      </div>
    </footer>
  );
}

export default Footer;