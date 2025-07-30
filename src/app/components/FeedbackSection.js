// app/components/FeedbackSection.js
'use client';

import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// Ganti dengan konfigurasi Firebase Anda yang didapatkan dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAAtuLIiXeK2kSZLP6tPgSCfCS7r6ex7Ow",
  authDomain: "portofoliopklkominfo.firebaseapp.com",
  projectId: "portofoliopklkominfo",
  storageBucket: "portofoliopklkominfo.firebasestorage.app",
  messagingSenderId: "61054640358",
  appId: "1:61054640358:web:d65c3e80df769b6bca1b27",
  measurementId: "G-QW0J24HPBV"
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
    <section className="py-16 bg-gray-50">
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

        {/* Daftar Pesan */}
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Pesan dari Pengunjung
        </h3>

        {loading && (
          <p className="text-center text-gray-500">Memuat pesan...</p>
        )}

        {!loading && feedbackList.length === 0 && (
          <p className="text-center text-gray-500">Belum ada pesan. Jadilah yang pertama!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <p className="text-gray-800 text-base mb-4 italic leading-relaxed">
                  "{feedback.message}"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
