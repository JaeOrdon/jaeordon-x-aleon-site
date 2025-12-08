import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div className={`overflow-hidden ${className}`}>
      <span className="sr-only">{text}</span>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
        className="flex flex-wrap"
        aria-hidden
      >
        {text.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-2">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%" },
                visible: { 
                  y: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.76, 0, 0.24, 1] 
                  }
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
