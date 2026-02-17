import { CloudLightning, Music, Disc, Radio } from "lucide-react";
import { motion } from "framer-motion";
import CyberTextHighlight from "@/components/ui/cyber-text";

const socialLinks = [
  { href: "https://soundcloud.com/j_ordon?go=a", label: "SoundCloud", icon: CloudLightning },
  { href: "https://jaeordon.bandcamp.com", label: "Bandcamp", icon: Disc },
  { href: "https://music.apple.com/us/artist/jae-ordon/1566141772?ls=1&app=music", label: "Apple Music", icon: Music },
  { href: "https://open.spotify.com/artist/5S0RsBShI3xk8bUix0JfpO?go=1", label: "Spotify", icon: Radio },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-black py-20 border-t border-white/10">
      <motion.div
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CyberTextHighlight className="text-center md:text-left">
          <motion.h2
            className="text-2xl font-serif font-bold text-white mb-2"
            whileHover={{ scale: 1.02 }}
          >
            JAE ORDON
          </motion.h2>
          <p className="text-muted-foreground text-sm">
            &copy; 2026 Jae Ordon Music. All rights reserved.
          </p>
        </CyberTextHighlight>

        <div className="flex gap-6">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 relative overflow-hidden"
              aria-label={social.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              whileHover={{
                y: -5,
                scale: 1.15,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.85 }}
            >
              <social.icon size={20} className="relative z-10" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
