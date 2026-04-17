'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only instantiate Audio on client side once
    const audio = new Audio('/assets/music/Romantic-Wedding-Mashup-2025-SICKVED-Best-Wedding-Songs.m4a');
    audio.loop = true;
    audioRef.current = audio;

    const playOnInteraction = () => {
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            // Only remove listeners if playback successfully started
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('scroll', playOnInteraction);
          }).catch(() => {
            // Silently catch NotAllowedError so Next.js doesn't show a red overlay
          });
        }
      }
    };

    // Attach interaction listeners
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
    document.addEventListener('scroll', playOnInteraction);

    return () => {
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
      document.removeEventListener('scroll', playOnInteraction);
      // Cleanup to prevent memory leaks
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1 }}
      onClick={togglePlay}
      className="fixed bottom-[100px] md:bottom-8 right-6 md:right-8 z-50 w-12 h-12 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-[0_12px_32px_rgba(115,92,0,0.1)] flex items-center justify-center text-primary border border-outline-variant/30 hover:bg-surface transition-all duration-300"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5 fill-current" strokeWidth={1.5} />
      ) : (
        <Play className="w-5 h-5 fill-current ml-1" strokeWidth={1.5} />
      )}
    </motion.button>
  );
}
