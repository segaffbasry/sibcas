import map from "@/content/uk-map.json";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import UkMap, { type MapProject } from "@/components/UkMap";
import { Arrow, Label, Pill, PostCard } from "@/components/ui";
import { caseStudies, findPost, hrefOf, news } from "@/lib/posts";
import { accreditations, contactHref, process, sectors, services, testimonials, values } from "@/lib/site";

const ValueIcon = ({ name }: { name: string }) => {
  const d: Record<string, string> = {
    shield: "M12 3 4.5 6v5.5c0 4.4 3.1 8.3 7.5 9.5 4.4-1.2 7.5-5.1 7.5-9.5V6L12 3Zm-3.2 9.2 2.3 2.3 4.3-4.6",
    factory: "M3 20V10l5 3V10l5 3V10l5 3V4h3v16H3Zm3-3h2m3 0h2m3 0h2",
    home: "M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5",
  };
  return <svg viewBox="0 0 24 24" className="value-icon" aria-hidden="true"><path d={d[name]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" /></svg>;
};

// Every case study photograph, for the moving film strip of work.
const gallery = Array.from(new Set(caseStudies.flatMap((p) => p.blocks.flatMap((b) => b.t === "gallery" ? b.imgs : b.t === "img" ? [b.src] : [])).filter((src) => /\.(jpe?g)$/i.test(src))));

export default function Home() {
  const featured = ["taylor-high-school", "celtic-football-club-lennoxtown", "secondary-school-wolverhampton", "the-hamilton-park-racecourse-company-ltd", "xaverian-college"]
    .map((slug) => findPost("case-study", slug)).filter((p) => p && p.hero) as NonNullable<ReturnType<typeof findPost>>[];
  const projects: MapProject[] = map.projects.map((m) => {
    const p = findPost("case-study", m.slug)!;
    return { ...m, title: p.title, href: hrefOf(p), hero: p.hero, sector: p.categories.find((c) => c !== "Testimonial") ?? "" };
  });
  const strip = [gallery.filter((_, i) => i % 2 === 0).slice(0, 14), gallery.filter((_, i) => i % 2 === 1).slice(0, 14)];

  return <>
    <Hero />

    {/* + WHO IS SIBCAS — a navy statement whose closing clause drops to grey, copy to the right. */}
    <section className="section wrap intro" aria-labelledby="intro-title">
      <Label>Who is SiBCAS</Label>
      <div className="intro-grid">
        <div>
          <h2 className="h2" id="intro-title" data-rise>Sibcas Ltd is a leading provider of Quality Modular Buildings and Relocatable Accommodation <span className="muted">– family-owned and managed since 1973.</span></h2>
          <div className="intro-cta" data-rise><Pill href={contactHref} tone="dark" external>Start an Enquiry</Pill></div>
        </div>
        <p className="intro-copy" data-rise>From multi-functional Modular Building complexes to suit any purpose including Classrooms and school facilities, Offices, Changing rooms and Health Centres to self-contained welfare units, storage containers and site accommodation, we can help provide a solution to your hire or sale requirements.</p>
      </div>
    </section>

    {/* + SELECTED WORK — their projects at full size: one lead image, four beside it. */}
    <section className="wrap work" aria-labelledby="work-title">
      <div className="refs-head">
        <Label>Selected Work</Label>
        <a className="text-link" href="/case-studies">All {caseStudies.length} case studies<Arrow /></a>
      </div>
      <h2 className="sr-only" id="work-title">Selected work</h2>
      <div className="work-grid">
        {featured.map((p, i) => <a key={p.slug} href={hrefOf(p)} className={`work-item${i === 0 ? " work-lead" : ""}`}>
          <span className="work-media" data-clip>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-parallax src={p.hero!} alt="" loading={i === 0 ? "eager" : "lazy"} />
          </span>
          <span className="work-caption">
            <span className="work-meta">{p.categories.filter((c) => c !== "Testimonial").join(", ")}</span>
            <span className="work-title">{p.title}</span>
            {i === 0 && p.subtitle && <span className="work-sub">{p.subtitle}</span>}
          </span>
          <span className="work-go" aria-hidden="true"><Arrow /></span>
        </a>)}
      </div>
    </section>

    {/* MeiLog's ruled service grid, each discipline led by a SiBCAS photograph. */}
    <section className="services" id="services" aria-label="What we do">
      <div className="services-grid">
        {services.map((s) => <article className="service" key={s.code}>
          <header className="service-head">
            <p className="kicker">{s.code}</p>
            <h3><a href={s.href}>{s.title}</a></h3>
          </header>
          <a className="service-photo" href={s.href} tabIndex={-1} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt="" loading="lazy" />
          </a>
          <ol className="service-list">
            {s.items.map((item, i) => <li key={item.name}><a href={item.href}><span>{item.name}</span><span className="num">{String(i + 1).padStart(2, "0")}</span></a></li>)}
          </ol>
        </article>)}
        <article className="service service-note">
          <p className="kicker">06 — SECTORS</p>
          <ul className="sector-chips">
            {sectors.map((s) => <li key={s.name}><a href={s.href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt="" loading="lazy" /><span>{s.name}</span>
            </a></li>)}
          </ul>
          <Pill href="https://sibcas.co.uk/sectors/" tone="dark" external>All Sectors</Pill>
        </article>
      </div>
    </section>

    {/* + HOW WE WORK — a photograph under navy, statement, five numbered steps. */}
    <section className="process" data-tone="dark" aria-labelledby="process-title">
      <div className="process-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-parallax src="/media/2024-09-fork-lifting-unit.jpg" alt="" loading="lazy" />
      </div>
      <div className="wrap process-inner">
        <Label className="on-dark">How we work</Label>
        <h2 className="h2" id="process-title" data-rise>Sibcas can arrange short- or long-term rental contracts on accommodation to suit almost any function, from concept and design through to final site installation.</h2>
        <ol className="steps">
          {process.map((step, i) => <li key={step.title} data-rise>
            <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>)}
        </ol>
      </div>
    </section>

    {/* The work in pictures: two rows of case study photographs drifting in opposite directions. */}
    <section className="filmstrip" aria-label="SiBCAS projects in pictures">
      {strip.map((row, r) => <div className={`film-row${r ? " film-rev" : ""}`} key={r}>
        <div className="film-track">
          {[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1 || undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {row.map((src) => <li key={src}><img src={src} alt="" loading="lazy" /></li>)}
          </ul>)}
        </div>
      </div>)}
    </section>

    {/* + ABOUT SIBCAS — offset statement and three values, then the accreditation strip. */}
    <section className="section wrap about" aria-labelledby="about-title">
      <Label>About SiBCAS</Label>
      <div className="about-body">
        <h2 className="h2" id="about-title" data-rise>We are extremely proud of the fact that all of our units are manufactured in-house <span className="muted">and delivered from our own fleet of commercial vehicles and lorry mounted cranes.</span></h2>
        <div className="values">
          {values.map((v) => <div className="value" key={v.title} data-rise>
            <ValueIcon name={v.icon} />
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>)}
        </div>
      </div>
      <div className="accred" aria-label="Our Accreditations">
        <p className="kicker">Our Accreditations</p>
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {accreditations.map((a) => <li key={a.name}><img src={a.src} alt={copy ? "" : a.name} loading="lazy" /></li>)}
            </ul>)}
          </div>
        </div>
      </div>
    </section>

    <UkMap projects={projects} />

    <Testimonials items={testimonials} />

    <section className="section wrap" aria-labelledby="news-title">
      <div className="refs-head">
        <Label>Latest News</Label>
        <a className="text-link" href="/news">View All News<Arrow /></a>
      </div>
      <h2 className="sr-only" id="news-title">Latest News</h2>
      <div className="cards">{news.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </section>
  </>;
}
