import heroBg from "@/assets/hero-bg.png";

// Deterministic particle layout (no randomness) so SSR and client markup match.
const PARTICLES = [
  { left: 12, top: 78, size: 4, delay: 0, dur: 9 },
  { left: 22, top: 88, size: 6, delay: 2.4, dur: 11 },
  { left: 31, top: 72, size: 3, delay: 5.1, dur: 8 },
  { left: 40, top: 91, size: 5, delay: 1.2, dur: 10 },
  { left: 48, top: 80, size: 4, delay: 6.3, dur: 12 },
  { left: 55, top: 68, size: 6, delay: 3.6, dur: 9.5 },
  { left: 62, top: 85, size: 3, delay: 0.8, dur: 8.5 },
  { left: 68, top: 55, size: 5, delay: 4.4, dur: 11 },
  { left: 74, top: 72, size: 4, delay: 2.0, dur: 10.5 },
  { left: 80, top: 40, size: 6, delay: 5.8, dur: 9 },
  { left: 85, top: 62, size: 3, delay: 1.6, dur: 12 },
  { left: 90, top: 30, size: 5, delay: 3.0, dur: 8 },
  { left: 94, top: 48, size: 4, delay: 6.8, dur: 10 },
  { left: 96, top: 18, size: 3, delay: 4.0, dur: 9.5 },
  { left: 88, top: 12, size: 5, delay: 0.4, dur: 11.5 },
  { left: 77, top: 22, size: 4, delay: 5.4, dur: 8.8 },
  { left: 70, top: 10, size: 3, delay: 2.8, dur: 10.2 },
  { left: 58, top: 35, size: 5, delay: 1.0, dur: 9.2 },
  { left: 51, top: 18, size: 4, delay: 6.0, dur: 11.8 },
  { left: 45, top: 55, size: 3, delay: 3.4, dur: 8.4 },
];

/**
 * Animated hero background: the uploaded background photo slowly drifts and
 * zooms (cinematic Ken Burns), with floating teal light particles that echo
 * the bokeh dots already in the image.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover animate-hero-drift"
      />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full hero-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
