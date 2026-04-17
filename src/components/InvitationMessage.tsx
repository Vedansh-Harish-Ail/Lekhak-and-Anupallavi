'use client';
import { motion } from 'framer-motion';

export function InvitationMessage({ message }: { message: string }) {
  return (
    <section className="py-24 md:py-36 px-6 relative bg-bone text-center transition-colors duration-1000">
      <div className="layout-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }
            }
          }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-headline italic text-h3 text-on-surface leading-relaxed tracking-wide font-light text-balance">
            {message}
          </p>
        <motion.div
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1, transition: { duration: 1.2, delay: 0.2, ease: "easeOut" } }
          }}
          className="mt-20 flex justify-center origin-center"
        >
          <div className="w-24 h-px bg-outline-variant/60" />
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
