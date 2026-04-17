'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

export function GallerySection({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Ensure enough images to fill viewport seamlessly — repeat until we have at least 12 per set
  const multiplier = Math.ceil(12 / Math.max(images.length, 1));
  const set = Array.from({ length: multiplier }, () => images).flat();
  // Row 1: forward scroll
  const track1 = [...set, ...set];
  // Row 2: offset by half so the two rows show different images
  const shuffled = [...images.slice(Math.floor(images.length / 2)), ...images.slice(0, Math.floor(images.length / 2))];
  const set2 = Array.from({ length: multiplier }, () => shuffled).flat();
  const track2 = [...set2, ...set2];

  const ScrollRow = ({ track, reverse = false }: { track: string[]; reverse?: boolean }) => (
    <div className="relative w-full overflow-hidden mb-4">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-surface to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-surface to-transparent pointer-events-none" />

      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${reverse ? 'galleryScrollReverse' : 'galleryScroll'} 35s linear infinite`,
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {track.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative h-56 md:h-72 aspect-square flex-shrink-0 cursor-pointer overflow-hidden rounded-sm group"
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Wedding moment ${(index % images.length) + 1}`}
              fill
              className="object-cover saturate-75 group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-24 md:py-36 bg-surface overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-center mb-12 px-4"
      >
        <h2 className="font-label text-xs uppercase tracking-extreme text-on-surface-variant/70 mb-4">
          Captured
        </h2>
        <h3 className="font-headline text-4xl md:text-5xl font-light text-on-surface">
          Moments
        </h3>
      </motion.div>

      {/* Row 1 — left to right */}
      <ScrollRow track={track1} />
      {/* Row 2 — right to left (reverse) */}
      <ScrollRow track={track2} reverse />

      {/* Keyframe injection */}
      <style>{`
        @keyframes galleryScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes galleryScrollReverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95 backdrop-blur-sm p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] rounded-none md:rounded-sm overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected full screen wedding moment"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
