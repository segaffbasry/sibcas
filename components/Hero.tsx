"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/Motion";
import { Pill } from "@/components/ui";

/* MeiLog's opening: a full-bleed photograph washed in navy, the headline top-left under a mono eyebrow,
   the intro bottom-left and two facts bottom-right. The one heavy moment: the photo settles from a slight
   zoom while the headline lines rise out of their masks; on scroll the photo sinks under the page. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const lines = el.querySelectorAll("[data-line]");
    if (reducedMotion()) { gsap.set(lines, { y: 0, yPercent: 0, opacity: 1 }); return; }
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .fromTo(".hero-media img", { scale: 1.14 }, { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
        .fromTo(lines, { y: 0, yPercent: 105, opacity: 1 }, { y: 0, yPercent: 0, duration: 1.3, stagger: .09 }, .3)
        .fromTo(".hero-fade", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1, stagger: .08 }, .9);
      gsap.to(".hero-media", { yPercent: 16, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  const lines = ["Designers of the Finest", "Relocatable and Modular", "Buildings since 1973"];
  return <section className="hero" ref={root} data-tone="dark">
    <div className="hero-media">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/2024-03-sibcas-taylor-high-school-build-aerial.jpg" alt="Aerial view of the SiBCAS modular build at Taylor High School" fetchPriority="high" />
    </div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="wrap hero-inner">
      <div className="hero-top">
        <p className="label hero-fade"><span aria-hidden="true">+ </span>SiBCAS Ltd</p>
        <h1 className="hero-title">{lines.map((line) => <span className="mask" key={line}><span data-line>{line}</span></span>)}</h1>
        <div className="hero-fade"><Pill href="#services">Our Buildings</Pill></div>
      </div>
      <div className="hero-bottom">
        <p className="hero-intro hero-fade">At SiBCAS, we have been manufacturing and supplying Modular Buildings and Site Accommodation for over 50 years – for hire or sale, across the UK.</p>
        <dl className="hero-facts">
          <div className="hero-fade"><dt>50+ Years<br />of Manufacturing</dt><dd>Family-owned and managed since 1973.</dd></div>
          <div className="hero-fade"><dt>5 Depots<br />throughout the UK</dt><dd>Strategically located, with our own fleet.</dd></div>
        </dl>
      </div>
    </div>
  </section>;
}
