import type { Service } from "@/lib/site";

/* MeiLog draws each discipline as a fine isometric line drawing. These are SiBCAS' own subjects,
   built from true isometric boxes so every edge lines up: x runs down-right, y down-left, z up. */
const C = Math.cos(Math.PI / 6), S = .5, U = 12.5;
const pt = (x: number, y: number, z: number, ox = 150, oy = 60) => [ox + (x - y) * C * U, oy + (x + y) * S * U - z * U] as const;
const line = (...ps: (readonly [number, number])[]) => "M" + ps.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L");

/* A box's three visible faces (top, left x-face, right y-face) plus optional openings on the long faces. */
function box(x: number, y: number, z: number, w: number, d: number, h: number) {
  const p = (a: number, b: number, c: number) => pt(x + a, y + b, z + c);
  return [
    line(p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)) + "Z",
    line(p(0, d, 0), p(w, d, 0), p(w, d, h), p(0, d, h)) + "Z",
    line(p(w, 0, 0), p(w, d, 0), p(w, d, h), p(w, 0, h)) + "Z",
  ];
}
// A window or door on the front (y = d) face.
const front = (x: number, y: number, z: number, w: number, h: number) => line(pt(x, y, z), pt(x + w, y, z), pt(x + w, y, z + h), pt(x, y, z + h)) + "Z";
// A window on the side (x = w) face.
const side = (x: number, y: number, z: number, d: number, h: number) => line(pt(x, y, z), pt(x, y + d, z), pt(x, y + d, z + h), pt(x, y, z + h)) + "Z";

function modular() {
  const d: string[] = [];
  d.push(...box(0, 0, 0, 13, 5, 3.2), ...box(0, 0, 3.2, 13, 5, 3.2));
  for (let i = 0; i < 5; i++) { d.push(front(.8 + i * 2.5, 5, .9, 1.5, 1.6), front(.8 + i * 2.5, 5, 4.1, 1.5, 1.6)); }
  d.push(side(13, 1, 1, 1.4, 1.6), side(13, 3, 1, 1.4, 1.6), side(13, 1, 4.2, 1.4, 1.6), side(13, 3, 4.2, 1.4, 1.6));
  // external stair to the upper deck
  for (let i = 0; i <= 6; i++) d.push(line(pt(13.4 + i * .55, 5.2, 3.2 - i * .53), pt(13.4 + i * .55, 6.8, 3.2 - i * .53)));
  d.push(line(pt(13.4, 6.8, 3.2), pt(16.7, 6.8, 0)), line(pt(13.4, 6.8, 4.3), pt(16.7, 6.8, 1.1)));
  return d;
}
function cabin() {
  const d = box(1, 2, 0, 10, 4, 3.4);
  d.push(front(2.2, 6, 0, 1.4, 2.5), front(4.6, 6, .9, 2.4, 1.6), front(8, 6, .9, 2.2, 1.6));
  for (let i = 1; i < 6; i++) d.push(line(pt(4.6, 6, .9 + i * .27), pt(7, 6, .9 + i * .27)));
  d.push(side(11, 3, 1, 2, 1.5));
  d.push(...box(2, 6.1, 0, 1.4, .9, .35));
  d.push(line(pt(-1, 9, 0), pt(14, 9, 0)), line(pt(-1, 9.8, 0), pt(14, 9.8, 0)));
  return d;
}
// A wheel on the near (y = const) side: a circle in the x–z plane, which projects to an ellipse.
const wheel = (x: number, y: number, r = .75) => line(...Array.from({ length: 25 }, (_, i) => { const t = (i / 24) * Math.PI * 2; return pt(x + r * Math.cos(t), y, r + r * Math.sin(t)); })) + "Z";
function crane() {
  const d: string[] = [];
  // low-loader: chassis, cab with windscreen, then a SiBCAS cabin strapped on the bed
  d.push(...box(0, 2, .9, 15, 3.6, .5));
  d.push(...box(12.2, 2, 1.4, 2.8, 3.6, 3.1), side(15, 2.5, 3, 2.6, 1.2), front(12.6, 5.6, 2.9, 2, 1.3));
  d.push(...box(.4, 2.1, 1.4, 10.8, 3.4, 3), front(1.4, 5.5, 2.2, 1.8, 1.4), front(4.4, 5.5, 2.2, 1.8, 1.4), front(8.4, 5.5, 1.4, 1.4, 2.4));
  d.push(line(pt(3, 5.5, 4.4), pt(3, 5.5, 1.4)), line(pt(8, 5.5, 4.4), pt(8, 5.5, 1.4)));
  [1.8, 3.6, 10, 13.6].forEach((x) => d.push(wheel(x, 5.62)));
  d.push(line(pt(-2, 8, 0), pt(18, 8, 0)), line(pt(-2, 9, 0), pt(18, 9, 0)));
  return d;
}
function framework() {
  const d: string[] = [];
  for (let i = 0; i < 3; i++) d.push(...box(1 + i * .5, 1 - i * .5, i * .5, 8, 10, .35));
  for (let i = 0; i < 5; i++) d.push(line(pt(3.4, 2 + i * 1.6, 1.36), pt(8.8, 2 + i * 1.6, 1.36)));
  d.push(...box(9.6, 8.6, 0, 1.2, 1.2, 4.4));
  return d;
}
function plan() {
  const d = box(0, 0, 0, 14, 10, .3);
  const g = (x: number, y: number) => pt(x, y, .3);
  d.push(line(g(1.5, 1.5), g(12.5, 1.5), g(12.5, 8.5), g(1.5, 8.5)) + "Z", line(g(6, 1.5), g(6, 8.5)), line(g(6, 5), g(12.5, 5)), line(g(9, 5), g(9, 8.5)));
  d.push(line(g(1.5, 4), g(3.5, 4)), line(g(3.5, 4), g(3.5, 6)));
  // set square and scale rule lying on the sheet
  d.push(line(g(8, -2.5), g(13, -2.5), g(8, 2)) + "Z", ...box(-2, 11, 0, 12, 1, .5));
  return d;
}

const art = { modular, cabin, crane, framework, plan };

// Fit the viewBox to the drawing so every subject fills its cell the same way.
function fit(paths: string[], pad = 14) {
  const n = paths.join(" ").match(/-?\d+(\.\d+)?/g)!.map(Number);
  const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad;
  return `${x0.toFixed(0)} ${y0.toFixed(0)} ${(Math.max(...xs) - x0 + pad).toFixed(0)} ${(Math.max(...ys) - y0 + pad).toFixed(0)}`;
}

export default function IsoArt({ kind }: { kind: Service["art"] }) {
  const paths = art[kind]();
  const grid = Array.from({ length: 9 }, (_, i) => line(pt(-4, -2 + i * 1.6, 0), pt(18, -2 + i * 1.6, 0)));
  return <svg className="iso" viewBox={fit(paths)} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g className="iso-grid">{grid.map((d, i) => <path key={i} d={d} />)}</g>
    <g className="iso-lines">{paths.map((d, i) => <path key={i} d={d} />)}</g>
  </svg>;
}
