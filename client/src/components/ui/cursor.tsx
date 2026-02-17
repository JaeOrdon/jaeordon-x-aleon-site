import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Ultra-lightweight decorative cursor overlay.
 * Native cursor stays fully visible and functional.
 * Uses raw DOM manipulation (no React state, no springs) for zero lag.
 * Handles iframe areas gracefully by fading out.
 */

export default function Cursor() {
  const prefersReduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    if (prefersReduced) return;

    const glow = glowRef.current;
    const ring = ringRef.current;
    const rippleContainer = ripplesRef.current;
    if (!glow || !ring || !rippleContainer) return;

    let lastX = -100;
    let lastY = -100;
    let glowX = -100;
    let glowY = -100;
    let animating = true;

    // Iframe detection: hide cursor when it enters an iframe
    // (iframes swallow mousemove events, causing the glow to freeze)
    let moveTimeout: ReturnType<typeof setTimeout> | null = null;

    function hideCursor() {
      if (visible.current && glow && ring) {
        glow.style.opacity = "0";
        ring.style.opacity = "0";
        visible.current = false;
      }
    }

    function showCursor() {
      if (!visible.current && glow && ring) {
        glow.style.opacity = "1";
        ring.style.opacity = "1";
        visible.current = true;
      }
    }

    // Smooth trailing via rAF — much lighter than spring physics
    function animate() {
      if (!animating) return;
      // Lerp the glow position toward the actual cursor
      glowX += (lastX - glowX) * 0.18;
      glowY += (lastY - glowY) * 0.18;

      if (glow) {
        glow.style.transform = `translate(${glowX - 19}px, ${glowY - 19}px)`;
      }
      if (ring) {
        ring.style.transform = `translate(${glowX - 12}px, ${glowY - 12}px)`;
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function onMove(e: MouseEvent) {
      lastX = e.clientX;
      lastY = e.clientY;
      showCursor();

      // Reset inactivity timer — if no mousemove for 200ms,
      // cursor likely entered an iframe, so fade it out
      if (moveTimeout) clearTimeout(moveTimeout);
      moveTimeout = setTimeout(hideCursor, 200);
    }

    function onLeave() {
      if (moveTimeout) clearTimeout(moveTimeout);
      hideCursor();
    }

    // Also listen for mouseenter on iframes to proactively hide
    function onIframeEnter() {
      if (moveTimeout) clearTimeout(moveTimeout);
      hideCursor();
    }

    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.addEventListener("mouseenter", onIframeEnter);
    });

    function onClick(e: MouseEvent) {
      if (!rippleContainer) return;
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      rippleContainer.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", () => {
      showCursor();
    });
    window.addEventListener("click", onClick);

    // MutationObserver to catch dynamically added iframes
    const observer = new MutationObserver(() => {
      document.querySelectorAll("iframe").forEach((iframe) => {
        iframe.removeEventListener("mouseenter", onIframeEnter);
        iframe.addEventListener("mouseenter", onIframeEnter);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      animating = false;
      if (moveTimeout) clearTimeout(moveTimeout);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      iframes.forEach((iframe) => {
        iframe.removeEventListener("mouseenter", onIframeEnter);
      });
      observer.disconnect();
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <>
      {/* Warm amber glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        aria-hidden
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,140,65,0.22) 0%, rgba(195,130,60,0.06) 50%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* Thin ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        aria-hidden
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "1px solid rgba(200,145,70,0.2)",
          }}
        />
      </div>

      {/* Click ripple container */}
      <div
        ref={ripplesRef}
        className="fixed inset-0 pointer-events-none z-[10000] hidden md:block overflow-hidden"
        aria-hidden
      />
    </>
  );
}
