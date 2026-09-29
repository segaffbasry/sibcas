"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Contact from "@/components/Contact";
import { focusOverlay, reducedMotion, useMotion } from "@/components/Motion";
import { Arrow, Logo, Pill, Social } from "@/components/ui";
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

/* MeiLog's floating header: a frosted bar (blur 26px, 8px corners, 68px tall) inset from the edges.
   Its tone follows whatever is under it (sections mark themselves data-tone="dark"); it slides away on
   scroll down and returns on scroll up. */
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
    requestAnimationFrame(() => bar.classList.add("is-ready"));
    const settle = setTimeout(tone, 400);
    bar.addEventListener("focusin", reveal);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { clearTimeout(settle); cancelAnimationFrame(frame); bar.removeEventListener("focusin", reveal); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  const show = (index: number) => { setTab(index); setOpen(true); };
  return <>
    {/* Pages that open on a dark hero render the header dark from the first paint, so it never flashes light. */}
    <header className="site-header" ref={header} data-tone={pathname === "/" ? "dark" : "light"}>
      <div className="header-bar">
        <a href="/" className="brand" aria-label="SiBCAS home"><Logo /></a>
        <nav className="header-nav" aria-label="Main">
          {menu.map((entry, index) => <button key={entry.id} aria-haspopup="dialog" aria-expanded={open && tab === index} aria-controls="site-menu" onClick={() => show(index)}>{entry.label}</button>)}
        </nav>
        <div className="header-cta"><Pill href={contactHref} external>Get in Touch</Pill></div>
        <button className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" onClick={() => show(0)}><span /><span /></button>
      </div>
    </header>
    <Menu open={open} tab={tab} setTab={setTab} close={close} />
  </>;
}

/* Live local time at the Bathgate head office, as MeiLog shows Böblingen's in its footer. */
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/London" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time || "--:--:--"}</span>;
}

/* MeiLog's navy footer: brand and line, mono-labelled link columns, then a small-print bar with the clock. */
function Footer() {
  return <footer className="site-footer" data-tone="dark">
    <div className="wrap footer-grid">
      <div className="footer-brand">
        <a href="/" className="brand" aria-label="SiBCAS home"><Logo className="on-dark" /></a>
        <p>Designers of the finest relocatable and modular buildings. Manufacturing Modular Buildings and Portable Site Cabins since 1973.</p>
        <div className="socials">{socials.map((s) => <Social key={s.name} {...s} />)}</div>
      </div>
      <div>
        <h3>↳ Useful Links</h3>
        <ul className="footer-links">{footerLinks.map((link) => <li key={link.name}><a href={link.href}>{link.name}</a></li>)}</ul>
      </div>
      <div>
        <h3>↳ Head Office</h3>
        <address>{contact.company}<br />{contact.address.map((line) => <span key={line}>{line}<br /></span>)}</address>
        <p className="footer-contact">
          <a href={contact.phoneHref}>Tel: {contact.phone}</a>
          <span>Fax: {contact.fax}</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.map} target="_blank" rel="noopener">See Google Map</a>
        </p>
      </div>
      <div>
        <h3>↳ Legal</h3>
        <ul className="footer-links">{legal.map((link) => <li key={link.name}><a href={link.href}>{link.name}</a></li>)}</ul>
      </div>
    </div>
    <div className="wrap footer-bar">
      <p>© SiBCAS Ltd · Registered in Scotland no. SC052604</p>
      <p>Bathgate <Clock /></p>
    </div>
  </footer>;
}

export function Shell({ children }: { children: ReactNode }) {
  useMotion();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">{children}</main>
    <Contact />
    <Footer />
  </>;
}
