import { Instagram, Youtube, Music, CloudLightning } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif font-bold text-white mb-2">JAE ORDON</h2>
          <p className="text-muted-foreground text-sm">© 2026 Jae Ordon Music. All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <Youtube size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <Music size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <CloudLightning size={20} />
          </a>
        </div>
        
        <div className="flex gap-8 text-sm text-muted-foreground uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Press</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Bookings</a>
        </div>

      </div>
    </footer>
  );
}
