'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

export function MusicPlayer({ musicUrl }: { musicUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleStart = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch(err => console.error('Playback failed:', err));
      }
    };

    window.addEventListener('startWeddingMusic', handleStart);
    return () => window.removeEventListener('startWeddingMusic', handleStart);
  }, []);

  useEffect(() => {
    const pause = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      setIsPlaying(false);
    };

    const handleVisibilityChange = () => {
      // Pause when the tab/app is backgrounded (mobile app switch, tab change, etc).
      if (document.hidden) pause();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', pause);
    window.addEventListener('blur', pause);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', pause);
      window.removeEventListener('blur', pause);
      pause();
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(err => console.error('Playback failed:', err));
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop />

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="fixed bottom-6 right-6 z-[60]"
          >
            <button
              onClick={togglePlay}
              className="relative group flex items-center justify-center w-12 h-12 bg-gold/10 backdrop-blur-md border border-gold/20 rounded-full text-gold shadow-2xl hover:bg-gold/20 transition-all duration-300"
            >
              {/* Pulsing rings when playing */}
              {isPlaying && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 bg-white/10 rounded-full"
                  />
                </>
              )}

              <div className="relative z-10 w-5 h-5 flex items-center justify-center">
                {isPlaying ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Music className="w-5 h-5 opacity-90" strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <VolumeX className="w-5 h-5 opacity-60" strokeWidth={1.5} />
                )}
              </div>

              {/* Status Tooltip */}
              <span className="absolute right-full mr-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-[10px] uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity rounded-sm pointer-events-none">
                {isPlaying ? 'Playing Music' : 'Music Paused'}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
