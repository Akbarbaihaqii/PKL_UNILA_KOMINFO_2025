// app/components/AudioNotificationModal.js
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const AudioNotificationModal = ({ onEnableAudio }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    setShowModal(false);
    setTimeout(() => {
      onEnableAudio();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center p-4 z-[9999] backdrop-blur-xl transition-opacity duration-500 ${showModal ? 'opacity-100' : 'opacity-0'}`}
         style={{
           background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 50%, rgba(0, 0, 0, 0.3) 100%)'
         }}>
      
      <div className={`bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl shadow-2xl p-6 md:p-8 max-w-sm w-full text-center transform transition-all duration-500 ease-out border-4 border-blue-600 ${showModal ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>

        {/* Image Section - Tanpa margin bawah */}
        <div className="mb-0 flex justify-center w-full">
          <Image
            src="images/LG_1.png"
            alt="Tim PKL Unila Kominfo"
            width={580}
            height={280}
            className="rounded-lg object-cover"
            unoptimized
            priority
          />
        </div>

        {/* Content Section - Hapus space-y, gunakan margin-top pada elemen jika perlu */}
        <div className="mt-1">
          {/* Teks Deskripsi - Gunakan margin-top negatif untuk merapatkan ke gambar */}
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed -mt-2 mb-4 px-2">
            Website ini dibangun sebagai bentuk ucapan terimakasih dan juga kenang-kenangan untuk instansi DISKOMINFO Kota Bandar Lampung yang sudah menerima dan memberikan pembelajaran berharga untuk kami selama 40 hari.
          </p>

          <button
            onClick={handleButtonClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full shadow-lg flex items-center justify-center text-sm md:text-base transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            <i className="fas fa-solid fa-hand-point-up mr-2 text-base"></i>
            Ketuk untuk ke tampilan
          </button>

          <p className="text-xs text-gray-500 mt-3">
            (Website senang-senang)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioNotificationModal;