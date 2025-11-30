import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/cinematic_dark_moody_artist_portrait.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Jae Ordon"
          className="w-full h-full object-cover opacity-60"
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
          <span className="text-accent font-bold tracking-widest uppercase text-sm">
            Folk-Jazz-Rock Fusion
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight text-white">
            UNCOVER <br />
            <span className="text-muted-foreground italic">THE SOUND</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-md leading-relaxed">
            Your next favorite artist awaits. Experience the genre-bending
            mastery of Jae Ordon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-8 py-6 rounded-none"
            >
              LATEST DROPS
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white text-lg px-8 py-6 rounded-none"
            >
              WATCH VIDEO
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
