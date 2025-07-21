'use client';

import { ImageType } from '@/shared/types/imageType';
import Image from 'next/image';
import { useState } from 'react';

interface ImageSliderProps {
  images: ImageType[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img) => (
          <Image
            key={img.imageId}
            src={img.imageUrl}
            alt={img.imageUrl}
            width={1000}
            height={1000}
            className="h-64 w-full min-w-full rounded-lg object-cover"
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black"
      >
        →
      </button>
    </div>
  );
}
