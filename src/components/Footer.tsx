'use client';
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

export function Footer({ bride, groom }: { bride: string; groom: string }) {
  return (
    <footer className="bg-[#0c0c0c] border-t border-[#2a2a2a] w-full py-24 flex flex-col items-center space-y-8 pb-40 md:pb-24">
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        whileInView={{ opacity: 0.3, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-outline"
      >
        <Flower2 className="w-10 h-10" strokeWidth={1} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-headline text-3xl font-light text-primary text-center"
      >
        With Love, {bride} &amp; {groom}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-8 md:gap-12 mt-8 font-label text-xs tracking-extreme uppercase text-center"
      >
        <a href="#" className="text-outline hover:text-primary transition-colors duration-500 py-2">Our Story</a>
        <a href="#rsvp" className="text-outline hover:text-primary transition-colors duration-500 py-2">RSVP</a>
        <a href="#events" className="text-outline hover:text-primary transition-colors duration-500 py-2">Events</a>
      </motion.div>
    </footer>
  );
}
