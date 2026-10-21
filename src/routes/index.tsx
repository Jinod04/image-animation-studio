import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { WaveCanvas } from "@/components/WaveCanvas";
import heroBg from "@/assets/hero-bg.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evoke — Automating Business Processes" },
      { name: "description", content: "We design and build innovative software solutions that help businesses simplify complexity and accelerate growth." },
      { property: "og:title", content: "Evoke — Automating Business Processes" },
      { property: "og:description", content: "Innovative software solutions accelerating regional growth." },
    ],
  }),
  component: Index,
});

const nav = ["Home", "About", "Products & Services", "Careers"];

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <WaveCanvas />
      <div className="pointer-events-none absolute inset-0 bg-[image:var(--hero-fade)]" />
      <header className="relative z-10 flex items-center justify-between px-8 py-8 md:px-16">
        <span className="text-2xl font-extrabold tracking-tight"><span className="text-primary">E</span>VOKE</span>
        <nav className="hidden gap-12 text-lg md:flex">
          {nav.map((n, i) => (
            <a key={n} href="#" className={i === 0 ? "font-semibold text-primary" : "transition-colors hover:text-primary"}>{n}</a>
          ))}
        </nav>
        <a href="#" className="rounded-full bg-primary px-6 py-2 font-medium text-primary-foreground shadow-[var(--glow)]">Let's Talk</a>
      </header>
      <section className="relative z-10 max-w-4xl px-8 pt-16 md:px-20">
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          <span className="block animate-rise">Automating Business</span>
          <span className="block animate-rise text-primary [animation-delay:150ms] [text-shadow:var(--text-glow)]">Processes.</span>
          <span className="block animate-rise [animation-delay:300ms]">Accelerating Regional</span>
          <span className="block animate-rise [animation-delay:450ms]">Growth.</span>
        </h1>
        <p className="mt-8 max-w-2xl animate-rise text-lg text-muted-foreground [animation-delay:600ms]">
          We design and build innovative software solutions that help businesses simplify complexity, improve experiences, and accelerate growth.
        </p>
        <a href="#" className="mt-10 inline-flex animate-rise items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--glow)] transition-transform [animation-delay:750ms] hover:scale-105">
          Explore Our Products & Services <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </main>
  );
}
