import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Music", href: "/#music" },
    { name: "About", href: "/about" },
    { name: "Merch", href: "/merch" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-serif font-bold tracking-tighter text-white hover:text-primary transition-colors z-50 relative">
            JAE ORDON
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a className="text-sm uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
                {link.name}
              </a>
            </Link>
          ))}
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90 text-black font-bold rounded-none px-6"
          >
            LISTEN NOW
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-white/10 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a 
                className="text-lg font-medium text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </Link>
          ))}
          <Button className="w-full bg-primary text-black font-bold rounded-none">
            LISTEN NOW
          </Button>
        </motion.div>
      )}
    </nav>
  );
}
