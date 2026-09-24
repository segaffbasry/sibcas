"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Lenis owns the scroll for the whole session and drives ScrollTrigger. */
function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || event.defaultPrevented) return;
      const id = link.getAttribute("href") ?? "";
      const target = id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
      if (id.length > 1 && !target) return;
      event.preventDefault();
      lenis.scrollTo(target ?? 0, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); gsap.ticker.remove(tick); lenis.destroy(); setLenis(null); };
  }, []);
}

/* Per-page motion, rebuilt on every route change.
   - [data-rise]      headings and copy: one calm fade and rise, once.
   - [data-clip]      image frames: open from an inset clip as they arrive.
   - [data-parallax]  images inside a frame: drift about 10% against the scroll. */
function usePageMotion(pathname: string) {
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    const reduced = reducedMotion();
    const cleanups: (() => void)[] = [];

    /* Reveals are checked against the viewport on load and on every scroll frame, not via ScrollTrigger's
       once-triggers, so anything already in view plays straight away instead of waiting for a scroll.
       Each element plays once and then leaves the pending list. */
    const reveal = (els: HTMLElement[], play: (batch: HTMLElement[]) => void) => {
      let pending = els, frame = 0;
      const check = () => {
        frame = 0;
        const fold = window.innerHeight * .92;
        const now = pending.filter((el) => { const r = el.getBoundingClientRect(); return r.top < fold && r.bottom > 0; });
        if (!now.length) return;
        pending = pending.filter((el) => !now.includes(el));
        play(now);
        if (!pending.length) stop();
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
      const stop = () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      check();
      cleanups.push(stop);
    };

    const ctx = gsap.context(() => {
      const rise = gsap.utils.toArray<HTMLElement>("[data-rise]");
      const clip = gsap.utils.toArray<HTMLElement>("[data-clip]");
      [...rise, ...clip].forEach((el) => el.setAttribute("data-ready", ""));
      if (reduced) return;
      gsap.set(rise, { opacity: 0, y: 28 });
      reveal(rise, (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .08, clearProps: "transform" }));
      gsap.set(clip, { clipPath: "inset(10% 6% 10% 6%)" });
      reveal(clip, (batch) => gsap.to(batch, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut", stagger: .1 }));
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true, start: "top bottom", end: "bottom top" } });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    const settle = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => { clearTimeout(settle); window.removeEventListener("load", refresh); cleanups.forEach((fn) => fn()); ctx.revert(); };
  }, [pathname]);
}

export function useMotion() {
  const pathname = usePathname();
  useSmoothScroll();
  usePageMotion(pathname);
  return pathname;
}

/* Traps focus inside an overlay, pauses smooth scroll and locks the page while it is open. */
export function focusOverlay(container: HTMLElement, close: () => void) {
  const previous = document.activeElement as HTMLElement | null;
  const overflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  getLenis()?.stop();
  const focusable = () => Array.from(container.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
  focusable()[0]?.focus({ preventScroll: true });
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
    if (event.key !== "Tab") return;
    const items = focusable(), first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  document.addEventListener("keydown", onKey);
  return () => { document.body.style.overflow = overflow; getLenis()?.start(); document.removeEventListener("keydown", onKey); previous?.focus({ preventScroll: true }); };
}
