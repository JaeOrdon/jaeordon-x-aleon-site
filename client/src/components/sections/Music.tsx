import { Play, ArrowUpRight } from "lucide-react";
import masterpieceArt from "@assets/masterpiece_cover.jpg";
import plasticNightArt from "@assets/md_ep_adjusted.jpg";
import heroesArt from "@assets/Scan_2_1764875387489.jpg";
import madmanArt from "@assets/horpsy_madman_1764875524054.png";
import { motion } from "framer-motion";

const releases = [
  {
    title: "Madman's Warehouse",
    type: "Latest Release",
    image: madmanArt,
    link: "#",
    platform: "Spotify"
  },
  {
    title: "Ain't That Like My Masterpiece",
    type: "Single",
    image: masterpieceArt,
    link: "https://open.spotify.com/track/3DPBvXAjOU8vgr8VWeLyTd?si=dda6976d00ee4da1",
    platform: "Spotify"
  },
  {
    title: "A Jazze Plastic Night",
    type: "Playlist",
    image: plasticNightArt,
    link: "https://soundcloud.com/j_ordon/sets/reaching-thru-a-plastic-jazzy?si=82df597d85ca45039a35baf5b4ad1943&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    platform: "SoundCloud"
  },
  {
    title: "Heroes in the Dark",
    type: "Single",
    image: heroesArt, 
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

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {releases.map((release, index) => (
            <motion.a
              key={index}
              href={release.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer block"
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
                <h4 className="text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors leading-tight">
                  {release.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  Listen on {release.platform}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <iframe 
            data-testid="embed-iframe" 
            style={{ borderRadius: "12px" }} 
            src="https://open.spotify.com/embed/artist/5S0RsBShI3xk8bUix0JfpO?utm_source=generator" 
            width="100%" 
            height="450" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy" 
            title="Spotify Player"
          />
        </motion.div>
      </div>
    </section>
  );
}
