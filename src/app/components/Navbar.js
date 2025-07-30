// app/components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 shadow-lg fixed w-full z-40 top-0">
      <div className="container mx-auto flex justify-between items-center px-4"> {/* Tambah px-4 untuk padding samping */}
        {/* Logo Unila di Kiri */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0"> {/* flex-shrink-0 agar logo tidak mengecil */}
          <Image
            src="/images/unila.png" // **PERBAIKI DI SINI: Gunakan unila.png**
            alt="Logo Universitas Lampung"
            width={40} // Sesuaikan ukuran
            height={40} // Sesuaikan ukuran
            className="rounded-full shadow-md"
          />
          {/* Anda bisa menambahkan teks 'UNILA' jika diinginkan */}
          {/* <span className="text-white text-xl font-bold ml-2 hidden sm:block">UNILA</span> */}
        </Link>

        {/* Judul/Nama Portofolio di Tengah */}
        {/* Menggunakan 'grow' untuk memungkinkan teks mengambil sisa ruang dan tetap di tengah */}
        <div className="flex-grow text-center mx-4"> {/* Tambah mx-4 untuk jarak dari logo */}
          <span className="text-white text-xl md:text-3xl font-extrabold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
            UNILA X KOMINFO
          </span>
        </div>

        {/* Logo Kominfo di Kanan */}
        {/* **PERBAIKI DI SINI: Ganti href ke URL Kominfo yang benar** */}
        <Link href="https://diskominfo.bandarlampungkota.go.id/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 flex-shrink-0"> {/* flex-shrink-0 agar logo tidak mengecil */}
          <Image
            src="/images/logo-kominfo.png" // Pastikan path benar
            alt="Logo Dinas Kominfo Kota Bandar Lampung"
            width={40} // Sesuaikan ukuran
            height={40} // Sesuaikan ukuran
            className="rounded-full shadow-md"
          />
          {/* Anda bisa menambahkan teks 'KOMINFO' jika diinginkan */}
          {/* <span className="text-white text-xl font-bold mr-2 hidden sm:block">KOMINFO</span> */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;