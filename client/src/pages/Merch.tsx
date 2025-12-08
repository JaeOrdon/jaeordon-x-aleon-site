import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";

export default function Merch() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pt-20">
        <section className="min-h-[80vh] px-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
                Official Store
              </span>
              <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8">
                COMING SOON
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
                Exclusive vinyl, apparel, and art prints are currently being crafted. 
                Stay tuned for the drop.
              </p>
              
              <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse">
                <ShoppingBag className="text-white/50" size={32} />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
