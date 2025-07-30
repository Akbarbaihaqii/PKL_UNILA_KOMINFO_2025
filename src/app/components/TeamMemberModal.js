    // app/components/TeamMemberModal.js
    'use client';

    import Image from 'next/image';

    const TeamMemberModal = ({ member, onClose }) => {
      if (!member) return null;

      return (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-xl"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-lg w-full relative transform transition-all duration-300 scale-100 opacity-100 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 text-center">
                {member.name}
              </h3>
              <p className="text-lg text-blue-600 font-semibold mb-4 text-center">{member.role}</p>

              <div className="w-full text-gray-700 text-base md:text-lg text-center leading-relaxed">
                <p className="mb-3">{member.bio}</p>
                {member.skills && (
                  <p className="mb-3">
                    <strong className="font-bold">Keahlian:</strong> {member.skills}
                  </p>
                )}
                {member.experience && (
                  <p className="mb-3">
                    <strong className="font-bold">Pengalaman:</strong> {member.experience}
                  </p>
                )}
                {member.linkedin && (
                  <p className="mb-1">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  </p>
                )}
                {member.instagram && (
                  <p>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:underline flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 0C8.74 0 8.33 0 7.02 0c-1.32 0-2.28.06-3.13.4s-1.48.96-1.82 1.81c-.34.85-.4 1.81-.4 3.13c0 1.31 0 1.72.01 4.7c0 1.32.06 2.28.4 3.13s.96 1.48 1.81 1.82c.85.34 1.81.4 3.13.4c1.31 0 1.72 0 4.7-.01c1.32 0 2.28-.06 3.13-.4s1.48-.96 1.82-1.81c.34-.85.4-1.81.4-3.13c0-1.31 0-1.72-.01-4.7c0-1.32-.06-2.28-.4-3.13s-.96-1.48-1.81-1.82c-.85-.34-1.81-.4-3.13-.4c-1.31 0-1.72 0-4.7.01zM12 2.16c3.2 0 3.59.01 4.85.06 1.15.05 1.74.24 2.12.39.4.15.67.4.92.65.25.25.5.52.65.92.15.38.34.97.39 2.12.05 1.26.06 1.65.06 4.85s-.01 3.59-.06 4.85c-.05 1.15-.24 1.74-.39 2.12a2.82 2.82 0 01-.65.92c-.25.25-.52.5-.92.65-.38.15-.97.34-2.12.39-1.26.05-1.65.06-4.85.06s-3.59-.01-4.85-.06c-1.15-.05-1.74-.24-2.12-.39a2.82 2.82 0 01-.92-.65c-.25-.25-.5-.52-.65-.92-.15-.38-.34-.97-.39-2.12-.05-1.26-.06-1.65-.06-4.85s.01-3.59.06-4.85c.05-1.15.24-1.74.39-2.12a2.82 2.82 0 01.65-.92c.25-.25.52-.5.92-.65.38-.15.97-.34 2.12-.39C8.41 2.16 8.8 2.15 12 2.15zM12 5.61c-3.53 0-6.39 2.86-6.39 6.39s2.86 6.39 6.39 6.39 6.39-2.86 6.39-6.39-2.86-6.39-6.39-6.39zM12 16.29c-2.37 0-4.3-1.93-4.3-4.3s1.93-4.3 4.3-4.3 4.3 1.93 4.3 4.3-1.93 4.3-4.3 4.3zm6.2-10.74c-.81 0-1.46-.65-1.46-1.46s.65-1.46 1.46-1.46 1.46.65 1.46 1.46-.65 1.46-1.46 1.46z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Instagram
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default TeamMemberModal;
    