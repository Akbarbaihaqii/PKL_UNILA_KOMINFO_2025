// app/page.js
import GreetingSection from './components/GreetingSection';
import ProjectSection from './components/ProjectSection';
import TeamSection from './components/TeamSection';
import FooterGallery from './components/FooterGallery';
import FeedbackSection from './components/FeedbackSection';
import AppFooter from './components/AppFooter'; // Import komponen footer baru

export default function Home() {
  return (
    // Tambahkan min-h-screen dan flex-col ke main untuk memastikan konten mengisi tinggi viewport
    // dan footer didorong ke bawah.
    <main className="flex flex-col min-h-screen">
      {/* Bagian Ucapan Terima Kasih Kominfo */}
      <GreetingSection />

      {/* Bagian Hasil Proyek */}
      <ProjectSection />

      {/* Bagian Tim Portofolio */}
      <TeamSection />

      {/* Bagian Galeri Kegiatan PKL */}
      <FooterGallery />

      {/* Bagian Kritik, Pesan, dan Kesan */}
      <FeedbackSection />

      {/* FOOTER HAK CIPTA DI SINI (PALING BAWAH HALAMAN) */}
      {/* Tambahkan flex-grow ke AppFooter untuk mendorongnya ke bawah jika konten tidak cukup tinggi */}
      <AppFooter className="mt-auto" /> 
    </main>
  );
}
