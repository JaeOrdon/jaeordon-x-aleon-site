import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import bioImage from "@assets/you_are_the_light_canvas_1764875387489.jpg";

const stats = [
  { value: "110k+", label: "Total Plays" },
  { value: "400k", label: "Followers" },
  { value: "300k+", label: "Views" },
];

export default function Bio() {
  return (
    <section id="about" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <img 
                src={bioImage} 
                alt="Jae Ordon"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="md:col-span-7 order-1 md:order-2 md:pl-12">
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-4">
              The Artist
            </h2>
            <h3 className="text-5xl font-serif font-bold text-white mb-8">
              JAE ORDON
            </h3>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-200 mb-8">
                "Also known as 'Mascot’s Distance,' crafting Folk-Jazz-Rock compositions that move both Heart and mind."
              </p>
              
              <div className="prose prose-invert prose-lg text-gray-400 mb-12">
                <p>
                  His artistry has been featured in Time Out New York and recognized by 
                  ASCAP’s exclusive songwriter workshops. Jae has collaborated with icons 
                  connected to Michael McDonald, John Mayer, Christopher Cross, and even 
                  The Gorillaz.
                </p>
              </div>

              <Separator className="bg-white/10 mb-8" />
            
              <div className="flex gap-12">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
