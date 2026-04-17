'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

export function GallerySection({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-32 md:py-48 px-4 md:px-8 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-center mb-24"
      >
        <h2 className="font-label text-xs uppercase tracking-extreme text-on-surface-variant/70 mb-4">
          Captured
        </h2>
        <h3 className="font-headline text-4xl md:text-5xl font-light text-on-surface">
          Moments
        </h3>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto">
        {images.map((src, index) => {
          // Asymmetrical grid matching DESIGN.md
          const isLarge = index === 0;
          const isHorizontal = index === 3;
          return (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className={`relative cursor-pointer overflow-hidden ${
                isLarge ? 'aspect-[3/4] md:aspect-square col-span-2 md:col-span-2 row-span-2' : 
                isHorizontal ? 'aspect-square md:aspect-auto md:col-span-1 col-span-2 h-full' : 'aspect-square'
              }`}
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Wedding moment ${index + 1}`}
                fill
                className="object-cover filter contrast-110 saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-1000"
              />
            </motion.div>
          );
        })}
      </div>

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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] rounded-none md:rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
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
