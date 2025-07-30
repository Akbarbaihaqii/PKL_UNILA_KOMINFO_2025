// app/components/FeedbackSection.js
'use client';

import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// Ganti dengan konfigurasi Firebase Anda yang didapatkan dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAAtuLIiXeK2kSZLP6tPgSCfCS7r6ex7Ow", // Ganti dengan apiKey Anda
  authDomain: "portofoliopklkominfo.firebaseapp.com", // Ganti dengan authDomain Anda
  projectId: "portofoliopklkominfo", // Ganti dengan projectId Anda
  storageBucket: "portofoliopklkominfo.firebasestorage.app", // Ganti dengan storageBucket Anda
  messagingSenderId: "61054640358", // Ganti dengan messagingSenderId Anda
  appId: "1:61054640358:web:d65c3e80df769b6bca1b27", // Ganti dengan appId Anda
  measurementId: "G-QW0J24HPBV" // Ini opsional, bisa disertakan atau tidak jika tidak pakai Analytics
};

// Inisialisasi Firebase (hanya sekali)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FeedbackSection = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // State dan logika untuk carousel pesan
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3); // Default 3 pesan per tampilan

  const calculateItemsPerView = () => {
    if (typeof window === 'undefined') return 3; // Default untuk server-side

    if (window.innerWidth >= 1024) { // lg breakpoint
      return 3; // Tampilkan 3 pesan di layar besar
    } else if (window.innerWidth >= 768) { // md breakpoint
      return 2; // Tampilkan 2 pesan di layar sedang
    } else {
      return 1; // Tampilkan 1 pesan di layar kecil
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

  // Efek untuk mengambil pesan dan mendengarkan real-time updates
  useEffect(() => {
    const q = query(collection(db, 'feedback'), orderBy('timestamp', 'desc')); // Urutkan berdasarkan waktu terbaru

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setFeedbackList(messages);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching feedback: ", err);
      setError("Gagal memuat pesan. Silakan coba lagi.");
      setLoading(false);
    });

    // Cleanup listener saat komponen di-unmount
    return () => unsubscribe();
  }, []);

  // Logika carousel
  const totalScrollablePositions = feedbackList.length - itemsPerView + 1;
  const totalSlides = Math.max(1, totalScrollablePositions);

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 5000); // Geser setiap 5 detik
      return () => clearInterval(interval);
    }
    setCurrentIndex(0); // Reset index jika tidak scrollable
  }, [totalSlides]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !message.trim()) {
      setError('Nama dan pesan tidak boleh kosong.');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        name: name.trim(),
        message: message.trim(),
        timestamp: serverTimestamp(), // Waktu server untuk konsistensi
      });
      setName('');
      setMessage('');
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 relative"> {/* Tambah relative untuk tombol navigasi */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-800">
          Kritik, Pesan, dan Kesan
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Bagikan pengalaman dan masukan Anda selama PKL di Kominfo Kota Bandar Lampung.
        </p>

        {/* Form Pengiriman Pesan */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10 mb-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Anda
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500 text-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Misal: Anonim, Nama Anda"
                disabled={submitting}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Pesan / Kesan Anda
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500 text-gray-900"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan Anda di sini..."
                disabled={submitting}
              ></textarea>
            </div>
            {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>

        {/* Daftar Pesan (Carousel) */}
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Pesan dari Pengunjung
        </h3>

        {loading && (
          <p className="text-center text-gray-500">Memuat pesan...</p>
        )}

        {!loading && feedbackList.length === 0 && (
          <p className="text-center text-gray-500">Belum ada pesan. Jadilah yang pertama!</p>
        )}

        {/* Carousel Wrapper */}
        <div className="relative overflow-hidden w-full px-4 md:px-0">
          <div
            className="flex transition-transform duration-700 ease-in-out -mx-4 items-stretch" // Menambah items-stretch
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {feedbackList.map((feedback) => (
              <div
                key={feedback.id}
                className={`flex-shrink-0 p-4`}
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-gray-800 text-base mb-4 italic leading-relaxed">
                      "{feedback.message}" {/* Tanda kutip tetap ada sesuai permintaan sebelumnya */}
                    </p>
                    <p className="text-gray-600 font-semibold text-sm text-right">
                      — {feedback.name}
                    </p>
                  </div>
                  {feedback.timestamp && (
                    <p className="text-gray-500 text-xs mt-2 text-right">
                      {new Date(feedback.timestamp.toDate()).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Navigasi Next/Prev (hanya tampil jika ada > 1 slide) */}
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

          {/* Indikator Slide (Dot Navigation) */}
          {totalSlides > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
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
      </div>
    </section>
  );
};

export default FeedbackSection;
