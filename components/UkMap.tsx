import map from "@/content/uk-map.json";
import { Label } from "@/components/ui";
import { cities, cityHref } from "@/lib/site";

/* MeiLog's dark "Regionale Präsenz" map, redrawn for SiBCAS: the UK and Ireland in outline on navy
   (Natural Earth 1:10m, projected at 55°N), a glowing point for every city SiBCAS has a page for, and the
   Bathgate head office ringed. The list on the right links to those real pages. */
export default function UkMap() {
  const hq = map.cities.Bathgate as number[];
  return <section className="map" data-tone="dark" aria-labelledby="map-title">
    <div className="wrap map-inner">
      <svg className="map-svg" viewBox={`0 0 ${map.width} ${map.height}`} aria-hidden="true">
        <defs>
          <radialGradient id="glow"><stop offset="0" stopColor="#9fb7d6" stopOpacity=".55" /><stop offset="1" stopColor="#9fb7d6" stopOpacity="0" /></radialGradient>
        </defs>
        {map.land.map((d, i) => <path key={i} d={d} className="map-land" />)}
        {cities.map((city) => {
          const p = (map.cities as Record<string, number[]>)[city];
          return p && <g key={city} className="map-city">
            <circle cx={p[0]} cy={p[1]} r="12" fill="url(#glow)" />
            <circle cx={p[0]} cy={p[1]} r="3.4" />
          </g>;
        })}
        <g className="map-hq">
          <circle cx={hq[0]} cy={hq[1]} r="11" />
          <circle cx={hq[0]} cy={hq[1]} r="4" />
          <text x={hq[0] + 16} y={hq[1] + 4}>Bathgate HQ</text>
        </g>
      </svg>
      <div className="map-copy">
        <Label className="on-dark">Nationwide</Label>
        <h2 className="h2" id="map-title" data-rise>Modular Buildings for sale or hire <span className="muted">– from Inverness to Southampton.</span></h2>
        <p className="mono map-sub" data-rise>Locations</p>
        <ul className="map-list">
          {cities.map((city) => <li key={city}><a href={cityHref(city)}>{city}</a></li>)}
        </ul>
      </div>
    </div>
  </section>;
}
