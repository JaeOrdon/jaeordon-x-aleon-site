import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import bioImage from "@assets/20201128_113409_1764875387489.jpg";
import pianoImage from "@assets/Jae_piano_1764875387489.jpg";
import liveImage from "@assets/jAE_MAKE_MUSIC_1764875387489.jpeg";
import cuttingRoomImage from "@assets/jae_cutting_room_1764875524054.jpeg";
import art1 from "@assets/1960's_1764875387489.jpg";
import art2 from "@assets/a_stairway_to_mid_level_management_1764875387489.jpeg";
import art3 from "@assets/dancer_1764875387489.jpeg";
import art4 from "@assets/balloon_machine_2_1764875524054.jpg";
import art5 from "@assets/brick_face__1764875524054.jpg";
import art6 from "@assets/keys_piano_dancing_1764875387489.jpg";
import art7 from "@assets/walking_boulevard.jpg";
import art8 from "@assets/saved_drawing.jpg";
import art9 from "@assets/collage.jpg";
import art10 from "@assets/beach_contemplation.jpg";
import art11 from "@assets/front_cover.jpg";
import PageTransition from "@/components/layout/PageTransition";
import RevealText from "@/components/ui/reveal-text";
import CyberTextHighlight from "@/components/ui/cyber-text";

export default function About() {
  const photoRef = useRef<HTMLDivElement>(null);

  // On mount: scroll to a target section if set, otherwise scroll to top
  React.useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      // Give the page time to fully render before scrolling
      const raf = requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) {
            // Offset by navbar height (80px) + some breathing room (24px)
            const top = el.getBoundingClientRect().top + window.scrollY - 104;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 200);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  // Click handler for the photo — scroll to Visual Diary + burst animation
  const handlePhotoClick = useCallback(() => {
    // Add burst animation
    if (photoRef.current) {
      photoRef.current.classList.add("photo-click-burst");
      setTimeout(() => {
        photoRef.current?.classList.remove("photo-click-burst");
      }, 600);
    }
    // Scroll to the Visual Diary section
    setTimeout(() => {
      const el = document.getElementById("visual-diary");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  }, []);

  return (
    <PageTransition>
      <div id="about" className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CyberTextHighlight>
                <RevealText
                  text="THE ARTIST"
                  className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-white mb-4 md:mb-6"
                />
              </CyberTextHighlight>
              <CyberTextHighlight>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8">
                  Jae Ordon, also known as "Mascot's Distance," is a genre-defying artist
                  blending Folk, Jazz, and Rock into a unique sonic tapestry.
                </p>
              </CyberTextHighlight>
            </motion.div>

            {/* Artist Photo — clickable, links to Visual Diary */}
            <motion.div
              ref={photoRef}
              className="relative aspect-[3/4] md:aspect-square artist-photo-wrapper cursor-pointer group"
              onClick={handlePhotoClick}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.img
                src={art10}
                alt="Jae Ordon Portrait"
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* "View Visual Diary" label — visible on mobile, hover-reveal on desktop */}
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center pb-8 opacity-100 md:opacity-0 translate-y-0 md:translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
                <span className="cyber-wave-label">
                  <span className="cyber-wave-scan" />
                  <span className="cyber-wave-border" />
                  <span className="relative z-10">View Visual Diary</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <Separator className="bg-white/10" />

        {/* Story Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <CyberTextHighlight>
              <div className="prose prose-invert prose-xl max-w-none">
                <p className="font-bold text-xl text-white mb-6">
                  Jim Beard, who was a world renowned jazz pianist for Steely Dan - (referring to Jae's Nashville album), states "Congratulations on a marvelous album Jae!".
                </p>
                <p>
                  This ground breaking album had one of it's recordings entitled Life Whispers On, reach #7 on Canada's Cashbox Radio in the August of 2024. Disc Jockey Dave Michaels for Albany's WEXT radio responds to Jae Ordon's music, proclaiming…."These recordings are masterpieces!". Jae Ordon, (AKA Mascot's Distance) sings his Folk-Jazz-Rock compositions while accompanying himself on piano and guitar and has been featured in Time Out New York in addition to being chosen to be a featured artist at two exclusive ASCAP workshops. He has worked with Ian Gillan of Deep Purple, Michael McDonald's horn section, members of John Mayer's band, Christopher Cross's band and Robben Ford's bass player Brian Allen, Lori McKenna's drummer Wes Little, Brittany Murphy, Karen Allen and more.
                </p>
              </div>
            </CyberTextHighlight>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {[
                { src: pianoImage, alt: "Jae at the piano" },
                { src: liveImage, alt: "Jae performing live" },
                { src: cuttingRoomImage, alt: "Jae in the cutting room" },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  className="w-full h-56 sm:h-64 md:h-auto relative group overflow-hidden about-photo-card"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-contain bg-black/20 transition-all duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <CyberTextHighlight className="inline-block mx-auto w-full text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                CRITICS SAY
              </h2>
            </CyberTextHighlight>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  quote: "\"Mascot's Distance, at last an original sound in that spiny, sparkling streak of sardonic American music occupied by Steely Dan. Very reminiscent of the seductive hooks & jazz influenced energy featured in the great work of The Style Council.\"",
                  author: "Robert Whyte (The Village Voice)",
                },
                {
                  quote: "\"It would be too easy to write off Mascot's Distance as disciples of Ben Folds Five or Keane. Sure, they all boast stellar line-ups and ultra catchy melodies, but that is as far as the comparisons should go. Musically, they venture into the jazz influenced pop realm of Steely Dan, complete with all of the dark humor.\"",
                  author: "Marco Passarelli (The New Yorker Magazine)",
                },
                {
                  quote: "\"The use of sweet chords & rhythms combined with bitter lyrics, a pervasive thread in the efforts of Mascot's Distance. The synthesis of jazzy, poppy melodic hooks with a glimmering glimpse of the darker side of the picket fence apple pie America.\"",
                  author: "A.J. Maloney (New York Times)",
                },
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CyberTextHighlight>
                    <div className="cyberwave-card group relative p-8 bg-black/50 overflow-hidden">
                      {/* Animated gradient border */}
                      <div className="cyberwave-border-glow" />
                      {/* Scan line that sweeps across */}
                      <div className="cyberwave-scan" />
                      {/* Corner brackets */}
                      <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none z-[5]">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/40" />
                        <div className="absolute top-0 left-0 h-full w-[1px] bg-primary/40" />
                      </div>
                      <div className="absolute top-0 right-0 w-5 h-5 pointer-events-none z-[5]">
                        <div className="absolute top-0 right-0 w-full h-[1px] bg-primary/25" />
                        <div className="absolute top-0 right-0 h-full w-[1px] bg-primary/25" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none z-[5]">
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/25" />
                        <div className="absolute bottom-0 left-0 h-full w-[1px] bg-accent/25" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none z-[5]">
                        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-accent/40" />
                        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-accent/40" />
                      </div>
                      {/* Content */}
                      <div className="relative z-[3]">
                        <p className="text-gray-300 italic mb-6 leading-relaxed">
                          {review.quote}
                        </p>
                        <p className="text-accent font-bold text-sm uppercase tracking-widest">
                          — {review.author}
                        </p>
                      </div>
                    </div>
                  </CyberTextHighlight>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Art Gallery */}
        <section id="visual-diary" className="py-12 md:py-20 px-4 md:px-6 bg-card">
          <div className="max-w-7xl mx-auto">
            <CyberTextHighlight className="inline-block mx-auto w-full text-center mb-6 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                VISUAL DIARY
              </h2>
            </CyberTextHighlight>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
              {[art1, art2, art3, art4, art5, art6, art7, art8, art9, art11].map((art, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.7,
                    delay: (index % 2) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-[220px] sm:h-[320px] md:h-[500px] relative group overflow-hidden bg-black/20 diary-card"
                >
                  {/* Image — cinematic reveal: starts cool-tinted, warms on scroll-in */}
                  <motion.img
                    src={art}
                    alt={`Artwork ${index + 1}`}
                    className="w-full h-full object-contain md:object-cover transition-all duration-700 ease-out group-hover:scale-[1.06]"
                    initial={{ opacity: 0, scale: 1.08 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />


                  {/* Bottom label — always visible on mobile, hover-reveal on desktop */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 z-[7] flex items-center justify-center pb-3 md:pb-5 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 0.7, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.35em] text-white/50 bg-black/40 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2">
                      Artwork {index + 1}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
