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
            <p className="font-bold text-xl text-white mb-6">
              Jim Beard, who was a world renowned jazz pianist for Steely Dan - (referring to Jae’s Nashville album), states “Congratulations on a marvelous album Jae!”.
            </p>
            <p>
              This ground breaking album had one of it’s recordings entitled Life Whispers On, reach #7 on Canada’s Cashbox Radio in the August of 2024.
            </p>
            <p>
              Disc Jockey Dave Michaels for Albany’s  WEXT radio responds to Jae Ordon’s music, proclaiming….”These recordings are masterpieces!”.
            </p>
            <p>
              Jae Ordon, (AKA Mascot’s Distance) sings his Folk-Jazz-Rock compositions while accompanying himself on piano and guitar has been featured in Time Out New York and was also chosen to be a featured artist at two exclusive ASCAP workshops.  He has worked with Ian Gillan of Deep Purple, Michael McDonald’s horn section, member’s of John Mayer’s band, Christopher Cross’s band Robben Ford’s bass player Brian Allen, Lori McKenna’s drummer Wes Little, Brittany Murphy, Karen and more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="w-full h-64 md:h-auto relative">
              <img 
                src={pianoImage} 
                alt="Jae at the piano" 
                className="w-full h-full object-contain bg-black/20"
              />
            </div>
            <div className="w-full h-64 md:h-auto relative">
              <img 
                src={liveImage} 
                alt="Jae performing live" 
                className="w-full h-full object-contain bg-black/20"
              />
            </div>
            <div className="w-full h-64 md:h-auto relative">
              <img 
                src={cuttingRoomImage} 
                alt="Jae in the cutting room" 
                className="w-full h-full object-contain bg-black/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-white mb-12 text-center">
            CRITICS SAY
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/40 p-8 border border-white/10">
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                “Mascot’s Distance, at last an original sound in that spiny, sparkling streak of sardonic American music occupied by Steely Dan. Very reminiscent of the seductive hooks & jazz influenced energy featured in the great work of The Style Council.”
              </p>
              <p className="text-accent font-bold text-sm uppercase tracking-widest">
                — Robert Whyte (The Village Voice)
              </p>
            </div>
            <div className="bg-black/40 p-8 border border-white/10">
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                “It would be too easy to write off Mascot’s Distance as disciples of Ben Folds Five or Keane. Sure, they all boast stellar line-ups and ultra catchy melodies, but that is as far as the comparisons should go. Musically, they venture into the jazz influenced pop realm of Steely Dan, complete with all of the dark humor.”
              </p>
              <p className="text-accent font-bold text-sm uppercase tracking-widest">
                — Marco Passarelli (The New Yorker Magazine)
              </p>
            </div>
            <div className="bg-black/40 p-8 border border-white/10">
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                “The use of sweet chords & rhythms combined with bitter lyrics, a pervasive thread in the efforts of Mascot’s Distance. The synthesis of jazzy, poppy melodic hooks with a glimmering glimpse of the darker side of the picket fence apple pie America.”
              </p>
              <p className="text-accent font-bold text-sm uppercase tracking-widest">
                — A.J. Maloney (New York Times)
              </p>
            </div>
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
                className="h-[500px] relative group overflow-hidden bg-black/20"
              >
                <img 
                  src={art} 
                  alt={`Artwork ${index + 1}`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
