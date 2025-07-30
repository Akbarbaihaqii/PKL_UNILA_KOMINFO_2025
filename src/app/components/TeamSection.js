    // app/components/TeamSection.js
    'use client';

    import { useState, useEffect } from 'react';
    import Image from 'next/image';
    import TeamMemberModal from './TeamMemberModal'; // Pastikan path ini benar

    // Data Anggota Tim Anda (gunakan data yang sudah diperbarui dengan semua info)
    const teamMembers = [
      {
        id: 1,
        name: 'M. Akbar Baihaqi',
        role: 'Front-end Developer - SIADIK',
        imageUrl: '/images/Akbar.png',
        bio: 'berfokus pada pengalaman pengguna yang intuitif dan antarmuka yang menarik. Dia memiliki passion untuk menciptakan desain yang responsif dan berkinerja tinggi.',
        skills: 'HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS',
        experience: 'Desain Photoshop, Canva, Editing Vidio Adobe Primer, Capcut, VN',
        linkedin: 'https://www.linkedin.com/in/m-akbar-baihaqi-345b20332/',
        github: 'https://github.com/akbar-contoh',
        instagram: 'https://www.instagram.com/akbarbaihaqiiii/',
      },
      {
        id: 2,
        name: 'Aimar Abie Pasah',
        role: 'Back-end Developer - SIADIK',
        imageUrl: '/images/Aimar.png', // Pastikan gambar ini ada dan jernih
        bio: 'Bertanggung jawab atas logika sisi server, manajemen database, dan pengembangan API yang handal. Dia memiliki keahlian dalam membangun arsitektur sistem yang skalabel dan aman.',
        skills: 'PHP, Laravel, MySQL, RESTful API, Node.js, Git',
        experience: 'Banyak',
        linkedin: 'https://www.linkedin.com/in/aimar-contoh',
        github: 'https://github.com/aimar-contoh',
        instagram: 'https://www.instagram.com/aimar_contoh',
      },
      {
        id: 3,
        name: 'Dede Juniar Putra',
        role: 'UI/UX DESAINER - SIADIK',
        imageUrl: '/images/dede.png', // Pastikan gambar ini ada dan jernih
        bio: 'Bertanggung jawab Rangka desain tampilan sistem, memiliki kealihan desain sistem dengan User Friendly.',
        skills: 'PHP, Laravel, MySQL, Flutter, Git',
        experience: 'Insyallah Banyak',
        linkedin: 'https://www.linkedin.com/in/dedejuniarputra',
        github: null,
        instagram: 'https://www.instagram.com/deeeonly__?igsh=MWY0Y294YW1pZmF3Yg==',
      },
      {
        id: 4,
          name: 'Dewi Nurhaliza',
        role: 'Front-end Developer - SPBE',
        imageUrl: '/images/dewi.jpg', // Pastikan gambar ini ada dan jernih
        bio: 'Bertanggung jawab atas antarmuka pengguna yang responsif, intuitif, dan ramah pengguna untuk website SPBE Kota Bandar Lampung. Memiliki keahlian dalam menerjemahkan desain menjadi kode program.',
        skills: 'HTML, CSS, Javascript, Bootstrap, Blade, Laravel (front-end), Git',
        experience: 'Banyak',
        linkedin: 'https://www.linkedin.com/in/dewi-nurhaliza-2223b12b4',
        github: 'https://github.com/dewinurhaliza',
        instagram: 'https://www.instagram.com/dewinurhaliza_',
      },
      {
        id: 5,
        name: 'Indah Kusuma Ningrum',
        role: 'Back-end Developer - SPBE',
        imageUrl: '/images/indah.png', // Pastikan gambar ini ada dan jernih
        bio: 'Bertanggung jawab atas logika sisi server, merancang struktur database, pengembangan fitur CRUD, serta manajemen API pada role admin. Memiliki keahlian dalam merancang arsitektur sistem yang dapat dikembangkan secara fleksibel dan terjamin keamanannya.',
        skills: 'PHP, Laravel, MySQL, JavaScript (ES6+), RESTful API, AJAX, Git',
        experience: 'Banyak',
        linkedin: 'https://www.linkedin.com/in/indah-kusuma-ningrum-b503b9329',
        instagram: 'https://www.instagram.com/indahkuxuma',
      },
      {
        id: 6,
        name: 'Eriza Tri Sativa',
        role: 'Back-end Developer - SPBE',
        imageUrl: '/images/eriza.png', // Pastikan gambar ini ada dan jernih
        bio: 'Mahasiswi Ilmu Komputer yang fokus sebagai Back-end Developer dalam pengembangan sistem SPBE Kota Bandar Lampung. Familiar dengan API dan mengelola logika server menggunakan Laravel, serta dalam pengelolaan database dan integrasi sistem berbasis web.',
        skills: ' Laravel, PHP, MySQL, HTML/CSS, JavaScript, Figma',
        experience: 'Banyak',
        github: 'https://github.com/erizatstvaa',
        instagram: 'https://www.instagram.com/etstvaa/',
      },
      {
        id: 7,
        name: 'Meita Ayu Sabna Damayanti',
        role: 'UI/UX Designer - SPBE',
        imageUrl: '/images/sabna.png', // Pastikan gambar ini ada dan jernih
        bio: 'Percaya kalau desain itu bukan cuma soal warna dan layout, tapi bikin orang senyum setiap kali pakai. Suka eksplor ide baru dan bikin tampilan jadi lebih hidup.',
        skills: 'HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Figma',
        experience: 'Berpengalaman membuat desain yang simple, elegan, dan fokus ke pengguna, dan banyak lainya',
        github: 'https://github.com/sabnaimut',
        instagram: 'https://www.instagram.com/meitaayusabna',
        motto: 'Nikmati prosesnya, bukan cuma hasilnya.'
      },
    ];

    const TeamSection = () => {
      const [selectedMember, setSelectedMember] = useState(null);
      const [currentIndex, setCurrentIndex] = useState(0);
      const [itemsPerView, setItemsPerView] = useState(3);

      const calculateItemsPerView = () => {
        if (typeof window === 'undefined') return 3;

        if (window.innerWidth >= 1024) {
          return 3;
        } else if (window.innerWidth >= 768) {
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

      const totalScrollablePositions = teamMembers.length - itemsPerView + 1;
      const totalSlides = Math.max(1, totalScrollablePositions);

      useEffect(() => {
        if (totalSlides > 1) {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
          }, 5000);
          return () => clearInterval(interval);
        }
        setCurrentIndex(0); // Reset index if not scrollable
      }, [totalSlides]);

      const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      };

      const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
      };

      return (
        <section id="team-section" className="py-16 bg-gradient-to-br from-gray-50 to-white relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-5 text-gray-800">
              About Me
            </h2>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10">
              Kami adalah mahasiswa Universitas Lampung jurusan Ilmu Komputer.
            </p>

            <div className="relative overflow-hidden w-full px-4 md:px-0 pb-10">
              <div
                className="flex transition-transform duration-700 ease-in-out -mx-4"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex-shrink-0 p-4`}
                    style={{ width: `${100 / itemsPerView}%` }}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group flex flex-col items-center p-6 text-center h-full">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-transparent group-hover:border-blue-700 transition-colors duration-300">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                          quality={100}
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-blue-700 font-semibold text-base md:text-lg mb-2">
                        {member.role}
                      </p>
                      <p className="text-gray-500 text-sm line-clamp-3">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {totalSlides > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all duration-300 z-30 ml-4 hidden md:block"
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all duration-300 z-30 mr-4 hidden md:block"
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {totalSlides > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-blue-700 scale-125' : 'bg-blue-300 opacity-70'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        </section>
      );
    };

    export default TeamSection;
    