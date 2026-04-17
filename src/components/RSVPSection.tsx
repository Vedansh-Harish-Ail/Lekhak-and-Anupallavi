'use client';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface RSVPSectionProps {
  phone: string;
  message: string;
}

export function RSVPSection({ phone, message }: RSVPSectionProps) {
  const handleRSVP = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="rsvp" className="py-24 md:py-36 bg-stone-light relative overflow-hidden flex items-center justify-center">
      <div className="layout-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-xl w-full mx-auto text-center relative z-10 p-8 sm:p-12 md:p-20 bg-surface/60 backdrop-blur-md border-hairline shadow-[0_12px_32px_rgba(115,92,0,0.03)]"
        >
          <div className="text-primary opacity-50 mb-6 md:mb-8 flex justify-center">
            <Mail className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
          </div>
          <h2 className="font-headline text-h2 font-light text-on-surface mb-6">
            RSVP
          </h2>
          <p className="font-headline italic text-lg sm:text-xl text-on-surface-variant/80 mb-8 md:mb-12 text-balance font-light leading-relaxed">
            We would be deeply honored by your presence. Kindly let us know if we will see you there.
          </p>
          <button 
            onClick={handleRSVP}
            className="w-full sm:w-auto bg-primary text-on-primary py-4 md:py-5 px-10 md:px-12 font-label tracking-extreme text-[10px] sm:text-xs font-light hover:bg-primary/90 hover:shadow-lg transition-all duration-500 mx-auto active:scale-95"
          >
            RESPOND ON WHATSAPP
          </button>
        </motion.div>
      </div>
    </section>
  );
}
