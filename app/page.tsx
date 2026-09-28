import Hero from "@/components/Hero";
import IsoArt from "@/components/IsoArt";
import Testimonials from "@/components/Testimonials";
import UkMap from "@/components/UkMap";
import { Arrow, Label, Pill, PostCard } from "@/components/ui";
import { caseStudies, formatDate, hrefOf, news } from "@/lib/posts";
import { accreditations, contactHref, process, services, testimonials, values } from "@/lib/site";

const ValueIcon = ({ name }: { name: string }) => {
  const d: Record<string, string> = {
    shield: "M12 3 4.5 6v5.5c0 4.4 3.1 8.3 7.5 9.5 4.4-1.2 7.5-5.1 7.5-9.5V6L12 3Zm-3.2 9.2 2.3 2.3 4.3-4.6",
    factory: "M3 20V10l5 3V10l5 3V10l5 3V4h3v16H3Zm3-3h2m3 0h2m3 0h2",
    home: "M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5",
  };
  return <svg viewBox="0 0 24 24" className="value-icon" aria-hidden="true"><path d={d[name]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" /></svg>;
};

export default function Home() {
  const rows = caseStudies.filter((p) => p.hero).slice(0, 5);
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

    {/* MeiLog's ruled service grid: code and title, a line drawing, then a numbered list. */}
    <section className="services" id="services" aria-label="What we do">
      <div className="services-grid">
        {services.map((s) => <article className="service" key={s.code}>
          <header className="service-head">
            <p className="mono">{s.code}</p>
            <h3><a href={s.href}>{s.title}</a></h3>
          </header>
          <div className="service-art"><IsoArt kind={s.art} /></div>
          <ol className="service-list">
            {s.items.map((item, i) => <li key={item.name}><a href={item.href}><span>{item.name}</span><span className="mono">{String(i + 1).padStart(2, "0")}</span></a></li>)}
          </ol>
        </article>)}
        <article className="service service-note">
          <p className="mono">06 — SECTORS</p>
          <p className="service-note-copy">Our Modular Buildings are manufactured in house to your specific requirements, providing a tailored bespoke service.</p>
          <Pill href="https://sibcas.co.uk/sectors/" tone="dark" external>All Sectors</Pill>
        </article>
      </div>
    </section>

    {/* + HOW WE WORK — navy-washed photograph, statement, five bracketed steps. */}
    <section className="process" data-tone="dark" aria-labelledby="process-title">
      <div className="process-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-parallax src="/media/2024-09-corridor-units-sibcas.jpg" alt="" loading="lazy" />
      </div>
      <div className="wrap process-inner">
        <Label className="on-dark">How we work</Label>
        <h2 className="h2" id="process-title" data-rise>Sibcas can arrange short- or long-term rental contracts on accommodation to suit almost any function, from concept and design through to final site installation.</h2>
        <ol className="steps">
          {process.map((step, i) => <li key={step.title} data-rise>
            <span className="mono">[{String(i + 1).padStart(2, "0")}]</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>)}
        </ol>
      </div>
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
        <p className="mono">Our Accreditations</p>
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

    {/* + CASE STUDIES — MeiLog's numbered reference rows; the photograph appears as you hover. */}
    <section className="section refs" aria-labelledby="refs-title">
      <div className="wrap refs-head">
        <Label>Case Studies</Label>
        <a className="text-link" href="/case-studies">All {caseStudies.length} case studies<Arrow /></a>
      </div>
      <h2 className="sr-only" id="refs-title">Case Studies</h2>
      <ol className="ref-list">
        {rows.map((p, i) => <li key={p.slug}>
          <a className="wrap ref" href={hrefOf(p)}>
            <span className="ref-num">{i + 1}</span>
            <span className="ref-title">{p.title}</span>
            <span className="ref-copy">{p.excerpt.length > 170 ? p.excerpt.slice(0, 170).replace(/\s+\S*$/, "") + "…" : p.excerpt}<em className="mono">{[formatDate(p.date), ...p.categories].join(" · ")}</em></span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {p.hero && <img className="ref-img" src={p.hero} alt="" loading="lazy" />}
          </a>
        </li>)}
      </ol>
    </section>

    <UkMap />

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
