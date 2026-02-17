import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar({ onLogoClick }: { onLogoClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [listenPulse, setListenPulse] = useState(false);
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const [location, navigate] = useLocation();

  const navLinks = [
    { name: "Music", hash: "music" },
    { name: "About", href: "/about" },
    { name: "Merch", href: "/merch" },
    { name: "Contact", hash: "contact" },
  ];

  // Fire click ripple animation on a nav link
  const triggerClickAnim = useCallback((name: string) => {
    setClickedLink(name);
    setTimeout(() => setClickedLink(null), 700);
  }, []);

  // Scroll to a section by id — works from any page
  const scrollToSection = useCallback(
    (hash: string) => {
      setIsOpen(false);

      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (location === "/") {
        // Already home — scroll directly
        tryScroll();
      } else {
        // Go home first, then poll for the element (handles render delay)
        navigate("/");
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (tryScroll() || attempts > 20) {
            clearInterval(interval);
          }
        }, 100);
      }
    },
    [location, navigate],
  );

  // Handle page navigation — always scroll to top
  const handlePageNavClick = useCallback(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleListenNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setListenPulse(true);
    setTimeout(() => setListenPulse(false), 600);
    window.location.href = "spotify:artist:5S0RsBShI3xk8bUix0JfpO";
    setTimeout(() => {
      window.open(
        "https://open.spotify.com/artist/5S0RsBShI3xk8bUix0JfpO?go=1",
        "_blank",
      );
    }, 1500);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <motion.a
            className="text-2xl font-serif font-bold tracking-tighter text-white hover:text-primary transition-colors z-50 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              // Navigate home, scroll to top, and replay the intro animation
              navigate("/");
              window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
              setIsOpen(false);
              onLogoClick?.();
            }}
          >
            JAE ORDON
          </motion.a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isClicked = clickedLink === link.name;

            const inner = (
              <>
                {link.name}
                {/* Click ripple burst */}
                <AnimatePresence>
                  {isClicked && (
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Expanding glow ring */}
                      <motion.span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          background: "radial-gradient(circle, hsla(141,73%,42%,0.5) 0%, transparent 70%)",
                        }}
                        initial={{ width: 0, height: 0, opacity: 1 }}
                        animate={{ width: 80, height: 80, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      {/* Flash underline sweep */}
                      <motion.span
                        className="absolute bottom-[-2px] left-0 h-[2px]"
                        style={{
                          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), rgba(120,180,255,0.8), transparent)",
                        }}
                        initial={{ width: "0%", opacity: 1 }}
                        animate={{ width: "100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            );

            return link.hash ? (
              <motion.button
                key={link.name}
                type="button"
                data-testid={`link-${link.name.toLowerCase()}`}
                className={`nav-link-hover text-sm uppercase tracking-widest text-muted-foreground hover:text-white transition-colors relative bg-transparent border-none cursor-pointer overflow-visible ${isClicked ? "nav-link-clicked" : ""}`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.92, y: 1 }}
                onClick={() => {
                  triggerClickAnim(link.name);
                  scrollToSection(link.hash);
                }}
              >
                {inner}
              </motion.button>
            ) : (
              <Link key={link.name} href={link.href!}>
                <motion.a
                  data-testid={`link-${link.name.toLowerCase()}`}
                  className={`nav-link-hover text-sm uppercase tracking-widest text-muted-foreground hover:text-white transition-colors relative overflow-visible ${isClicked ? "nav-link-clicked" : ""}`}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.92, y: 1 }}
                  onClick={() => {
                    triggerClickAnim(link.name);
                    handlePageNavClick();
                  }}
                >
                  {inner}
                </motion.a>
              </Link>
            );
          })}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="relative"
          >
            <Button
              variant="default"
              className={`bg-primary hover:bg-primary/90 text-black font-bold rounded-none px-6 relative overflow-hidden transition-all ${listenPulse ? "listen-now-pulse" : ""}`}
              onClick={handleListenNowClick}
            >
              LISTEN NOW
            </Button>
            {listenPulse && (
              <motion.div
                className="absolute inset-0 rounded-none bg-white pointer-events-none"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9, rotate: 90 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-white/10 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {navLinks.map((link, i) =>
                link.hash ? (
                  <motion.button
                    key={link.name}
                    type="button"
                    data-testid={`link-${link.name.toLowerCase()}-mobile`}
                    className="text-lg font-medium text-white text-left bg-transparent border-none cursor-pointer p-0"
                    onClick={() => scrollToSection(link.hash)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {link.name}
                  </motion.button>
                ) : (
                  <Link key={link.name} href={link.href!}>
                    <motion.a
                      data-testid={`link-${link.name.toLowerCase()}-mobile`}
                      className="text-lg font-medium text-white"
                      onClick={handlePageNavClick}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      {link.name}
                    </motion.a>
                  </Link>
                ),
              )}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <Button
                  className="w-full bg-primary text-black font-bold rounded-none"
                  onClick={handleListenNowClick}
                >
                  LISTEN NOW
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
