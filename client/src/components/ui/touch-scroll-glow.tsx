import { useEffect, useRef } from "react";

/**
 * TouchScrollGlow — mobile-only ambient glow that responds to touch scrolling.
 *
 * When the user presses down and scrolls, a soft galaxy-like radial glow
 * appears at the touch point, pulses gently with scroll velocity, and
 * fades out when the finger lifts. Much subtler than the desktop
 * CyberTextHighlight — just enough to feel alive.
 *
 * Renders a fixed full-screen overlay with pointer-events: none.
 * Zero impact on layout or interaction. GPU-accelerated via will-change.
 */

export default function TouchScrollGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only activate on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animating = true;

    // Touch state
    let touchActive = false;
    let touchX = 0;
    let touchY = 0;
    let lastTouchY = 0;
    let scrollVelocity = 0;

    // Glow state (smoothed for animation)
    let glowOpacity = 0;
    let glowRadius = 120;
    let glowPulse = 0;

    // Micro-sparkle particles spawned during scroll
    const sparkles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      hue: number;
    }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function spawnSparkles(x: number, y: number, velocity: number) {
      const count = Math.min(Math.floor(Math.abs(velocity) * 0.3), 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2;
        sparkles.push({
          x: x + (Math.random() - 0.5) * 60,
          y: y + (Math.random() - 0.5) * 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.6,
          size: 1 + Math.random() * 2,
          hue: Math.random() > 0.5 ? 141 : Math.random() > 0.5 ? 220 : 280,
        });
      }
    }

    function draw() {
      if (!animating || !ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Smooth glow opacity toward target
      const targetOpacity = touchActive ? Math.min(0.35 + Math.abs(scrollVelocity) * 0.008, 0.6) : 0;
      glowOpacity += (targetOpacity - glowOpacity) * 0.12;

      // Pulse effect driven by scroll velocity
      glowPulse += 0.06;
      const pulseScale = 1 + Math.sin(glowPulse) * 0.08;

      // Dynamic radius based on velocity
      const targetRadius = 100 + Math.min(Math.abs(scrollVelocity) * 0.8, 80);
      glowRadius += (targetRadius - glowRadius) * 0.1;

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      if (glowOpacity > 0.005) {
        const r = glowRadius * pulseScale;

        // Layer 1: Outer soft nebula wash
        const outerGrad = ctx.createRadialGradient(touchX, touchY, 0, touchX, touchY, r * 1.8);
        outerGrad.addColorStop(0, `hsla(141, 73%, 42%, ${glowOpacity * 0.15})`);
        outerGrad.addColorStop(0.3, `hsla(220, 80%, 55%, ${glowOpacity * 0.08})`);
        outerGrad.addColorStop(0.6, `hsla(280, 70%, 50%, ${glowOpacity * 0.04})`);
        outerGrad.addColorStop(1, "transparent");
        ctx.fillStyle = outerGrad;
        ctx.fillRect(0, 0, w, h);

        // Layer 2: Core glow — brighter, tighter
        const coreGrad = ctx.createRadialGradient(touchX, touchY, 0, touchX, touchY, r);
        coreGrad.addColorStop(0, `hsla(141, 73%, 55%, ${glowOpacity * 0.3})`);
        coreGrad.addColorStop(0.2, `hsla(141, 73%, 42%, ${glowOpacity * 0.15})`);
        coreGrad.addColorStop(0.5, `hsla(220, 80%, 60%, ${glowOpacity * 0.06})`);
        coreGrad.addColorStop(1, "transparent");
        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, 0, w, h);

        // Layer 3: Tiny bright center dot
        const dotGrad = ctx.createRadialGradient(touchX, touchY, 0, touchX, touchY, 8);
        dotGrad.addColorStop(0, `hsla(141, 80%, 70%, ${glowOpacity * 0.5})`);
        dotGrad.addColorStop(1, "transparent");
        ctx.fillStyle = dotGrad;
        ctx.fillRect(touchX - 10, touchY - 10, 20, 20);
      }

      // Draw and update sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 1 / 60 / s.maxLife;

        if (s.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        const alpha = s.life * 0.6;
        // Glow
        ctx.beginPath();
        const sGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        sGrad.addColorStop(0, `hsla(${s.hue}, 73%, 65%, ${alpha})`);
        sGrad.addColorStop(1, "transparent");
        ctx.fillStyle = sGrad;
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${alpha * 0.8})`;
        ctx.arc(s.x, s.y, s.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    // Touch event handlers
    function onTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;
      lastTouchY = touch.clientY;
      touchActive = true;
      scrollVelocity = 0;
    }

    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      touchX = touch.clientX;
      touchY = touch.clientY;

      // Calculate scroll velocity from Y delta
      const dy = touch.clientY - lastTouchY;
      scrollVelocity = dy;
      lastTouchY = touch.clientY;

      // Spawn sparkles based on scroll speed
      if (Math.abs(scrollVelocity) > 3) {
        spawnSparkles(touchX, touchY, scrollVelocity);
      }
    }

    function onTouchEnd() {
      touchActive = false;
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      animating = false;
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9997] pointer-events-none md:hidden"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
