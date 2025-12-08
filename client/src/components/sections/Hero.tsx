import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/image_1764473686174.png";
import Marquee from "@/components/ui/marquee";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Jae Ordon"
          className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
          style={{ animation: "zoom 20s infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-accent font-bold tracking-widest uppercase text-sm inline-block border-b border-accent pb-1"
          >
            Folk-Jazz-Rock Fusion
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight text-white mix-blend-overlay">
            UNCOVER <br />
            <span className="text-white italic">THE SOUND</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-md leading-relaxed border-l-2 border-primary pl-4">
            Your next favorite artist awaits. Experience the genre-bending
            mastery of Jae Ordon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-8 py-6 rounded-none transition-all hover:scale-105"
            >
              LATEST DROPS
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 rounded-none backdrop-blur-sm transition-all hover:scale-105"
            >
              WATCH VIDEO
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Marquee at bottom of hero */}
      <div className="absolute bottom-0 w-full bg-primary/10 backdrop-blur-md border-t border-primary/20 py-4 z-20">
        <Marquee pauseOnHover className="[--duration:20s]">
          {["NEW ALBUM OUT NOW", " • ", "LISTEN ON SPOTIFY", " • ", "TOUR DATES ANNOUNCED SOON", " • ", "UNCOVER THE SOUND", " • "].map((text, i) => (
            <span key={i} className="text-white font-bold tracking-widest uppercase mx-4 text-sm md:text-base">
              {text}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
