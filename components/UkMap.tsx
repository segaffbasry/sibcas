"use client";

import { useEffect, useRef, useState } from "react";
import map from "@/content/uk-map.json";
import { reducedMotion } from "@/components/Motion";
import { Arrow, Label } from "@/components/ui";
import { cities, cityHref } from "@/lib/site";

export type MapProject = { slug: string; place: string; x: number; y: number; title: string; href: string; hero: string | null; sector: string };

const W = map.width, H = map.height, SCALE = .5;

/* A 256-step ramp in SiBCAS' own colours: transparent navy → logo blue → pale blue → white-hot. */
function ramp() {
  const c = document.createElement("canvas"); c.width = 256; c.height = 1;
  const g = c.getContext("2d")!, grad = g.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, "rgba(23,40,61,0)");
  grad.addColorStop(.25, "rgba(0,82,134,.55)");
  grad.addColorStop(.55, "rgba(0,121,193,.85)");
  grad.addColorStop(.8, "rgba(159,203,236,.95)");
  grad.addColorStop(1, "rgba(255,255,255,1)");
  g.fillStyle = grad; g.fillRect(0, 0, 256, 1);
  return g.getImageData(0, 0, 256, 1).data;
}

/* The live heatmap: every mapped SiBCAS case study adds heat where it was built. Density is drawn as
   alpha on a half-size canvas, then coloured through the ramp; each point breathes on its own phase so
   the map is never still. One project at a time is spotlit, with its photo and a link to the case study. */
export default function UkMap({ projects }: { projects: MapProject[] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = canvas.current; if (!el) return;
    const w = Math.round(W * SCALE), h = Math.round(H * SCALE);
    el.width = w; el.height = h;
    const ctx = el.getContext("2d", { willReadFrequently: true })!;
    const colours = ramp();
    const phases = projects.map((_, i) => (i * 2.39996) % (Math.PI * 2));
    const reduced = reducedMotion();
    let frame = 0, visible = true, start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      projects.forEach((p, i) => {
        const breathe = reduced ? 1 : .72 + .28 * Math.sin(t * 1.3 + phases[i]);
        const r = 38 * SCALE * (reduced ? 1 : .9 + .1 * Math.sin(t * .9 + phases[i]));
        const g = ctx.createRadialGradient(p.x * SCALE, p.y * SCALE, 0, p.x * SCALE, p.y * SCALE, r);
        g.addColorStop(0, `rgba(0,0,0,${.46 * breathe})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x * SCALE, p.y * SCALE, r, 0, Math.PI * 2); ctx.fill();
      });
      const img = ctx.getImageData(0, 0, w, h), d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3]; if (!a) continue;
        const o = a * 4;
        d[i] = colours[o]; d[i + 1] = colours[o + 1]; d[i + 2] = colours[o + 2]; d[i + 3] = colours[o + 3];
      }
      ctx.putImageData(img, 0, 0);
      if (!reduced && visible) frame = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
    });
    io.observe(el);
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); io.disconnect(); };
  }, [projects]);

  // Spotlight cycles through the photographed projects every four seconds unless the visitor takes over.
  const shown = projects.filter((p) => p.hero);
  useEffect(() => {
    if (paused || reducedMotion() || shown.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % shown.length), 4000);
    return () => clearInterval(id);
  }, [paused, shown.length]);
  const current = shown[active];
  const hq = map.cities.Bathgate as number[];

  return <section className="map" data-tone="dark" aria-labelledby="map-title">
    <div className="wrap map-inner">
      <div className="map-stage" onMouseLeave={() => setPaused(false)}>
        <svg className="map-svg map-base" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          {map.land.map((d, i) => <path key={i} d={d} className="map-land" />)}
        </svg>
        <canvas ref={canvas} className="map-heat" aria-hidden="true" />
        <svg className="map-svg map-top" viewBox={`0 0 ${W} ${H}`} role="group" aria-label="SiBCAS case study locations">
          {projects.map((p) => {
            const on = current && p.slug === current.slug;
            return <a key={p.slug} href={p.href} aria-label={`${p.title}, ${p.place}`}
              onMouseEnter={() => { const i = shown.findIndex((s) => s.slug === p.slug); if (i >= 0) { setActive(i); setPaused(true); } }}>
              <circle cx={p.x} cy={p.y} r="9" className="map-hit" />
              <circle cx={p.x} cy={p.y} r={on ? 4.5 : 2.4} className={on ? "map-dot is-on" : "map-dot"} />
              {on && <circle cx={p.x} cy={p.y} r="6" className="map-ring" />}
            </a>;
          })}
          <g className="map-hq">
            <circle cx={hq[0]} cy={hq[1]} r="10" />
            <circle cx={hq[0]} cy={hq[1]} r="3.6" />
            <text x={hq[0] - 16} y={hq[1] + 4} textAnchor="end">Bathgate HQ</text>
          </g>
        </svg>
      </div>
      <div className="map-copy">
        <Label className="on-dark">Nationwide</Label>
        <h2 className="h2" id="map-title" data-rise>Modular Buildings for sale or hire <span className="muted">– from Gullane to Greenwich.</span></h2>
        <dl className="map-stats" data-rise>
          <div><dt>{projects.length}</dt><dd>Case studies on the map</dd></div>
          <div><dt>{cities.length}</dt><dd>Towns and cities served</dd></div>
        </dl>
        {current && <a className="spot" href={current.href} key={current.slug} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.hero!} alt="" />
          <span className="spot-body">
            <span className="spot-place">{current.place}{current.sector && ` · ${current.sector}`}</span>
            <span className="spot-title">{current.title}</span>
          </span>
          <span className="spot-go" aria-hidden="true"><Arrow /></span>
        </a>}
        <details className="map-cities">
          <summary>All locations</summary>
          <ul className="map-list">{cities.map((city) => <li key={city}><a href={cityHref(city)}>{city}</a></li>)}</ul>
        </details>
      </div>
    </div>
  </section>;
}
