"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/Motion";
import { Pill } from "@/components/ui";

/* The one heavy moment. The photograph settles from a slight zoom while the headline's lines rise out of
   their masks; on scroll the image sinks and dims under the page as it leaves (Dubois' hero hand-off). */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const lines = el.querySelectorAll("[data-line]");
    if (reducedMotion()) { gsap.set(lines, { y: 0, yPercent: 0, opacity: 1 }); return; }
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .fromTo(".hero-media img", { scale: 1.16 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0)
        .fromTo(lines, { y: 0, yPercent: 110, opacity: 1 }, { y: 0, yPercent: 0, duration: 1.4, stagger: .1 }, .35)
        .fromTo(".hero-foot > *", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, stagger: .1 }, 1);
      gsap.to(".hero-media", { yPercent: 18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-shade", { opacity: .55, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  const lines = ["SiBCAS – Designers", "of the Finest Relocatable", "and Modular Buildings"];
  return <section className="hero" ref={root} data-tone="dark">
    <div className="hero-media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/2024-03-sibcas-taylor-high-school-build-aerial.jpg" alt="Aerial view of the SiBCAS modular build at Taylor High School" fetchPriority="high" />
    </div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="wrap hero-inner">
      <h1 className="display">{lines.map((line) => <span className="mask" key={line}><span data-line>{line}</span></span>)}</h1>
      <div className="hero-foot">
        <p>Modular Buildings &amp; Site Accommodation for Hire or Sale</p>
        <Pill href="#welcome">Get Started</Pill>
      </div>
    </div>
  </section>;
}
