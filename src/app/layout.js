// app/layout.js
import './globals.css';
import Navbar from './components/Navbar'; // Import Navbar

export const metadata = {
  title: 'PKL UNILA KOMINFO 2025', // Perbarui judul
  description: 'Portofolio Tim Praktik Kerja Lapangan dari Universitas Lampung dan Dinas Kominfo Kota Bandar Lampung', // Perbarui deskripsi
};

export default function RootLayout({ children }) {
  return (
    <html lang="id"> 
      <body>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}