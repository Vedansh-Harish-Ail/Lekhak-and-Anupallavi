'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SafeImage } from './SafeImage';

export function GallerySection({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Reduce multiplier for better performance with high-res images
  const multiplier = Math.ceil(8 / Math.max(images.length, 1));
  const set = useMemo(() => Array.from({ length: multiplier }, () => images).flat(), [images, multiplier]);
  
  // Row 1: base set
  const track1 = useMemo(() => [...set, ...set], [set]);
  
  // Row 2: interleaved/shuffled for variety
  const track2 = useMemo(() => {
    const shuffled = [...set];
    const half = Math.floor(shuffled.length / 2);
    return [...shuffled.slice(half), ...shuffled.slice(0, half), ...shuffled.slice(half), ...shuffled.slice(0, half)];
  }, [set]);

  const ScrollRow = ({ track, reverse = false, speed = 40 }: { track: string[]; reverse?: boolean; speed?: number }) => {
    const animationName = useMemo(() => `galleryScroll_${reverse ? 'rev' : 'fwd'}_${Math.random().toString(36).substr(2, 5)}`, [reverse]);
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full overflow-hidden mb-6"
      >
        {/* Shadow Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-surface to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-surface to-transparent pointer-events-none" />

        <div
          className="flex gap-4 w-max"
          style={{
            animation: `${animationName} ${speed}s linear infinite`,
          }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {track.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative h-48 md:h-72 aspect-square flex-shrink-0 cursor-pointer overflow-hidden rounded-sm group bg-stone-100"
              onClick={() => setSelectedImage(src)}
            >
              <SafeImage
                src={src}
                alt={`Wedding moment ${(index % images.length) + 1}`}
                fill
                className="object-cover saturate-75 group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes ${animationName} {
            0%   { transform: translate3d(${reverse ? '-50%' : '0'}, 0, 0); }
            100% { transform: translate3d(${reverse ? '0' : '-50%'}, 0, 0); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <section className="py-24 md:py-36 bg-surface overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-center mb-16 px-4"
      >
        <h2 className="font-label text-xs uppercase tracking-extreme text-on-surface-variant/70 mb-4">
          Captured
        </h2>
        <h3 className="font-headline text-4xl md:text-5xl font-light text-on-surface">
          Moments
        </h3>
      </motion.div>

      {/* Row 1 — Left to Right */}
      <ScrollRow track={track1} />
      
      {/* Row 2 — Right to Left */}
      <ScrollRow track={track2} reverse speed={45} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <SafeImage
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
