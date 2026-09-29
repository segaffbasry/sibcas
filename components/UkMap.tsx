"use client";

import { useEffect, useState } from "react";
import map from "@/content/uk-map.json";
import { reducedMotion } from "@/components/Motion";
import { Arrow, Label } from "@/components/ui";
import { cities, cityHref } from "@/lib/site";

export type MapProject = { slug: string; place: string; x: number; y: number; title: string; href: string; hero: string | null; sector: string };

const W = map.width, H = map.height;
// Heat ramp in SiBCAS blues: land at rest is a faint navy dot, work turns it logo-blue, then sky, then white.
const RAMP = ["#2a3d57", "#1f5687", "#0079c1", "#4aa3dc", "#a7d3f2", "#ffffff"];
const tone = (h: number) => RAMP[Math.min(RAMP.length - 1, Math.floor(h * (RAMP.length - .01)))];

/* A dotted UK: a hexagonal grid clipped to the land (Natural Earth 1:10m), so nothing sits in the sea.
   Each dot's heat is the sum of Gaussian falloffs from the 46 geocoded case studies, precomputed into
   content/uk-map.json. The hottest dots shimmer, and one project at a time is labelled in a pill and
   spotlit beside the map. */
export default function UkMap({ projects }: { projects: MapProject[] }) {
  const shown = projects.filter((p) => p.hero);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reducedMotion() || shown.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % shown.length), 3800);
    return () => clearInterval(id);
  }, [paused, shown.length]);

  const current = shown[active];
  const r = map.dotSize * .36;
  const flip = current && current.x > W * .55;

  return <section className="map" data-tone="dark" aria-labelledby="map-title">
    <div className="wrap map-inner">
      <div className="map-stage" onMouseLeave={() => setPaused(false)}>
        <svg className="map-svg" viewBox={`0 0 ${W} ${H}`} role="group" aria-label="SiBCAS case study locations">
          <g aria-hidden="true">
            {map.dots.map(([x, y, h], i) => <circle key={i} cx={x} cy={y} r={h > .15 ? r * (1 + h * .18) : r} fill={tone(h)}
              className={h > .62 ? "dot-hot" : undefined} style={h > .62 ? { animationDelay: `${(i % 17) * -.37}s` } : undefined} />)}
          </g>
          {projects.map((p) => <a key={p.slug} href={p.href} aria-label={`${p.title}, ${p.place}`}
            onMouseEnter={() => { const i = shown.findIndex((s) => s.slug === p.slug); if (i >= 0) { setActive(i); setPaused(true); } }}>
            <circle cx={p.x} cy={p.y} r="10" className="map-hit" />
          </a>)}
          {current && <g className="map-pin" key={current.slug} aria-hidden="true">
            <circle cx={current.x} cy={current.y} r="14" className="map-halo" />
            <circle cx={current.x} cy={current.y} r="7" className="map-ring" />
            <circle cx={current.x} cy={current.y} r="5.5" className="map-point" />
            <foreignObject x={flip ? current.x - 260 : current.x + 14} y={current.y - 20} width="246" height="40">
              <div className={`map-pill${flip ? " is-flip" : ""}`}><strong>{current.place}</strong><span>{current.sector}</span></div>
            </foreignObject>
          </g>}
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
