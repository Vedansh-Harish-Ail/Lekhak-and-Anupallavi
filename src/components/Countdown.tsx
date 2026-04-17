'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_DATE = new Date('2026-05-06T10:30:00+05:30').getTime();

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    past: false,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          past: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        past: false,
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  if (timeLeft.past) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-8 font-headline text-xl sm:text-2xl italic text-primary/80 text-center"
      >
        The celebration has begun
      </motion.p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="mt-8 sm:mt-10 flex w-full max-w-[340px] flex-col items-center gap-4"
      aria-label="Countdown to the wedding ceremony"
      role="timer"
    >
      <span className="font-label text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-primary/70">
        Until the ceremony
      </span>
      <div className="flex w-full items-end justify-between gap-2 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </motion.div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-12 flex-col items-center">
      <span className="font-headline text-3xl sm:text-4xl font-light leading-none text-primary tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-2 font-label text-[7px] sm:text-[8px] uppercase tracking-[0.24em] text-on-surface-variant/55">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="mb-6 h-8 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
  );
}
