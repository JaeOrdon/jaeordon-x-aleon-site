import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

const LOAD_DURATION = 3800; // Slightly longer for the cinematic sequence

// ─── Floating particle field (canvas-based, zero DOM overhead) ───
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animating = true;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // Create particles with varying sizes, speeds, and colors
    const PARTICLE_COUNT = 80;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.6, // drift upward
      size: 0.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.5,
      hue: Math.random() > 0.6 ? 141 : Math.random() > 0.5 ? 220 : 280, // green, blue, purple
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));

    function draw() {
      if (!animating || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;

        const flicker = 0.5 + 0.5 * Math.sin(p.pulse);
        const alpha = p.opacity * flicker;

        // Glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 73%, 55%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 73%, 55%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${alpha * 0.8})`;
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw faint connection lines between close particles
      ctx.strokeStyle = "rgba(29, 185, 84, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      animating = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1]"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// ─── Individual letter animation ───
function AnimatedLetter({
  char,
  index,
  total,
}: {
  char: string;
  index: number;
  total: number;
}) {
  return (
    <motion.span
      className="inline-block"
      initial={{
        y: "120%",
        opacity: 0,
        rotateX: -90,
        scale: 0.8,
        filter: "blur(8px)",
      }}
      animate={{
        y: "0%",
        opacity: 1,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        delay: 0.6 + index * 0.07,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin: "bottom center", display: "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

// ─── Horizontal rule that draws itself ───
function AnimatedRule({ delay }: { delay: number }) {
  return (
    <div className="flex items-center gap-4 mt-6 mb-5">
      <motion.div
        className="h-[1px] flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(141, 73%, 42%), hsla(220, 80%, 60%, 0.4), transparent)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-primary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="h-[1px] flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsla(280, 70%, 55%, 0.4), hsl(141, 73%, 42%), transparent)",
          transformOrigin: "right",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: delay + 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const titleText = "JAE ORDON";

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 1200);
    const exitTimer = setTimeout(() => setPhase("exit"), LOAD_DURATION - 1000);
    const removeTimer = setTimeout(() => setIsVisible(false), LOAD_DURATION + 500);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center flex-col overflow-hidden"
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* ─── Particle field background ─── */}
          <ParticleField />

          {/* ─── Morphing nebula glow ─── */}
          <motion.div
            className="absolute z-[2] preloader-nebula"
            style={{
              width: 700,
              height: 700,
              background: `
                radial-gradient(ellipse at 40% 40%, hsla(141, 73%, 42%, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 60% 60%, hsla(220, 80%, 55%, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, hsla(280, 70%, 50%, 0.04) 0%, transparent 50%)
              `,
            }}
            initial={{ scale: 0.3, opacity: 0, rotate: 0 }}
            animate={{ scale: 1.3, opacity: 1, rotate: 30 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
          />

          {/* ─── Cinematic top/bottom letterbox bars ─── */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-[5] bg-black"
            initial={{ height: "50%" }}
            animate={{ height: "8%" }}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[5] bg-black"
            initial={{ height: "50%" }}
            animate={{ height: "8%" }}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ─── Center content ─── */}
          <div className="relative z-[10] flex flex-col items-center px-6">
            {/* Main title — letter by letter with 3D depth */}
            <div className="overflow-hidden p-4 relative" style={{ perspective: "1000px" }}>
              <h1 className="text-6xl md:text-9xl font-serif font-bold text-white tracking-tighter text-center">
                {titleText.split("").map((char, i) => (
                  <AnimatedLetter key={i} char={char} index={i} total={titleText.length} />
                ))}
              </h1>
            </div>

            {/* Animated horizontal rule with center dot */}
            <div className="w-64 md:w-96">
              <AnimatedRule delay={1.6} />
            </div>

            {/* Subtitle with staggered word reveal */}
            <div className="overflow-hidden">
              <div className="flex items-center gap-3 md:gap-5">
                {["Folk", "Jazz", "Rock"].map((word, i) => (
                  <motion.span
                    key={word}
                    className="text-sm md:text-lg uppercase tracking-[0.3em] font-bold"
                    style={{
                      color: i === 0
                        ? "hsl(141, 73%, 50%)"
                        : i === 1
                          ? "hsl(220, 80%, 65%)"
                          : "hsl(280, 70%, 65%)",
                    }}
                    initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.7,
                      delay: 1.8 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tagline that fades in last */}
            <motion.p
              className="text-white/30 text-xs md:text-sm tracking-[0.2em] uppercase mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
            >
              Uncover the Sound
            </motion.p>
          </div>

          {/* ─── Cinematic loading bar with glow ─── */}
          <div className="absolute bottom-[8%] left-0 right-0 z-[10]">
            <motion.div
              className="h-[2px] preloader-bar-glow"
              style={{
                background:
                  "linear-gradient(90deg, hsl(141, 73%, 42%), hsl(220, 80%, 60%), hsl(280, 70%, 55%), hsl(141, 73%, 42%))",
                backgroundSize: "300% 100%",
              }}
              initial={{ width: "0%", opacity: 0.8 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{
                duration: LOAD_DURATION / 1000 - 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.5,
              }}
            />
          </div>

          {/* ─── Corner frame accents ─── */}
          <motion.div
            className="absolute top-[8%] left-8 z-[10] w-12 h-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
          <motion.div
            className="absolute top-[8%] right-8 z-[10] w-12 h-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-primary to-transparent" />
            <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
          <motion.div
            className="absolute bottom-[8%] left-8 z-[10] w-12 h-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent/60 to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-accent/60 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute bottom-[8%] right-8 z-[10] w-12 h-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-accent/60 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-accent/60 to-transparent" />
          </motion.div>

          {/* ─── Fade overlay on exit phase ─── */}
          {phase === "exit" && (
            <motion.div
              className="absolute inset-0 bg-black z-[15]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
