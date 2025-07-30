// app/components/FooterGallery.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal'; // Import komponen ImageModal
// Link tidak lagi diperlukan jika tidak ada tautan cepat di footer
// import Link from 'next/link'; 

const galleryImages = [
  { id: 1, src: '/images/1.jpg', alt: 'Kegiatan PKL Kominfo 1' }, // Pastikan path benar
  { id: 2, src: '/images/3.png', alt: 'Kegiatan PKL Kominfo 2' }, // Pastikan path benar
  { id: 3, src: '/images/4.png', alt: 'Kegiatan PKL Kominfo 3' }, // Pastikan path benar
  { id: 4, src: '/images/6.png', alt: 'Kegiatan PKL Kominfo 4' }, // Pastikan path benar
  { id: 5, src: '/images/7.png', alt: 'Kegiatan PKL Kominfo 5' }, // Pastikan path benar
  { id: 6, src: '/images/2.jpg', alt: 'Kegiatan PKL Kominfo 6' }, // Pastikan path benar
  // Tambahkan lebih banyak foto sesuai kebutuhan
];

const FooterGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4); // Default 4 gambar per tampilan
  const [selectedImage, setSelectedImage] = useState(null); // State baru untuk gambar yang dipilih

  const calculateItemsPerView = () => {
    if (typeof window === 'undefined') return 4;

    if (window.innerWidth >= 1280) { // xl breakpoint
      return 5;
    } else if (window.innerWidth >= 1024) { // lg breakpoint
      return 4;
    } else if (window.innerWidth >= 768) { // md breakpoint
      return 3;
    } else if (window.innerWidth >= 640) { // sm breakpoint
      return 2;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(calculateItemsPerView()); // <<< PERBAIKAN DI SINI
    };

    setItemsPerView(calculateItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalScrollablePositions = galleryImages.length - itemsPerView + 1;
  const totalSlides = Math.max(1, totalScrollablePositions);

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 4000); // Geser setiap 4 detik
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
    <section id="gallery-section" className="bg-gradient-to-r from-blue-900 to-blue-700 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center text-white mb-8">
          Moment bersama Kominfo <br/> Kota Bandar Lampung
        </h2>

        <div className="relative w-full pb-10">
          {/* Main carousel track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className={`flex-shrink-0 p-2 cursor-pointer`}
                style={{ width: `${100 / itemsPerView}%` }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border-2 border-blue-500 transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="object-center"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Navigasi Next/Prev (hanya tampil jika ada > 1 slide) */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-30 ml-2 md:ml-4 hidden sm:block"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-30 mr-2 md:mr-4 hidden sm:block"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Indikator Slide (Dot Navigation) */}
          {totalSlides > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white scale-125' : 'bg-blue-300 opacity-70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div> {/* Menutup div.relative.w-full */}

      </div> {/* Menutup div.container */}

      {/* Komponen ImageModal */}
      <ImageModal
        imageUrl={selectedImage ? selectedImage.src : null}
        altText={selectedImage ? selectedImage.alt : ''}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
};

export default FooterGallery;
