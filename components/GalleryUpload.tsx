'use client';

import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface GalleryUploadProps {
  categoryName: string;
  initialImages: string[];
}

export function GalleryUpload({ categoryName, initialImages }: GalleryUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newUrls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...newUrls]);
    e.target.value = '';
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gold text-[10px] tracking-[0.38em] uppercase mb-1">
            Decoration Gallery
          </p>
          <h2 className="text-2xl text-cream font-bold font-display">
            {images.length > 0
              ? `${images.length} Photo${images.length !== 1 ? 's' : ''}`
              : 'Add Your First Photo'}
          </h2>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-gold text-xs border border-gold/35 hover:border-gold/70 hover:bg-gold/5 px-4 py-2.5 transition-all"
        >
          <Camera size={13} /> Add Photos
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleUpload}
      />

      {images.length === 0 ? (
        <div
          className="border border-dashed border-gold/[0.18] py-24 text-center cursor-pointer hover:border-gold/40 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera size={36} className="text-gold/25 mx-auto mb-4" />
          <p className="text-cream/30 text-base mb-1">
            No decoration photos yet
          </p>
          <p className="text-gold/40 text-sm">
            Click to upload photos for {categoryName}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={img}
                alt={`${categoryName} decoration ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
          {/* Add more tile */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[4/3] border border-dashed border-gold/20 flex flex-col items-center justify-center gap-2 text-gold/40 hover:text-gold hover:border-gold/50 transition-colors"
          >
            <Camera size={22} />
            <span className="text-[11px] tracking-wide">Add More</span>
          </button>
        </div>
      )}
    </div>
  );
}
