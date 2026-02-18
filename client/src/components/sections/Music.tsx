import { Play, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import CyberTextHighlight from "@/components/ui/cyber-text";

interface Release {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
  link: string;
  webLink: string;
  platform: string;
  sortOrder: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// 3D tilt card wrapper
function TiltCard({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function Music() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/releases.json")
      .then((response) => response.json())
      .then((data) => {
        setReleases(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading releases:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="music" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <CyberTextHighlight>
              <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-4">
                Discography
              </h2>
              <h3 className="text-5xl font-serif font-bold text-white">
                LATEST RELEASES
              </h3>
            </CyberTextHighlight>
          </motion.div>
          <motion.a
            href="https://open.spotify.com/artist/5S0RsBShI3xk8bUix0JfpO?go=1"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-view-all-releases"
            className="text-white hover:text-primary transition-colors flex items-center gap-2 mt-6 md:mt-0"
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Releases <ArrowUpRight size={20} />
          </motion.a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-16">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-white/5 mb-6" />
                <div className="h-4 bg-white/5 w-1/3 mb-2" />
                <div className="h-6 bg-white/5 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-16" style={{ perspective: "1200px" }}>
            {releases.map((release, index) => (
              <motion.a
                key={release.id}
                href={release.webLink}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileTap={{ scale: 0.96 }}
                className="group cursor-pointer block no-underline release-card"
                data-testid={`card-release-${release.id}`}
              >
                <TiltCard className="relative">
                  {/* Image container with glow border on hover */}
                  <div className="relative aspect-square overflow-hidden bg-black mb-6 release-img-container">
                    <img
                      src={release.imageUrl}
                      alt={release.title}
                      data-testid={`img-release-${release.id}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay that shifts on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-all duration-500" />

                    {/* Animated play button — spins in on hover */}
                    <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 w-9 h-9 md:w-14 md:h-14 bg-primary rounded-full flex items-center justify-center opacity-0 scale-50 rotate-180 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500 ease-out shadow-lg shadow-primary/30">
                      <Play fill="black" className="text-black ml-0.5 md:ml-1" size={14} />
                    </div>

                    {/* Shimmer sweep on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="release-shimmer absolute inset-0" />
                    </div>
                  </div>
                </TiltCard>

                <div className="space-y-2">
                  <div data-testid={`text-type-${release.id}`} className="text-xs font-bold tracking-widest text-accent uppercase">
                    {release.type}
                  </div>
                  <h4 data-testid={`text-title-${release.id}`} className="text-sm sm:text-lg md:text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight">
                    {release.title}
                  </h4>
                  <p data-testid={`text-platform-${release.id}`} className="text-muted-foreground text-sm inline-flex items-center gap-1.5 group-hover:text-white transition-all duration-300">
                    <span className="group-hover:underline underline-offset-4">
                      Listen on {release.platform}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-2 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-400"
                    />
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full group/player spotify-player-wrapper relative"
        >
          {/* Multi-layer animated glow behind the player */}
          <div className="absolute -inset-[2px] rounded-[14px] spotify-glow opacity-0 group-hover/player:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
          <div className="absolute -inset-[1px] rounded-[13px] opacity-0 group-hover/player:opacity-60 transition-opacity duration-500 pointer-events-none z-0"
            style={{
              background: "linear-gradient(135deg, rgba(29,185,84,0.15), transparent 40%, transparent 60%, rgba(255,107,53,0.1))",
            }}
          />

          {/* Animated corner accents - staggered reveal */}
          <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none z-10">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 group-hover/player:from-primary/70 to-transparent transition-all duration-500" />
            <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-primary/0 group-hover/player:from-primary/70 to-transparent transition-all duration-500" />
          </div>
          <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none z-10">
            <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-primary/0 group-hover/player:from-primary/70 to-transparent transition-all duration-500 delay-75" />
            <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-primary/0 group-hover/player:from-primary/70 to-transparent transition-all duration-500 delay-75" />
          </div>
          <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none z-10">
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent/0 group-hover/player:from-accent/50 to-transparent transition-all duration-500 delay-150" />
            <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-accent/0 group-hover/player:from-accent/50 to-transparent transition-all duration-500 delay-150" />
          </div>
          <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none z-10">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-accent/0 group-hover/player:from-accent/50 to-transparent transition-all duration-500 delay-200" />
            <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-accent/0 group-hover/player:from-accent/50 to-transparent transition-all duration-500 delay-200" />
          </div>

          {/* "Now Playing" indicator with equalizer */}
          <div className="absolute -top-9 left-0 flex items-center gap-3 opacity-0 group-hover/player:opacity-100 transition-all duration-500 translate-y-2 group-hover/player:translate-y-0">
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-[3px] bg-primary rounded-full eq-bar eq-bar-1" />
              <span className="w-[3px] bg-primary rounded-full eq-bar eq-bar-2" />
              <span className="w-[3px] bg-primary rounded-full eq-bar eq-bar-3" />
              <span className="w-[3px] bg-primary rounded-full eq-bar eq-bar-4" />
            </div>
            <span className="text-primary text-xs font-bold uppercase tracking-[0.25em]">Now Playing</span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          {/* Right side indicator */}
          <div className="absolute -top-9 right-0 flex items-center gap-2 opacity-0 group-hover/player:opacity-100 transition-all duration-500 delay-100 translate-y-2 group-hover/player:translate-y-0">
            <div className="h-[1px] w-12 bg-gradient-to-l from-accent/30 to-transparent" />
            <span className="text-accent/50 text-[10px] font-bold uppercase tracking-[0.2em]">Spotify</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="relative z-[1] spotify-player-inner rounded-xl overflow-hidden">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
