'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { WeddingData } from '@/lib/data';

interface EventsSectionProps {
  events: WeddingData['events'];
}

// Parse date strings like "2nd May", "6th May" → Date object in 2026
function parseEventDate(dateStr: string, timeStr: string): Date {
  const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
  return new Date(`${cleaned} 2026 ${timeStr.replace(' onwards', '').replace(' AM', ' AM').replace(' PM', ' PM')}`);
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, past: false });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, past: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        past: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-headline text-4xl md:text-5xl font-light text-primary leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/60 mt-2">
        {label}
      </span>
    </div>
  );
}

function EventCountdown({ dateStr, timeStr }: { dateStr: string; timeStr: string }) {
  const target = parseEventDate(dateStr, timeStr);
  const { days, hours, minutes, seconds, past } = useCountdown(target);

  if (past) {
    return (
      <p className="font-headline italic text-lg text-primary/70 text-center">
        The celebration has begun ✨
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="font-label text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/50">
        Counting down
      </span>
      <div className="flex items-end gap-6 md:gap-8">
        <CountdownBlock label="Days" value={days} />
        <span className="font-headline text-3xl text-primary/30 mb-2">:</span>
        <CountdownBlock label="Hours" value={hours} />
        <span className="font-headline text-3xl text-primary/30 mb-2">:</span>
        <CountdownBlock label="Mins" value={minutes} />
        <span className="font-headline text-3xl text-primary/30 mb-2">:</span>
        <CountdownBlock label="Secs" value={seconds} />
      </div>
    </div>
  );
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

              {/* Content Card */}
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

              {/* Live Countdown — fills the empty alternating space */}
              <div className="hidden md:flex w-[calc(50%-4rem)] justify-center items-center">
                <EventCountdown dateStr={event.date} timeStr={event.time} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
