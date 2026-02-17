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
                  className="text-6xl md:text-8xl font-serif font-bold text-white mb-6"
                />
              </CyberTextHighlight>
              <CyberTextHighlight>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
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
                className="w-full h-full object-cover artist-photo-glow grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Gradient overlay that shifts on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-600 pointer-events-none z-[4]" />

              {/* "View Visual Diary" label — cyber wave animation on hover */}
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center pb-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none">
                <span className="cyber-wave-label">
                  <span className="cyber-wave-scan" />
                  <span className="cyber-wave-border" />
                  <span className="relative z-10">View Visual Diary</span>
                </span>
              </div>

              {/* Corner accents that appear on hover */}
              <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none z-[5]">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 group-hover:from-primary/50 to-transparent transition-all duration-500" />
                <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-primary/0 group-hover:from-primary/50 to-transparent transition-all duration-500" />
              </div>
              <div className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none z-[5]">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/0 group-hover:from-accent/40 to-transparent transition-all duration-500 delay-100" />
                <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/0 group-hover:from-accent/40 to-transparent transition-all duration-500 delay-100" />
              </div>
            </motion.div>
          </div>
        </section>

        <Separator className="bg-white/10" />

        {/* Story Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <CyberTextHighlight>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="font-bold text-xl text-white mb-6">
                  Jim Beard, who was a world renowned jazz pianist for Steely Dan - (referring to Jae's Nashville album), states "Congratulations on a marvelous album Jae!".
                </p>
                <p>
                  This ground breaking album had one of it's recordings entitled Life Whispers On, reach #7 on Canada's Cashbox Radio in the August of 2024.
                </p>
                <p>
                  Disc Jockey Dave Michaels for Albany's  WEXT radio responds to Jae Ordon's music, proclaiming…."These recordings are masterpieces!".
                </p>
                <p>
                  Jae Ordon, (AKA Mascot's Distance) sings his Folk-Jazz-Rock compositions while accompanying himself on piano and guitar has been featured in Time Out New York and was also chosen to be a featured artist at two exclusive ASCAP workshops.  He has worked with Ian Gillan of Deep Purple, Michael McDonald's horn section, member's of John Mayer's band, Christopher Cross's band Robben Ford's bass player Brian Allen, Lori McKenna's drummer Wes Little, Brittany Murphy, Karen and more.
                </p>
              </div>
            </CyberTextHighlight>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { src: pianoImage, alt: "Jae at the piano" },
                { src: liveImage, alt: "Jae performing live" },
                { src: cuttingRoomImage, alt: "Jae in the cutting room" },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  className="w-full h-64 md:h-auto relative group overflow-hidden about-photo-card"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-contain bg-black/20 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                  {/* Shimmer sweep overlay */}
                  <div className="about-photo-shimmer" />
                  {/* Glow border overlay */}
                  <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-primary/20 transition-all duration-500 z-[3]" />
                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-6 h-6 pointer-events-none z-[5]">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/0 group-hover:from-primary/40 to-transparent transition-all duration-500" />
                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-primary/0 group-hover:from-primary/40 to-transparent transition-all duration-500" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 pointer-events-none z-[5]">
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/0 group-hover:from-accent/30 to-transparent transition-all duration-500 delay-75" />
                    <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/0 group-hover:from-accent/30 to-transparent transition-all duration-500 delay-75" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <CyberTextHighlight className="inline-block mx-auto w-full text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-white">
                CRITICS SAY
              </h2>
            </CyberTextHighlight>
            <div className="grid md:grid-cols-3 gap-8">
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
        <section id="visual-diary" className="py-20 px-6 bg-card">
          <div className="max-w-7xl mx-auto">
            <CyberTextHighlight className="inline-block mx-auto w-full text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-white">
                VISUAL DIARY
              </h2>
            </CyberTextHighlight>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[art1, art2, art3, art4, art5, art6, art7, art8, art9, art11].map((art, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.9,
                    delay: (index % 3) * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-[500px] relative group overflow-hidden bg-black/20 diary-card"
                >
                  {/* Image — grayscale to color on hover with scale + brightness */}
                  <img
                    src={art}
                    alt={`Artwork ${index + 1}`}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:brightness-110"
                  />

                  {/* Dark cinematic overlay — lifts to reveal on hover */}
                  <div className="diary-dark-veil" />

                  {/* Neon glow edges */}
                  <div className="diary-glow-edges" />

                  {/* Diagonal shimmer sweep on hover */}
                  <div className="diary-shimmer" />

                  {/* Horizontal scan line that sweeps on hover */}
                  <div className="diary-scan" />

                  {/* Corner brackets that animate in */}
                  <div className="absolute top-3 left-3 w-8 h-8 pointer-events-none z-[6]">
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1px] bg-primary/60 transition-all duration-500 ease-out" />
                    <div className="absolute top-0 left-0 h-0 group-hover:h-full w-[1px] bg-primary/60 transition-all duration-500 ease-out delay-75" />
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 pointer-events-none z-[6]">
                    <div className="absolute top-0 right-0 w-0 group-hover:w-full h-[1px] bg-primary/40 transition-all duration-500 ease-out delay-100" />
                    <div className="absolute top-0 right-0 h-0 group-hover:h-full w-[1px] bg-primary/40 transition-all duration-500 ease-out delay-150" />
                  </div>
                  <div className="absolute bottom-3 left-3 w-8 h-8 pointer-events-none z-[6]">
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-accent/40 transition-all duration-500 ease-out delay-150" />
                    <div className="absolute bottom-0 left-0 h-0 group-hover:h-full w-[1px] bg-accent/40 transition-all duration-500 ease-out delay-200" />
                  </div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none z-[6]">
                    <div className="absolute bottom-0 right-0 w-0 group-hover:w-full h-[1px] bg-accent/60 transition-all duration-500 ease-out delay-200" />
                    <div className="absolute bottom-0 right-0 h-0 group-hover:h-full w-[1px] bg-accent/60 transition-all duration-500 ease-out delay-250" />
                  </div>

                  {/* Bottom label that slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 z-[7] flex items-center justify-center pb-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100 pointer-events-none">
                    <span className="text-[9px] uppercase tracking-[0.35em] text-white/50 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10">
                      Artwork {index + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
