// app/layout.js
'use client'; // Menandakan ini adalah Client Component

import './globals.css';
import Navbar from './components/Navbar'; // Pastikan Navbar diimpor
import Script from 'next/script'; // Import komponen Script dari Next.js
import { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, useRef
import AudioNotificationModal from './components/AudioNotificationModal'; // Import komponen modal notifikasi

export default function RootLayout({ children }) {
  const audioRef = useRef(null); // Ref untuk elemen audio
  const [showAudioNotification, setShowAudioNotification] = useState(true); // State untuk menampilkan/menyembunyikan notifikasi

  // Efek untuk menginisialisasi audioRef dan mencoba autoplay muted
  useEffect(() => {
    audioRef.current = document.getElementById('background-music');
    if (audioRef.current) {
      // Pastikan audio dimulai dalam keadaan muted
      audioRef.current.muted = true;
      audioRef.current.play().catch(e => console.log("Autoplay muted dicegah:", e));
    }
  }, []);

  // Fungsi yang dipanggil saat tombol di notifikasi diklik
  const handleEnableAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = false; // Unmute audio
      audioRef.current.play().catch(e => console.error("Gagal memutar audio setelah unmute:", e));
    }
    setShowAudioNotification(false); // Sembunyikan notifikasi
  };

  return (
    <html lang="id">
      <head>
        {/* Font Awesome untuk ikon (pastikan ini ada jika Anda menggunakannya) */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" xintegrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="bg-blue-950">
        {/* Tag Audio untuk Autoplay dan Loop, dimulai dengan muted */}
        <audio autoPlay loop muted id="background-music" preload="auto">
          <source src="/LAGUWEB.mp3" type="audio/mpeg" /> {/* Pastikan path dan nama file benar */}
          Browser Anda tidak mendukung elemen audio.
        </audio>

        {/* Notifikasi Pop-up Audio */}
        {showAudioNotification && (
          <AudioNotificationModal onEnableAudio={handleEnableAudio} />
        )}
        
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
