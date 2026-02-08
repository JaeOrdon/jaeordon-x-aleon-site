import { CloudLightning, Music, Disc, Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif font-bold text-white mb-2">
            JAE ORDON
          </h2>
          <p className="text-muted-foreground text-sm">
            © 2026 Jae Ordon Music. All rights reserved.
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://soundcloud.com/j_ordon"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            aria-label="SoundCloud"
          >
            <CloudLightning size={20} />
          </a>
          <a
            href="https://jaeordon.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            aria-label="Bandcamp"
          >
            <Disc size={20} />
          </a>
          <a
            href="https://music.apple.com/us/artist/jae-ordon/1566141772"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            aria-label="Apple Music"
          >
            <Music size={20} />
          </a>
          <a
            href="https://open.spotify.com/artist/5S0RsBShI3xk8bUix0JfpO"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            aria-label="Spotify"
          >
            <Radio size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
