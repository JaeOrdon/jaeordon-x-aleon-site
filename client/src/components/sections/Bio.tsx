import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const stats = [
  { value: "25k+", label: "Total Plays" },
  { value: "1.2k", label: "Followers" },
  { value: "30k+", label: "Views" },
];

export default function Bio() {
  return (
    <section id="about" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-4">
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-4">
              The Artist
            </h2>
            <h3 className="text-4xl font-serif font-bold text-white mb-6">
              JAE ORDON
            </h3>
            <p className="text-muted-foreground mb-8">
              Also known as "Mascot’s Distance"
            </p>
            <Separator className="bg-white/10 mb-8" />
            
            <div className="grid grid-cols-1 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 md:pl-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-2xl md:text-4xl font-serif leading-relaxed text-gray-200 mb-12">
                "Crafts Folk-Jazz-Rock compositions that move both Heart and mind."
              </p>
              
              <div className="prose prose-invert prose-lg text-gray-400">
                <p className="mb-6">
                  His artistry has been featured in Time Out New York and recognized by 
                  ASCAP’s exclusive songwriter workshops. Jae has collaborated with icons 
                  connected to Michael McDonald, John Mayer, Christopher Cross, and even 
                  The Gorillaz.
                </p>
                <p>
                  His sound blends classic musicianship with Psychedelic R&B, creating an 
                  experience that stays with every listener long after the music stops.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
