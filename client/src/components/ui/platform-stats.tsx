import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Platform data ─── */
interface Stat {
  label: string;
  value: number;
  suffix: string;
}
interface Platform {
  name: string;
  icon: JSX.Element;
  color: string;
  stats: Stat[];
  link: string;
}

const YT_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const SP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const AM_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164 18.93.044 18.143.007 17.358.001L15.879 0H8.12L6.638.001C5.858.007 5.074.044 4.3.164 3.633.285 3.003.517 2.43.89 1.31 1.624.562 2.624.244 3.934c-.175.724-.24 1.456-.24 2.19v.076l-.004.074V17.73l.004.073c0 .738.065 1.47.24 2.19.318 1.31 1.063 2.31 2.182 3.043.57.373 1.2.605 1.874.726.77.12 1.556.157 2.342.163L8.12 24h7.76l1.482-.001c.78-.006 1.568-.044 2.342-.163a5.028 5.028 0 0 0 1.874-.726c1.12-.734 1.864-1.734 2.182-3.043.175-.72.24-1.452.24-2.19v-.073l-.003-.074V6.198l.003-.074zM17.42 17.164c0 .442-.152.764-.456.966a1.298 1.298 0 0 1-.948.188c-.132-.022-.26-.06-.38-.118-.318-.158-.636-.32-.948-.488a.45.45 0 0 0-.288-.062c-.498.048-.996.094-1.494.14l-.18.016c-.502.044-1.006.082-1.508.112a.396.396 0 0 0-.282.124c-.328.326-.712.534-1.16.618-.482.09-.948.024-1.396-.2-.504-.252-.818-.656-.94-1.2a1.803 1.803 0 0 1 .108-1.248c.266-.534.716-.848 1.282-1.002.372-.1.752-.134 1.136-.116.316.014.626.07.93.162.046.014.092.012.138-.004a46.17 46.17 0 0 0 1.866-.792c.048-.022.074-.048.072-.102a23.1 23.1 0 0 1-.004-1.476c.01-.42.034-.84.07-1.258.004-.042-.008-.064-.046-.078a.326.326 0 0 0-.132-.03c-1.266.04-2.532.132-3.796.276a.518.518 0 0 0-.226.068c-.312.182-.632.35-.948.526-.16.09-.326.142-.51.148a.73.73 0 0 1-.488-.136.787.787 0 0 1-.314-.52 1.01 1.01 0 0 1 .034-.414c.046-.154.14-.274.28-.358.262-.156.53-.302.8-.444.05-.026.066-.054.064-.11a18.633 18.633 0 0 1 .088-2.026c.044-.484.134-.96.276-1.426.186-.61.496-1.14.944-1.586a3.24 3.24 0 0 1 .984-.708c.33-.162.676-.266 1.038-.31.204-.026.41-.03.614-.01.352.034.672.162.96.372.296.216.504.498.632.836.114.3.176.614.194.936.02.374.008.748-.022 1.122-.05.614-.132 1.224-.236 1.83-.014.078-.006.098.072.098h.014c.494-.034.988-.054 1.484-.056.042 0 .068.012.068.058v.176c.006.468.014.936.016 1.404 0 .044-.01.076-.058.092-.272.084-.544.172-.816.258a.154.154 0 0 0-.116.164c-.002.34-.014.68-.032 1.02-.028.52-.048 1.04-.058 1.56-.006.326.004.652.022.978.014.234.054.464.142.684.136.334.382.538.734.6.166.028.334.024.5-.012.21-.046.396-.148.562-.284.07-.058.116-.054.16.024.14.246.21.51.218.794z" />
  </svg>
);

const BC_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5z" />
  </svg>
);

const platforms: Platform[] = [
  {
    name: "YouTube",
    icon: YT_ICON,
    color: "#FF0000",
    stats: [
      { label: "Subscribers", value: 222, suffix: "" },
      { label: "Views", value: 30, suffix: "k+" },
    ],
    link: "https://www.youtube.com/@midnightcorresponden",
  },
  {
    name: "Spotify",
    icon: SP_ICON,
    color: "#1DB954",
    stats: [
      { label: "Monthly Listeners", value: 19, suffix: "" },
      { label: "Streams", value: 31, suffix: "k+" },
    ],
    link: "https://open.spotify.com/artist/5S0RsBShI3xk8bUix0JfpO?go=1",
  },
  {
    name: "Apple Music",
    icon: AM_ICON,
    color: "#FC3C44",
    stats: [
      { label: "Listeners", value: 1, suffix: "k+" },
      { label: "Plays", value: 25, suffix: "k+" },
    ],
    link: "https://music.apple.com/us/artist/jae-ordon/1566141772?ls=1&app=music",
  },
  {
    name: "Bandcamp",
    icon: BC_ICON,
    color: "#629AA9",
    stats: [
      { label: "Supporters", value: 120, suffix: "+" },
      { label: "Plays", value: 8, suffix: "k+" },
    ],
    link: "https://jaeordon.bandcamp.com",
  },
];

/* ─── Animated count-up ─── */
function AnimatedNum({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = value / (1600 / 16);
    const id = setInterval(() => {
      cur += step;
      if (cur >= value) { setN(value); clearInterval(id); }
      else setN(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [inView, value]);

  return <span ref={ref} className="tabular-nums">{n.toLocaleString()}{suffix}</span>;
}

/* ─── Main component ─── */
export default function PlatformStats() {
  return (
    <div className="cyber-widget">
      {/* Animated border (sits behind content) */}
      <div className="cyber-widget-border" aria-hidden="true" />

      {/* Scanning line effect */}
      <div className="cyber-widget-scan" aria-hidden="true" />

      {/* Content wrapper — sits above the border */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-end gap-[3px] h-3.5">
            <span className="w-[2px] rounded-full eq-bar eq-bar-1" style={{ background: "hsl(var(--accent))" }} />
            <span className="w-[2px] rounded-full eq-bar eq-bar-2" style={{ background: "hsl(var(--primary))" }} />
            <span className="w-[2px] rounded-full eq-bar eq-bar-3" style={{ background: "hsl(var(--accent))" }} />
            <span className="w-[2px] rounded-full eq-bar eq-bar-4" style={{ background: "hsl(var(--primary))" }} />
          </div>
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/25">
            Live Stats
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
          <div className="cyber-widget-pulse" />
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-widget-cell group"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.5 }}
            >
              {/* Platform-colored top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
              />

              {/* Icon + name row */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: `${p.color}15`,
                    color: p.color,
                    boxShadow: `0 0 0 rgba(0,0,0,0)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 12px ${p.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
                  }}
                >
                  {p.icon}
                </div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300">
                  {p.name}
                </span>
              </div>

              {/* Stats */}
              {p.stats.map((s) => (
                <div key={s.label} className="mb-1.5 last:mb-0">
                  <div className="text-lg md:text-xl font-bold text-white leading-tight">
                    <AnimatedNum value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[9px] text-white/25 uppercase tracking-widest leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}

              {/* External link indicator */}
              <div className="absolute bottom-2.5 right-3 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
