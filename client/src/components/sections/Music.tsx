import { Play, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Release } from "@shared/schema";

export default function Music() {
  const { data: releases = [], isLoading } = useQuery<Release[]>({
    queryKey: ["/api/releases"],
    queryFn: async () => {
      const res = await fetch("/api/releases");
      if (!res.ok) throw new Error("Failed to fetch releases");
      return res.json();
    },
  });

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
          <a href="#" data-testid="link-view-all-releases" className="text-white hover:text-primary transition-colors flex items-center gap-2 mt-6 md:mt-0">
            View All Releases <ArrowUpRight size={20} />
          </a>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-white/5 mb-6" />
                <div className="h-4 bg-white/5 w-1/3 mb-2" />
                <div className="h-6 bg-white/5 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {releases.map((release, index) => (
              <motion.a
                key={release.id}
                href={release.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer block"
                data-testid={`card-release-${release.id}`}
              >
                <div className="relative aspect-square overflow-hidden bg-black mb-6">
                  <img 
                    src={release.imageUrl} 
                    alt={release.title}
                    data-testid={`img-release-${release.id}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Play fill="black" className="text-black ml-1" size={20} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div data-testid={`text-type-${release.id}`} className="text-xs font-bold tracking-widest text-accent uppercase">
                    {release.type}
                  </div>
                  <h4 data-testid={`text-title-${release.id}`} className="text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {release.title}
                  </h4>
                  <p data-testid={`text-platform-${release.id}`} className="text-muted-foreground text-sm">
                    Listen on {release.platform}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        )}

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
