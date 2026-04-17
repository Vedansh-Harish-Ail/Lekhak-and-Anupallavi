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
    <div className="flex flex-col items-center flex-shrink-0">
      <span className="font-headline text-3xl md:text-4xl font-light text-primary leading-none whitespace-nowrap">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-label text-[8px] sm:text-[9px] uppercase tracking-widest text-on-surface-variant/60 mt-1.5 whitespace-nowrap">
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
    <div className="flex flex-col items-center gap-4">
      <span className="font-label text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/50 whitespace-nowrap">
        Counting down
      </span>
      <div className="flex items-end gap-3 sm:gap-4 md:gap-6 flex-nowrap shrink-0">
        <CountdownBlock label="Days" value={days} />
        <span className="font-headline text-2xl text-primary/30 mb-2 flex-shrink-0">:</span>
        <CountdownBlock label="Hours" value={hours} />
        <span className="font-headline text-2xl text-primary/30 mb-2 flex-shrink-0">:</span>
        <CountdownBlock label="Mins" value={minutes} />
        <span className="font-headline text-2xl text-primary/30 mb-2 flex-shrink-0">:</span>
        <CountdownBlock label="Secs" value={seconds} />
      </div>
    </div>
  );
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="events" className="py-24 md:py-36 bg-surface overflow-hidden">
      <div className="layout-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-16 md:mb-24 px-4"
        >
          <h2 className="font-label text-[10px] sm:text-xs uppercase tracking-extreme text-on-surface-variant/70 mb-4">
            The Details
          </h2>
          <h3 className="font-headline text-h2 font-light text-on-surface">
            The Celebrations
          </h3>
        </motion.div>

        <div className="space-y-12 md:space-y-16 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px md:before:mx-auto before:w-px before:bg-outline-variant/30">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse group pl-10 md:pl-0"
            >
              {/* Point Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-surface border border-primary z-10" />

              {/* Content Card */}
              <div className="w-full md:w-[calc(50%-3rem)] bg-surface-container-lowest p-6 sm:p-8 md:p-10 rounded-lg shadow-[0_8px_30px_rgba(115,92,0,0.03)] relative md:group-odd:mr-12 md:group-even:ml-12 hover:shadow-[0_12px_40px_rgba(115,92,0,0.06)] transition-all duration-700">
                <span className="font-label text-[9px] sm:text-[10px] uppercase tracking-extreme text-primary mb-2 block">
                  {event.date} · {event.time}
                </span>
                <h4 className="font-headline text-2xl sm:text-3xl font-light text-on-surface mb-3 md:mb-4">
                  {event.title}
                </h4>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant/80 mb-6 md:mb-8 font-light leading-relaxed">
                  {event.venue.split(',').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </p>
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-label text-[10px] sm:text-xs uppercase tracking-widest text-primary border-b border-primary/20 pb-2 hover:border-primary transition-colors inline-flex items-center gap-2 group-hover:pl-2 duration-300"
                >
                  Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Live Countdown — hidden on small mobile, visible on tablet+ */}
              <div className="hidden lg:flex w-[calc(50%-3rem)] justify-center items-center">
                <EventCountdown dateStr={event.date} timeStr={event.time} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
