'use client';
import { motion } from 'framer-motion';
import { SafeImage } from './SafeImage';
import { Countdown } from './Countdown';

interface HeroSectionProps {
  bride: string;
  groom: string;
  date: string;
  heroImage: string;
}

export function HeroSection({ bride, groom, date, heroImage }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0"
        >
          <SafeImage
            src={heroImage}
            alt={`Soft focus romantic wedding background for ${bride} and ${groom}`}
            fill
            priority
            className="w-full h-full mix-blend-multiply filter saturate-75 object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
        </motion.div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/10 to-surface pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 flex flex-col items-center gap-4 mt-16 w-full max-w-lg mx-auto px-4"
      >
        <h2 className="font-label text-[10px] sm:text-xs uppercase tracking-ultra text-on-surface-variant/70 mb-1">
          Save the Date
        </h2>
        <h1 className="font-headline text-h1 font-light tracking-tight text-on-surface text-center flex flex-col items-center justify-center w-full">
          <span className="block max-w-[12ch] text-balance">{groom}</span>
          <span className="text-primary italic text-3xl sm:text-4xl md:text-5xl font-light leading-none -my-1">&</span>
          <span className="block max-w-[12ch] text-balance">{bride}</span>
        </h1>
        <p className="font-headline italic text-lg sm:text-xl md:text-2xl text-on-surface-variant/80 mt-6 tracking-wide font-light text-center">
          {date}
        </p>
        <Countdown />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute bottom-12 hidden md:flex flex-col items-center gap-4 text-on-surface-variant/60"
      >
        <span className="font-label text-[10px] uppercase tracking-ultra pointer-events-none">Scroll</span>
        <div className="w-[1px] h-12 bg-on-surface-variant/30" />
      </motion.div>
    </section>
  );
}
