import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import album1 from "@assets/generated_images/abstract_album_cover_folk_jazz_rock.png";
import album2 from "@assets/generated_images/psychedelic_r&b_album_cover.png";

const releases = [
  {
    title: "Reaching Thru a Plastic Jazzy",
    type: "EP / Playlist",
    image: album1,
    link: "#",
    platform: "SoundCloud"
  },
  {
    title: "Heroes in the Dark",
    type: "Single",
    image: album2,
    link: "#",
    platform: "Bandcamp"
  },
  {
    title: "A Puddle Driving Down the Street",
    type: "Album",
    image: album1, // Reusing for layout demo
    link: "#",
    platform: "Bandcamp"
  }
];

export default function Music() {
  return (
    <section id="music" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-4">
              Discography
            </h2>
            <h3 className="text-5xl font-serif font-bold text-white">
              LATEST RELEASES
            </h3>
          </div>
          <a href="#" className="text-white hover:text-primary transition-colors flex items-center gap-2 mt-6 md:mt-0">
            View All Releases <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-black mb-6">
                <img 
                  src={release.image} 
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Play fill="black" className="text-black ml-1" size={20} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-bold tracking-widest text-accent uppercase">
                  {release.type}
                </div>
                <h4 className="text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors">
                  {release.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  Available on {release.platform}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
