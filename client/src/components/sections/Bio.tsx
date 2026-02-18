import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";
import bioImage from "@assets/bio_collage_new.jpg";
import CyberTextHighlight from "@/components/ui/cyber-text";
import PlatformStats from "@/components/ui/platform-stats";

export default function Bio() {
  const [, navigate] = useLocation();
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageClick = useCallback(() => {
    // Trigger click burst animation
    if (imageRef.current) {
      imageRef.current.classList.add("collage-click-burst");
      setTimeout(() => imageRef.current?.classList.remove("collage-click-burst"), 700);
    }
    // Navigate after a brief visual beat
    setTimeout(() => {
      sessionStorage.setItem("scrollTarget", "visual-diary");
      navigate("/about");
    }, 250);
  }, [navigate]);

  return (
    <section id="about" className="py-16 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          <motion.div
            className="md:col-span-5 order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Clickable image that navigates to About > Visual Diary */}
            <div
              ref={imageRef}
              className="relative aspect-[3/4] overflow-hidden rounded-sm group cursor-pointer artist-photo-wrapper"
              onClick={handleImageClick}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") handleImageClick(); }}
            >
              <motion.img
                src={bioImage}
                alt="Jae Ordon - Click to view Visual Diary"
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
              />

              {/* "View Visual Diary" label — cyber wave animation on hover */}
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center pb-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
                <span className="cyber-wave-label">
                  <span className="cyber-wave-scan" />
                  <span className="cyber-wave-border" />
                  <span className="relative z-10">View Visual Diary</span>
                </span>
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-7 order-1 md:order-2 md:pl-12">
            <CyberTextHighlight>
              <motion.h2
                className="text-sm font-bold tracking-widest text-accent uppercase mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The Artist
              </motion.h2>
              <motion.h3
                className="text-5xl font-serif font-bold text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                JAE ORDON
              </motion.h3>
            </CyberTextHighlight>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CyberTextHighlight>
                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-200 mb-8">
                  "Also known as 'Mascot's Distance,' crafting Folk-Jazz-Rock compositions that move both Heart and mind."
                </p>

                <div className="prose prose-invert prose-2xl text-gray-300 mb-12">
                  <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
                    His artistry has been featured in Time Out New York and recognized by
                    ASCAP's exclusive songwriter workshops. Jae has collaborated with icons
                    connected to Michael McDonald, John Mayer, Christopher Cross, and even
                    The Gorillaz.
                  </p>
                </div>
              </CyberTextHighlight>

              <Separator className="bg-white/10 mb-8" />

              {/* Platform Stats Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <PlatformStats />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
