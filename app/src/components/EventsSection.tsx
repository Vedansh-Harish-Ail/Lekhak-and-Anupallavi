'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { WeddingData } from '@/lib/data';

const FloralMotif = () => (
  <svg width="160" height="160" viewBox="0 0 100 100" fill="none" className="transform group-even:scale-x-100 group-odd:-scale-x-100 opacity-20 text-primary">
    {/* Elegant botanical leaf swoosh */}
    <path d="M50 100 C 50 60, 30 50, 15 20 C 45 35, 50 60, 50 100" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05"/>
    <path d="M50 85 C 65 65, 80 55, 90 35 C 70 50, 55 65, 50 85" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.05"/>
    <circle cx="50" cy="95" r="2" fill="currentColor"/>
    <circle cx="30" cy="45" r="1.5" fill="currentColor"/>
    <circle cx="70" cy="55" r="1.5" fill="currentColor"/>
  </svg>
);

interface EventsSectionProps {
  events: WeddingData['events'];
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="events" className="py-32 md:py-48 px-4 md:px-8 bg-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-24"
        >
          <h2 className="font-label text-xs uppercase tracking-extreme text-on-surface-variant/70 mb-4">
            The Details
          </h2>
          <h3 className="font-headline text-4xl md:text-5xl font-light text-on-surface">
            The Celebrations
          </h3>
        </motion.div>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-8 md:before:ml-1/2 before:-translate-x-px md:before:mx-auto before:w-px before:bg-outline-variant/30">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row items-center justify-between md:odd:flex-row-reverse group"
            >
              {/* Point Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-surface border border-primary z-10 hidden md:block" />
              
              {/* Content Card (VenueSection integrated here layout-wise) */}
              <div className="w-full md:w-[calc(50%-4rem)] bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_8px_30px_rgba(115,92,0,0.04)] relative ml-12 md:ml-0 md:group-odd:mr-16 md:group-even:ml-16 hover:shadow-[0_12px_40px_rgba(115,92,0,0.08)] transition-all duration-700">
                <span className="font-label text-[10px] uppercase tracking-extreme text-primary mb-2 block">
                  {event.date} · {event.time}
                </span>
                <h4 className="font-headline text-3xl font-light text-on-surface mb-4">
                  {event.title}
                </h4>
                <p className="font-body text-sm text-on-surface-variant/80 mb-8 font-light leading-relaxed">
                  {event.venue.split(',').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </p>
                <a 
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label text-xs uppercase tracking-widest text-primary border-b border-primary/20 pb-2 hover:border-primary transition-colors inline-flex items-center gap-2 group-hover:pl-2 duration-300"
                >
                  Open in Google Maps <ArrowRight className="w-[14px] h-[14px]" />
                </a>
              </div>
              
              {/* Decorative Floral Filler for Empty Space */}
              <div className="hidden md:flex w-[calc(50%-4rem)] justify-center items-center pointer-events-none select-none top-0 bottom-0">
                <FloralMotif />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
