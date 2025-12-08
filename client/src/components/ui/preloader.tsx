import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center flex-col"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? "auto" : "none" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="overflow-hidden">
        <motion.h1
          className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          JAE ORDON
        </motion.h1>
      </div>
      <div className="overflow-hidden mt-4">
        <motion.p
          className="text-accent text-sm md:text-lg uppercase tracking-widest font-bold"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        >
          Folk • Jazz • Rock
        </motion.p>
      </div>
      
      <motion.div 
        className="absolute bottom-10 right-10 text-white/20 font-mono text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        LOADING...
      </motion.div>
    </motion.div>
  );
}
