import { useRef, useCallback } from "react";

/**
 * CyberTextHighlight — galaxy glow + sparkle star particles.
 *
 * Radial gradient overlays create a nebula-like glow that follows
 * the cursor, while lightweight DOM sparkle particles burst
 * outward from the mouse position. Zero layout jank — purely
 * GPU-accelerated transforms and opacity.
 */

const SPARKLE_COLORS = [
  "rgba(255, 255, 255, 0.9)",
  "rgba(29, 185, 84, 0.85)",
  "rgba(120, 180, 255, 0.8)",
  "rgba(180, 130, 255, 0.75)",
  "rgba(255, 200, 100, 0.7)",
];

export default function CyberTextHighlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkleContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastSparkle = useRef<number>(0);
  // Safety timer: deactivate glow if no mouse activity (iframe steals events)
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const deactivate = useCallback(() => {
    containerRef.current?.style.setProperty("--cyber-active", "0");
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    // If no mousemove for 300ms, assume cursor left (e.g. entered iframe)
    inactivityTimer.current = setTimeout(deactivate, 300);
  }, [deactivate]);

  const spawnSparkle = useCallback((x: number, y: number) => {
    const container = sparkleContainerRef.current;
    if (!container) return;

    const now = performance.now();
    // Throttle: spawn at most every ~60ms for a nice density
    if (now - lastSparkle.current < 60) return;
    lastSparkle.current = now;

    // Spawn 2–3 sparkles per burst
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("div");

      // Randomly pick star-shape vs round
      const isStar = Math.random() > 0.5;
      sparkle.className = isStar
        ? "cyber-sparkle star-shape"
        : "cyber-sparkle";

      const size = 2 + Math.random() * 5;
      const duration = 0.5 + Math.random() * 0.7;
      const color =
        SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];

      // Random drift direction
      const angle = Math.random() * Math.PI * 2;
      const distance = 8 + Math.random() * 20;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      // Slight offset from cursor so they fan out
      const offsetX = (Math.random() - 0.5) * 16;
      const offsetY = (Math.random() - 0.5) * 16;

      sparkle.style.cssText = `
        left: ${x + offsetX}px;
        top: ${y + offsetY}px;
        --size: ${size}px;
        --duration: ${duration}s;
        --sparkle-color: ${color};
        --dx: ${dx}px;
        --dy: ${dy}px;
      `;

      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), duration * 1000 + 50);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty("--mx", `${x}px`);
        containerRef.current.style.setProperty("--my", `${y}px`);

        // Spawn sparkles at the local position
        spawnSparkle(x, y);
      });
      // Reset the safety timer — cursor is still over this element
      resetInactivityTimer();
    },
    [spawnSparkle, resetInactivityTimer]
  );

  const handleMouseEnter = useCallback(() => {
    containerRef.current?.style.setProperty("--cyber-active", "1");
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleMouseLeave = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    containerRef.current?.style.setProperty("--cyber-active", "0");
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cyber-text-highlight ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerLeave={() => {
        // pointerleave fires more reliably than mouseleave near iframes
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        deactivate();
      }}
    >
      {children}
      {/* Galaxy nebula glow — primary cloud layer */}
      <div className="cyber-glow-overlay" aria-hidden="true" />
      {/* Galaxy dust — grain texture + secondary clouds */}
      <div className="cyber-galaxy-dust" aria-hidden="true" />
      {/* Galaxy star field — scattered micro stars */}
      <div className="cyber-galaxy-stars" aria-hidden="true" />
      {/* Galaxy swirl — spiral arm hints */}
      <div className="cyber-galaxy-swirl" aria-hidden="true" />
      {/* Thin scan line */}
      <div className="cyber-scan-line" aria-hidden="true" />
      {/* Sparkle particle container */}
      <div
        ref={sparkleContainerRef}
        className="absolute inset-0 pointer-events-none z-[3] overflow-hidden"
        aria-hidden="true"
      />
    </div>
  );
}
