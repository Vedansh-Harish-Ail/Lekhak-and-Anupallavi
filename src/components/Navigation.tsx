'use client';
import { Menu, Heart, Home, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  return (
    <>
      {/* TopAppBar (from JSON) */}
      <header
        aria-label="Top Navigation"
        className="fixed top-0 w-full z-50 bg-[#fbf9f5]/70 dark:bg-stone-900/70 backdrop-blur-md hidden md:flex justify-between items-center px-8 py-6 transition-all duration-500"
      >
        <button
          aria-label="Menu"
          className="text-[#735c00] dark:text-[#d4af37] hover:opacity-80 transition-opacity duration-500 scale-95 transition-transform"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="font-headline text-xl italic font-light text-[#735c00] dark:text-[#d4af37]">
          The Digital Heirloom
        </div>
        <button
          aria-label="Favorite"
          className="text-[#735c00] dark:text-[#d4af37] hover:opacity-80 transition-opacity duration-500 scale-95 transition-transform"
        >
          <Heart className="w-6 h-6" />
        </button>
      </header>

      {/* BottomNavBar Component from JSON (Mobile Only) */}
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-0 w-full flex justify-center pb-6 sm:pb-8 z-50 px-4 md:hidden"
      >
        <div className="w-auto rounded-full bg-[#ffffff]/80 dark:bg-stone-800/80 backdrop-blur-xl flex items-center justify-center shadow-[0_12px_32px_rgba(115,92,0,0.06)] px-1.5 py-1.5 gap-1.5 sm:gap-2">
          {/* Home (Active) */}
          <Link
            href="#"
            className="flex items-center justify-center bg-[#ffffff]/90 dark:bg-stone-700 backdrop-blur-xl text-[#735c00] dark:text-[#d4af37] rounded-full p-3 sm:p-4 scale-105 sm:scale-110 active:scale-90 transition-all duration-500 shadow-sm"
          >
            <Home fill="currentColor" strokeWidth={1} className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          {/* Events */}
          <Link
            href="#events"
            className="flex items-center justify-center text-[#735c00]/50 dark:text-[#d4af37]/50 p-3 sm:p-4 hover:text-[#735c00] dark:hover:text-[#d4af37] transition-all duration-500 active:scale-90"
          >
            <Calendar strokeWidth={2} className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          {/* RSVP */}
          <Link
            href="#rsvp"
            className="flex items-center justify-center text-[#735c00]/50 dark:text-[#d4af37]/50 p-3 sm:p-4 hover:text-[#735c00] dark:hover:text-[#d4af37] transition-all duration-500 active:scale-90"
          >
            <Mail strokeWidth={2} className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>
      </nav>
    </>
  );
}
