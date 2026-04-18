'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import data from '../../data/wedding.json';

export function Branding() {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center justify-center bg-[#0c0c0c] border-t border-[#2a2a2a]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative w-32 h-12 opacity-90 transition-all duration-700">
          <Image
            src="/vk-solutions.png"
            alt="VK Solutions"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-white/70">
            Digital Experience Crafted by
          </span>
          <h3 className="font-headline text-lg font-light text-white tracking-widest uppercase">
            VK Solutions
          </h3>
        </div>

        <div className="mt-4 flex gap-6">
          <a
            href="https://portfolio-vedansh-eta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs text-white hover:text-primary transition-colors tracking-widest uppercase border-b border-transparent hover:border-primary/30 pb-1"
          >
            Portfolio
          </a>
          <a
            href="mailto:ailvedansh@gmail.com"
            className="font-label text-xs text-white hover:text-primary transition-colors tracking-widest uppercase border-b border-transparent hover:border-primary/30 pb-1"
          >
            Email
          </a>
          <a
            href={`https://wa.me/${data.rsvp.phone}?text=${encodeURIComponent(
              `Hi, Got your contact from ${data.bride} & ${data.groom}'s Wedding Invitation`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-xs text-white hover:text-[#D4AF37] transition-colors tracking-widest uppercase border-b border-transparent hover:border-[#D4AF37]/30 pb-1"
          >
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
