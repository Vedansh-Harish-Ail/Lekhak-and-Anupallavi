'use client';
import { motion } from 'framer-motion';
import { SafeImage } from './SafeImage';

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
        className="relative z-10 text-center flex flex-col items-center gap-8 mt-20 w-full max-w-4xl mx-auto"
      >
        <h2 className="font-label text-xs uppercase tracking-ultra text-on-surface-variant/70 mb-4">
          Save the Date
        </h2>
        <h1 className="font-headline text-7xl md:text-9xl font-light tracking-tight text-on-surface leading-[0.9] text-balance">
          {groom} <br />
          <span className="text-primary italic text-5xl md:text-7xl font-light mx-4">&</span> <br />
          {bride}
        </h1>
        <p className="font-headline italic text-2xl md:text-3xl text-on-surface-variant/80 mt-12 tracking-wide font-light">
          {date}
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute bottom-12 flex flex-col items-center gap-4 text-on-surface-variant/60"
      >
        <span className="font-label text-[10px] uppercase tracking-ultra pointer-events-none">Scroll</span>
        <div className="w-[1px] h-12 bg-on-surface-variant/30" />
      </motion.div>
    </section>
  );
}
