'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from './SafeImage';

interface LandingPageWrapperProps {
  bride: string;
  groom: string;
  landingPageImage: string;
  musicUrl: string;
  children: React.ReactNode;
}

export function LandingPageWrapper({ bride, groom, landingPageImage, musicUrl, children }: LandingPageWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    // Explicitly play music from the central source
    const event = new CustomEvent('startWeddingMusic');
    window.dispatchEvent(event);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -200 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-surface flex items-center justify-center overflow-hidden"
          >
            {/* Background Image Panel */}
            <div className="absolute inset-0 z-0">
              <SafeImage
                alt="Couple holding hands"
                className="w-full h-full"
                style={{ objectPosition: 'center 35%' }}
                src={landingPageImage}
                fill
                priority
              />
              {/* Tonal Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent"></div>
            </div>

            {/* Content Canvas */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto w-full px-6">
              {/* Subtitle */}
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-6">
                The Wedding Celebration
              </span>

              {/* Main Headline */}
              <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl font-bold text-primary leading-tight tracking-tight drop-shadow-md mb-4 md:mb-8">
                {bride} &amp; {groom}
              </h1>

              {/* Body Text */}
              <p className="font-body text-on-surface font-semibold text-xs md:text-base leading-[1.8] max-w-sm drop-shadow-sm mb-8 md:mb-12">
                Join us as we begin our next chapter, surrounded by the people we love most.
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white font-label text-[10px] uppercase tracking-widest px-10 py-5 rounded-none shadow-2xl hover:bg-primary/90 transition-all"
              >
                Open Invitation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isOpen ? 'block' : 'hidden h-screen overflow-hidden'}>
        {children}
      </div>
    </>
  );
}
