// app/components/ProjectSection.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectDetailModal from './ProjectDetailModal'; // Import komponen modal proyek

const projects = [
  {
    id: 1,
    title: 'SIADIK Kota Bandar Lampung',
    description: 'Sistem Absensi Digital Kominfo Kota Bandar Lampung. Aplikasi web ini membantu DISKOMINFO kota dalam absensi, dengan menggunakan barcode. Ini adalah proyek penting kami yang mengintegrasikan teknologi modern untuk efisiensi administrasi.',
    imageUrl: '/images/siadik.png', // Menggunakan logo Kominfo, pastikan objectFit="contain" di bawah
    url: 'https://siadik.bandarlampungkota.go.id/login',
  },
  {
    id: 2,
    title: 'SPBE Kota Bandar Lampung',
    description: 'Sistem Pemerintahan Berbasis Elektronik (SPBE) adalah penyelenggaraan pemerintahan yang memanfaatkan teknologi informasi dan komunikasi untuk memberikan layanan kepada Pengguna SPBE. SPBE ditujukan untuk untuk mewujudkan tata kelola pemerintahan yang bersih, efektif, transparan, dan akuntabel serta pelayanan publik yang berkualitas dan terpercaya.',
    imageUrl: '/images/SPBE.png', // Menggunakan logo Kominfo, pastikan objectFit="contain" di bawah
    url: 'https://spbe.bandarlampungkota.go.id/',
  },
];

const ProjectSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null); // State baru untuk proyek yang dipilih

  const calculateItemsPerView = () => {
    if (typeof window === 'undefined') return 3;

    if (window.innerWidth >= 1280) { // xl breakpoint
      return 3;
    } else if (window.innerWidth >= 1024) { // lg breakpoint
      return 3;
    } else if (window.innerWidth >= 768) { // md breakpoint
      return 2;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(calculateItemsPerView());
    };

    setItemsPerView(calculateItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalScrollablePositions = projects.length - itemsPerView + 1;
  const totalSlides = Math.max(1, totalScrollablePositions);

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
    setCurrentIndex(0);
  }, [totalSlides]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-white relative"> {/* Latar belakang section tetap netral */}
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-3 drop-shadow-md"
          style={{
            // Gradien teks untuk "Hasil Project Kami"
            // Menggunakan warna biru yang lebih cerah dan kontras untuk gradien teks
            backgroundImage: 'linear-gradient(to right, #007bff, #00c6ff)', // Dari biru cerah ke biru muda terang
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent', // Membuat teks transparan agar gradien terlihat
          }}
        >
          Hasil Project Kami
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-xl mx-auto mb-7"> {/* Warna teks deskripsi tetap abu-abu agar terbaca di latar belakang putih */}
          Berikut adalah proyek kerja praktik yang telah kami selesaikan.
        </p>

        <div className="relative overflow-hidden w-full px-4 md:px-0">
          <div
            className="flex transition-transform duration-700 ease-in-out -mx-4"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className={`flex-shrink-0 p-4`}
                style={{ width: `${100 / itemsPerView}%` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full overflow-hidden cursor-pointer">
                  {/* Bagian Gambar Proyek */}
                  <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-xl flex items-center justify-center bg-white p-4">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>

                  {/* Konten Card Proyek */}
                  <div className="p-4 flex flex-col justify-between flex-grow text-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalSlides > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-30 ml-4 hidden md:block"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-30 mr-4 hidden md:block"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {totalSlides > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-gray-400 opacity-70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectSection;
