// app/components/GreetingSection.js
'use client';

import { useEffect, useState } from 'react';

const GreetingSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Kami mengucapkan terima kasih yang sebesar-besarnya kepada Dinas Komunikasi dan Informatika Kota Bandar Lampung atas kesempatan dan bimbingan yang telah diberikan dalam praktik kerja lapangan kami, setiap pertemuan ada perpisahan. Akhir kata kami mohon maaf kepada Diskominfo apabila ada perilaku dan perkataan kami yang kurang baik dan berkenan, terimakasih kominfo balam.";
  const typingSpeed = 30; // Milliseconds per character
  const eraseSpeed = 30;
  const newTextDelay = 2000;
  const eraseDelay = 1000;

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      if (!isDeleting && charIndex < fullText.length) {
        setTypedText(fullText.substring(0, charIndex + 1));
        charIndex++;
      } else if (isDeleting && charIndex > 0) {
        setTypedText(fullText.substring(0, charIndex - 1));
        charIndex--;
      } else if (!isDeleting && charIndex === fullText.length) {
        setTimeout(() => isDeleting = true, newTextDelay);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setTimeout(type, newTextDelay); // Restart typing after a delay
      }
    };

    const typingInterval = setInterval(type, typingSpeed);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative w-full h-[550px] md:h-[700px] flex items-center justify-center text-white text-center pt-20">
      {/* Hapus style background-image dari section.
          Gantinya, terapkan gradien langsung pada div overlay
          Ini lebih mudah dikontrol dan menghilangkan masalah background-image yang tidak tampil. */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center p-6 md:p-10"
        style={{
          // Terapkan gradien langsung di sini sebagai latar belakang overlay
          backgroundImage: 'linear-gradient(135deg, #0b2058ff 0%, #007bffff 100%)', // Gradien biru Kominfo
          // Tambahkan opasitas jika diperlukan, bisa dengan rgba() di warna atau Tailwind bg-opacity
          // Contoh: Latar belakang gradien + sedikit transparan di atasnya untuk teks
          // Ini tidak akan jadi "gelap total" karena gradiennya langsung diterapkan
        }}
      >
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 drop-shadow-lg leading-tight animate-fade-in">
          DISKOMINFO
          <br/>
          KOTA BANDAR LAMPUNG
        </h1>
        <p className="text-base md:text-xl font-light max-w-4xl px-4 mb-8 type-animation">
          {typedText}
          <span className="animate-blink-caret">|</span> {/* Blinking cursor */}
        </p>
        <span className="text-sm md:text-lg italic text-blue-300">
          16 Juni - 1 Agustus 2025
        </span>
      </div>
      {/* Gaya .type-animation dll. ada di globals.css */}
    </section>
  );
};

export default GreetingSection;