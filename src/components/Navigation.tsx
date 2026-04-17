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

    </>
  );
}
