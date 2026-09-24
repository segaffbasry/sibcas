"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { focusOverlay, reducedMotion, useMotion } from "@/components/Motion";
import { Arrow, BrandIcon, Logo, Pill, Social } from "@/components/ui";
import { contact, contactHref, footerLinks, legal, menu, socials } from "@/lib/site";

const isExternal = (href: string) => /^https?:/.test(href);

/* Full-screen menu. A navy sheet wipes down from the top edge, a blue rule draws across, then the chosen
   section's title and links rise in. Switching sections replays only the links. */
function Menu({ open, tab, setTab, close }: { open: boolean; tab: number; setTab: (tab: number) => void; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const wasOpen = useRef(false);
  const group = menu[tab];

  useEffect(() => {
    const el = root.current; if (!el) return;
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    tl.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: .9, ease: "power4.inOut" }, 0)
      .fromTo(el.querySelector(".menu-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, .35)
      .fromTo(el.querySelectorAll(".menu-top > *, .menu-tabs, .menu-foot > *"), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .6, ease: "power2.out", stagger: .04 }, .5);
    timeline.current = tl;
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, tl = timeline.current; if (!el || !tl) return;
    if (open) {
      el.style.visibility = "visible";
      tl.timeScale(reducedMotion() ? 20 : 1).play();
      return focusOverlay(el, close);
    }
    if (wasOpen.current) tl.timeScale(reducedMotion() ? 20 : 1.4).reverse();
    wasOpen.current = false;
  }, [open, close]);

  useEffect(() => {
    const el = root.current; if (!el || !open) return;
    const fresh = !wasOpen.current;
    wasOpen.current = true;
    const items = el.querySelectorAll("[data-m]");
    if (reducedMotion()) { gsap.set(items, { opacity: 1, yPercent: 0 }); return; }
    gsap.fromTo(items, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0, duration: .8, ease: "power3.out", stagger: .045, delay: fresh ? .65 : 0, overwrite: true });
  }, [open, tab]);

  return <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
    <div className="menu-top wrap">
      <a href="/" className="brand" aria-label="SiBCAS home" onClick={close}><Logo className="on-dark" /></a>
      <button className="menu-close" onClick={close}>Close <span aria-hidden="true" /></button>
    </div>
    <div className="menu-rule" aria-hidden="true" />
    <div className="menu-body wrap">
      <nav className="menu-tabs" aria-label="Menu sections">
        {menu.map((entry, index) => <button key={entry.id} className="menu-tab" aria-current={tab === index} onClick={() => setTab(index)}>
          <span className="menu-tab-index">0{index + 1}</span>{entry.label}
        </button>)}
      </nav>
      <div className="menu-panel" key={group.id}>
        <div className="menu-intro">
          <h2 data-m>{group.title}</h2>
          <p data-m>{group.blurb}</p>
        </div>
        <ul className="menu-links">
          {group.links.map((link) => <li key={link.name}><a data-m href={link.href} onClick={isExternal(link.href) ? undefined : close}>{link.name}<Arrow /></a></li>)}
        </ul>
      </div>
    </div>
    <div className="menu-foot wrap">
      <p><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
      <div className="socials">{socials.map((s) => <Social key={s.name} {...s} />)}</div>
    </div>
  </div>;
}

/* Frameless header: no bar or box. The logo and items take the tone of whatever is under them
   (sections mark themselves data-tone="dark"), hide on scroll down and return on scroll up. */
function Header() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const header = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const pathname = usePathname();

  useEffect(() => {
    const bar = header.current; if (!bar) return;
    let last = window.scrollY, frame = 0;
    const tone = () => {
      frame = 0;
      const y = bar.getBoundingClientRect().height / 2;
      const under = document.elementsFromPoint(window.innerWidth / 2, y).find((el) => !bar.contains(el));
      bar.dataset.tone = under?.closest<HTMLElement>("[data-tone]")?.dataset.tone ?? "light";
    };
    const onScroll = () => {
      const y = window.scrollY, delta = y - last;
      if (!frame) frame = requestAnimationFrame(tone);
      if (y < 80) { bar.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(delta) < 6) return;
      bar.classList.toggle("is-hidden", delta > 0); last = y;
    };
    const reveal = () => bar.classList.remove("is-hidden");
    tone();
    const settle = setTimeout(tone, 400);
    bar.addEventListener("focusin", reveal);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { clearTimeout(settle); cancelAnimationFrame(frame); bar.removeEventListener("focusin", reveal); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  const show = (index: number) => { setTab(index); setOpen(true); };
  return <>
    <header className="site-header" ref={header} data-tone="light">
      <div className="wrap header-inner">
        <a href="/" className="brand" aria-label="SiBCAS home"><Logo /></a>
        <nav className="header-nav" aria-label="Main">
          {menu.map((entry, index) => <button key={entry.id} aria-haspopup="dialog" aria-expanded={open && tab === index} aria-controls="site-menu" onClick={() => show(index)}>{entry.label}</button>)}
        </nav>
        <button className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" onClick={() => show(0)}><span /><span /></button>
      </div>
    </header>
    <Menu open={open} tab={tab} setTab={setTab} close={close} />
  </>;
}

/* Dubois' closing band: a coloured tile with the call to action, then a dark footer with link columns. */
function Footer() {
  return <>
    <section className="wrap cta-band">
      <div className="cta-tile" data-tone="dark">
        <h2 data-rise>Get in Touch</h2>
        <div className="cta-foot">
          <p data-rise>What ever type of project, we can cater for your Modular Building and Site Accommodation needs.</p>
          <Pill href={contactHref} external>Contact Us</Pill>
        </div>
        <svg className="cta-rings" viewBox="0 0 400 400" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => <rect key={i} x={200 - (i + 1) * 21} y={200 - (i + 1) * 21} width={(i + 1) * 42} height={(i + 1) * 42} />)}
        </svg>
      </div>
    </section>
    <footer className="site-footer" data-tone="dark">
      <div className="wrap footer-grid">
        <a href="/" className="brand" aria-label="SiBCAS home"><Logo className="on-dark" /></a>
        <div>
          <h3>Useful Links</h3>
          <ul className="footer-links">{footerLinks.map((link) => <li key={link.name}><a href={link.href}>{link.name}</a></li>)}</ul>
        </div>
        <div>
          <h3>Head Office</h3>
          <address>{contact.address.map((line) => <span key={line}>{line}<br /></span>)}</address>
          <p className="footer-contact">
            <a href={contact.phoneHref}>Tel: {contact.phone}</a>
            <span>Fax: {contact.fax}</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.map} target="_blank" rel="noopener">See Google Map</a>
          </p>
        </div>
        <div>
          <h3>Stay Connected</h3>
          <ul className="footer-social">{socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noopener"><BrandIcon icon={s.icon} />{s.name}</a></li>)}</ul>
        </div>
      </div>
      <div className="wrap footer-bar">
        <p>©SiBCAS Ltd is registered in Scotland no. SC052604</p>
        <p>{legal.map((link) => <a key={link.name} href={link.href}>{link.name}</a>)}</p>
      </div>
    </footer>
  </>;
}

export function Shell({ children }: { children: ReactNode }) {
  useMotion();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>;
}
