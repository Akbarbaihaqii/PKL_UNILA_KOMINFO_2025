// app/components/ProjectDetailModal.js
'use client';

import Image from 'next/image';

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-2xl w-full relative transform transition-all duration-300 scale-100 opacity-100 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg mb-6 bg-gray-200 flex items-center justify-center">
            <Image
              src={project.imageUrl}
              alt={project.title}
              layout="fill"
              objectFit="contain"
              quality={100}
              className="rounded-lg"
            />
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
            {project.description}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Lihat Proyek
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;