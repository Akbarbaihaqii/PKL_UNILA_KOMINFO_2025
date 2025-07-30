// app/components/AppFooter.js
'use client'; // Opsional, hanya jika ada interaktivitas di footer

import React from 'react';

const AppFooter = () => {
  return (
    <footer className="bg-blue-950 text-white py-6 mt-12"> {/* mt-12 untuk jarak dari section di atasnya */}
      <div className="container mx-auto px-4 text-center text-sm text-blue-200">
        &copy; {new Date().getFullYear()} Tim PKL Universitas Lampung & Diskominfo Kota Bandar Lampung. All rights reserved.
      </div>
    </footer>
  );
};

export default AppFooter;
