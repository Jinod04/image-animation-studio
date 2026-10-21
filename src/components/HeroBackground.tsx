// Deterministic layouts (no randomness) so SSR and client markup match.
// Scene recreates the original background photo in pure CSS/canvas-free layers:
// deep teal ambience, glowing bokeh clusters weighted to the right side,
// and floating light motes.

type Orb = {
  left: number;
  top: number;
  size: number;
  blur: number;
  hue: string;
  opacity: number;
  dur: number;
  delay: number;
};

// Large soft glows — the "lit" areas of the old photo.
const ORBS: Orb[] = [
  { left: 74, top: 26, size: 620, blur: 90, hue: "0.55 0.14 190", opacity: 0.5, dur: 26, delay: 0 },
  { left: 88, top: 62, size: 480, blur: 80, hue: "0.62 0.13 185", opacity: 0.42, dur: 31, delay: 4 },
  { left: 58, top: 78, size: 540, blur: 100, hue: "0.48 0.1 200", opacity: 0.36, dur: 24, delay: 8 },
  { left: 40, top: 90, size: 420, blur: 90, hue: "0.52 0.09 205", opacity: 0.3, dur: 34, delay: 2 },
  { left: 12, top: 96, size: 380, blur: 110, hue: "0.45 0.07 210", opacity: 0.22, dur: 29, delay: 6 },
  { left: 96, top: 12, size: 360, blur: 70, hue: "0.6 0.15 188", opacity: 0.34, dur: 27, delay: 10 },
];

// Mid-size bokeh dots — the identifiable circles of light in the photo.
const BOKEH = [
  { left: 80, top: 34, size: 90, dur: 18, delay: 0 },
  { left: 90, top: 50, size: 60, dur: 22, delay: 3 },
  { left: 68, top: 58, size: 44, dur: 20, delay: 6 },
  { left: 84, top: 74, size: 110, dur: 25, delay: 2 },
  { left: 62, top: 42, size: 34, dur: 17, delay: 9 },
  { left: 72, top: 16, size: 52, dur: 21, delay: 5 },
  { left: 93, top: 28, size: 40, dur: 19, delay: 8 },
  { left: 54, top: 66, size: 56, dur: 24, delay: 1 },
  { left: 47, top: 80, size: 38, dur: 23, delay: 7 },
  { left: 76, top: 88, size: 66, dur: 26, delay: 4 },
  { left: 35, top: 70, size: 46, dur: 22, delay: 10 },
  { left: 97, top: 80, size: 50, dur: 18, delay: 6 },
];

// Small sharp particles drifting upward.
const MOTES = [
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
 * Animated hero background with no image: layered CSS glows, bokeh and
 * particles recreate the ambience of the original background photo.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Deep teal ambience */}
      <div className="absolute inset-0 hero-scene" />

      {/* Large soft glows */}
      {ORBS.map((o, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full hero-orb"
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            filter: `blur(${o.blur}px)`,
            opacity: o.opacity,
            background: `radial-gradient(circle, oklch(${o.hue} / 0.9) 0%, oklch(${o.hue} / 0) 70%)`,
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.dur}s`,
          }}
        />
      ))}

      {/* Mid-size bokeh dots */}
      {BOKEH.map((b, i) => (
        <div
          key={`bokeh-${i}`}
          className="absolute rounded-full hero-bokeh"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}

      {/* Small floating motes */}
      {MOTES.map((p, i) => (
        <span
          key={`mote-${i}`}
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
