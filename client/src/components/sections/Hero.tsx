import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/image_1764473686174.png";
import Marquee from "@/components/ui/marquee";
import CyberTextHighlight from "@/components/ui/cyber-text";

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.6 + i * 0.04,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AnimatedWord({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <a href="https://jaeordon.bandcamp.com/track/heroes-in-the-dark" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0 block cursor-pointer group">
        <motion.img
          src={heroImage}
          alt="Jae Ordon"
          className="w-full h-full object-cover opacity-60 scale-105"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ animation: "zoom 20s infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </a>

      {/* Marquee at top */}
      <motion.div
        className="absolute top-[70px] w-full bg-black/80 border-y border-primary/20 py-3 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <Marquee pauseOnHover className="[--duration:20s]">
          {["NEW ALBUM OUT NOW", " • ", "LISTEN ON SPOTIFY", " • ", "TOUR DATES ANNOUNCED SOON", " • ", "UNCOVER THE SOUND", " • "].map((text, i) => (
            <span key={i} className="text-white font-bold tracking-widest uppercase mx-4 text-sm md:text-base">
              {text}
            </span>
          ))}
        </Marquee>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <CyberTextHighlight>
            <motion.span
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-accent font-bold tracking-widest uppercase text-2xl md:text-3xl inline-block border-b border-accent pb-1"
            >
              Folk-Jazz-Rock Fusion
            </motion.span>
          </CyberTextHighlight>
          <CyberTextHighlight>
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-tight text-white">
              <AnimatedWord text="UNCOVER" startIndex={0} />
              <br />
              <span className="italic">
                <AnimatedWord text="THE SOUND" startIndex={7} />
              </span>
            </h1>
          </CyberTextHighlight>
          <CyberTextHighlight>
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl text-gray-300 max-w-md leading-relaxed border-l-2 border-primary pl-4"
            >
              Your next favorite artist awaits. Experience the genre-bending
              mastery of Jae Ordon.
            </motion.p>
          </CyberTextHighlight>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-8 py-6 rounded-none transition-all hero-btn-glow"
              >
                <a href="https://open.spotify.com/artist/5S0RsBShI3xk8bUix0JfpO?go=1" target="_blank" rel="noopener noreferrer">
                  LATEST DROPS
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 rounded-none transition-all"
              >
                <a href="https://www.youtube.com/@midnightcorresponden" target="_blank" rel="noopener noreferrer">
                  YOUTUBE
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
