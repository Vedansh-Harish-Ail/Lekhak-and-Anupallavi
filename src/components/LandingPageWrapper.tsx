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
            className="fixed inset-0 z-[100] bg-surface flex items-end justify-center overflow-hidden pb-12 sm:pb-24"
          >
            {/* Background Image Panel */}
            <div className="absolute inset-0 z-0">
              <SafeImage
                alt="Couple holding hands"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 35%' }}
                src={landingPageImage}
                fill
                priority
              />
              {/* Tonal Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent"></div>
            </div>

            {/* Content Canvas */}
            <div className="relative z-10 layout-container flex flex-col items-center text-center">
              {/* Subtitle */}
              <span className="font-label text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary mb-4 sm:mb-6">
                The Wedding Celebration
              </span>

              {/* Main Headline */}
              <h1 className="font-headline text-h2 font-bold text-primary tracking-tight drop-shadow-md mb-6 md:mb-8 text-balance max-w-[15ch]">
                {bride} &amp; {groom}
              </h1>

              {/* Body Text */}
              <p className="font-body text-on-surface font-medium text-xs sm:text-sm md:text-base leading-relaxed max-w-sm drop-shadow-sm mb-10 md:mb-12 text-balance">
                Join us as we begin our next chapter, surrounded by the people we love most.
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white font-label text-[10px] sm:text-xs uppercase tracking-widest px-8 sm:px-12 py-4 sm:py-5 rounded-none shadow-2xl hover:bg-primary/90 transition-all active:scale-95"
              >
                Open Invitation
              </motion.button>
            </div>

            {/* Branding - Moved to Bottom */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="absolute bottom-12 flex flex-col items-center gap-2"
            >
              <div className="relative w-16 h-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <SafeImage 
                  src="/vk-solutions.png" 
                  alt="VK Solutions" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-label text-[8px] tracking-[0.4em] uppercase text-primary/40 font-medium">
                VK Solutions
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isOpen ? 'block' : 'hidden h-screen overflow-hidden'}>
        {children}
      </div>
    </>
  );
}
