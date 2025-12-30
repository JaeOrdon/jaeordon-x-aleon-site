import { motion } from "framer-motion";
import { useState } from "react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          onViewportEnter={() => setIsPlaying(true)}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full overflow-hidden border border-white/10 shadow-2xl bg-black"
        >
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/CqL2SR0sxOU?rel=0&mute=1&autoplay=${isPlaying ? 1 : 0}&controls=1&playsinline=1`}
            title="Madman's Warehouse - Jae Ordon" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
