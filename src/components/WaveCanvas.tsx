import { useEffect, useRef } from "react";

export function WaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const LINES = 70;
    const dots = Array.from({ length: 260 }, () => ({
      line: Math.random() * LINES, t: Math.random(), s: 0.0004 + Math.random() * 0.0012, r: Math.random() * 1.8 + 0.4,
    }));

    // path: from bottom-left-center sweeping to top-right with a twist
    const point = (i: number, t: number, time: number) => {
      const k = i / LINES - 0.5;
      const x = w * (0.25 + t * 0.85);
      const spread = Math.sin(t * Math.PI) * h * 0.35 * (1 - Math.abs(t - 0.55));
      const base = h * (1.05 - t * 1.0);
      const wave = Math.sin(t * 5 + time * 0.6 + k * 2) * h * 0.06;
      const twist = Math.cos(t * 3.2 - time * 0.4 + k * 4) * spread * k * 2.2;
      return [x, base + wave + twist + k * h * 0.15 * t] as [number, number];
    };

    const draw = (ms: number) => {
      const time = ms / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < LINES; i++) {
        ctx.beginPath();
        for (let s = 0; s <= 80; s++) {
          const [x, y] = point(i, s / 80, time);
          s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        const a = 0.08 + 0.18 * Math.abs(Math.sin(i * 0.7 + time * 0.5));
        ctx.strokeStyle = `rgba(40, 200, 240, ${a})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      for (const d of dots) {
        d.t += d.s; if (d.t > 1) d.t = 0;
        const [x, y] = point(Math.floor(d.line), d.t, time);
        const g = ctx.createRadialGradient(x, y, 0, x, y, d.r * 4);
        g.addColorStop(0, "rgba(150, 240, 255, 0.9)");
        g.addColorStop(1, "rgba(0, 180, 230, 0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, d.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
