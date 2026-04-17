'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageWrapperProps {
  children: React.ReactNode;
  bride: string;
  groom: string;
}

export function LandingPageWrapper({ children, bride, groom }: LandingPageWrapperProps) {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    // Signal MusicPlayer to start playing
    document.dispatchEvent(new CustomEvent('startWeddingMusic'));
    setEntered(true);
  };

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="landing"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-end items-center pb-16 md:pb-32 px-6 overflow-hidden bg-surface font-body text-on-surface"
          >
            {/* Hero Background */}
            <div className="absolute inset-0 w-full h-full z-0">
              <img
                alt="Couple holding hands"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 35%' }}
                src="/assets/landing-page-image.jpeg"
              />
              {/* Tonal Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent"></div>
            </div>
            {/* Content Canvas */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto w-full">
              {/* Subtitle */}
              <span className="font-label text-[0.5rem] md:text-xs tracking-[0.3em] uppercase text-primary font-bold drop-shadow-sm mb-3 md:mb-6">
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
              <button
                onClick={handleEnter}
                className="cursor-pointer w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label text-[0.7rem] uppercase tracking-[0.2em] font-bold rounded-none hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(115,92,0,0.3)] group relative overflow-hidden"
              >
                <span className="relative z-10 drop-shadow-sm">Open Invitation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          opacity: entered ? 1 : 0,
          scale: entered ? 1 : 0.95,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-0"
        style={{
          visibility: entered ? 'visible' : 'hidden',
          pointerEvents: entered ? 'auto' : 'none',
          overflow: entered ? 'visible' : 'hidden',
          height: entered ? 'auto' : '0px',
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
