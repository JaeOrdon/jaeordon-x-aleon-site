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

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6">
              THE ARTIST
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Jae Ordon, also known as "Mascot’s Distance," is a genre-defying artist 
              blending Folk, Jazz, and Rock into a unique sonic tapestry.
            </p>
          </motion.div>
          <div className="relative aspect-[3/4] md:aspect-square">
            <img 
              src={bioImage} 
              alt="Jae Ordon Portrait" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      <Separator className="bg-white/10" />

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="prose prose-invert prose-lg max-w-none">
            <p>
              His artistry has been featured in Time Out New York and recognized by ASCAP’s 
              exclusive songwriter workshops. Jae has collaborated with icons connected to 
              Michael McDonald, John Mayer, Christopher Cross, and even The Gorillaz.
            </p>
            <p>
              More than just a musician, Jae is a visual artist whose sketches and paintings 
              often inform his musical compositions. His creative process is a dialogue 
              between sight and sound.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <img 
              src={pianoImage} 
              alt="Jae at the piano" 
              className="w-full aspect-video object-cover"
            />
            <img 
              src={liveImage} 
              alt="Jae performing live" 
              className="w-full aspect-video object-cover"
            />
            <img 
              src={cuttingRoomImage} 
              alt="Jae in the cutting room" 
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>
      </section>

      {/* Visual Art Gallery */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-white mb-12 text-center">
            VISUAL DIARY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[art1, art2, art3, art4, art5].map((art, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="aspect-[3/4] relative group overflow-hidden"
              >
                <img 
                  src={art} 
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
