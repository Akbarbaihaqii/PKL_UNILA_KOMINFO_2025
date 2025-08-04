// app/components/FeedbackButton.js
'use client'; // Menandakan ini adalah Client Component

import Link from 'next/link';
import { useEffect, useState } from 'react';

const FeedbackButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Tampilkan tombol setelah scroll sedikit ke bawah
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // Tampilkan setelah scroll 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Link href="#feedback-section" scroll={true} className="block">
        <button
          // Mengubah ukuran dan padding agar lebih kecil, menghilangkan ikon
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-sm transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          aria-label="Berikan Kritik dan Saran"
        >
          {/* Ikon SVG DIHAPUS */}
          <span>Kritik Saran</span> {/* Teks "Kritik Saran" */}
        </button>
      </Link>
    </div>
  );
};

export default FeedbackButton;
