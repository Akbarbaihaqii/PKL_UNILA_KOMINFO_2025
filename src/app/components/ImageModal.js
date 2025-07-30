// app/components/ImageModal.js
'use client';

import Image from 'next/image';

const ImageModal = ({ imageUrl, altText, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative max-w-full max-h-full bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-70 rounded-full p-2 text-xl font-bold hover:bg-opacity-100 transition-all z-10"
          aria-label="Close image"
        >
          &times;
        </button>
        <div className="relative w-[80vw] h-[80vh] md:w-[70vw] md:h-[70vh] flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={altText}
            layout="fill"
            objectFit="contain"
            quality={100}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;