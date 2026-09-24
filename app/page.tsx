import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Arrow, PostCard } from "@/components/ui";
import { caseStudies, news } from "@/lib/posts";
import { accreditations, cities, cityHref, sectors, service, testimonials } from "@/lib/site";

const Icon = ({ name }: { name: string }) => {
  const paths: Record<string, string> = {
    badge: "M16 3l3.2 2.3 3.9-.2 1.2 3.7 3.2 2.3-1.2 3.7 1.2 3.7-3.2 2.3-1.2 3.7-3.9-.2L16 27l-3.2-2.3-3.9.2-1.2-3.7-3.2-2.3 1.2-3.7-1.2-3.7 3.2-2.3 1.2-3.7 3.9.2zM11.5 15.5l3 3 6-6",
    crane: "M6 28V6h2v22M3 28h10M8 6h20M8 6l6 6M24 6v7M22 13h4v4h-4zM8 12h6",
    plan: "M4 7h24v18H4zM4 14h10v11M14 7v4M20 14h8M20 14v11",
    leaf: "M7 25C7 13 14 6 27 6c0 13-7 20-19 20M7 25l11-11",
  };
  return <svg className="tile-icon" viewBox="0 0 32 32" aria-hidden="true"><path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>;
};

export default function Home() {
  const featured = caseStudies.filter((p) => p.hero).slice(0, 3);
  return <>
    <Hero />

    {/* Dubois "Our philosophy": a small label on the left, the statement large on the right, a blue closing line. */}
    <section className="section wrap split" id="welcome">
      <p className="label" data-rise>Welcome to SiBCAS</p>
      <div>
        <h2 className="statement" data-rise>Manufacturing Modular Buildings and Portable Site Cabins since 1973.</h2>
        <p className="statement accent" data-rise>Designers of the finest relocatable and modular buildings.</p>
        <div className="two-col">
          <p data-rise>At SiBCAS, we have been manufacturing and supplying Modular Buildings and Site Accommodation for over 50 years. We provide a reliable turnkey service and exceptional quality buildings.</p>
          <p data-rise>From multi-functional Modular Building complexes to suit any purpose including Classrooms and school facilities, Offices, Changing rooms and Health Centres to self-contained welfare units, storage containers and site accommodation, we can help provide a solution to your hire or sale requirements.</p>
        </div>
      </div>
    </section>

    {/* Dubois "As seen in" row, carried by SiBCAS' accreditations. */}
    <section className="wrap accred" aria-labelledby="accred-title">
      <div className="split accred-head">
        <p className="label" id="accred-title" data-rise>Our Accreditations</p>
        <p className="accred-copy" data-rise>We are full members of the Modular and Portable Building Association (MPBA), Constructionline and the Contractors’ Health and Safety Assessment Scheme (CHAS), are an NICEIC approved contractor, and also have Building Confidence Accreditation.</p>
      </div>
      <div className="marquee" aria-label="Accreditation logos">
        <div className="marquee-track">
          {[0, 1].map((copy) => <ul key={copy} aria-hidden={copy === 1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {accreditations.map((a) => <li key={a.name}><img src={a.src} alt={copy ? "" : a.name} loading="lazy" /></li>)}
          </ul>)}
        </div>
      </div>
    </section>

    {/* Dubois' gold promise tile with its two companion tiles. */}
    <section className="wrap promise">
      <div className="promise-main" data-tone="dark">
        <h2 className="statement" data-rise>Our Modular Buildings are manufactured in house to your specific requirements, providing a tailored bespoke service.</h2>
        <p data-rise>We design exceptional Modular Buildings to suit any function.</p>
        <svg className="promise-grid" viewBox="0 0 300 300" aria-hidden="true">
          {Array.from({ length: 100 }, (_, i) => <circle key={i} cx={(i % 10) * 30 + 15} cy={Math.floor(i / 10) * 30 + 15} r={1 + ((i % 10) + Math.floor(i / 10)) / 9} />)}
        </svg>
      </div>
      <a className="promise-link" href="https://sibcas.co.uk/sectors/" data-tone="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/2024-09-stretford-school-photos-feb-2024-22.jpg" alt="" loading="lazy" />
        <span className="promise-label">Sectors<Arrow /></span>
        <span className="promise-sub">Our Modular Buildings are manufactured in house to your specific requirements.</span>
      </a>
      <a className="promise-link" href="https://sibcas.co.uk/flexible-accommodation/" data-tone="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/2024-09-transport-car-park-units.jpg" alt="" loading="lazy" />
        <span className="promise-label">Flexible Accommodation<Arrow /></span>
        <span className="promise-sub">Discover our versatile range of Modular Buildings and Site Accommodation, expertly designed to meet all your specific needs.</span>
      </a>
    </section>

    {/* Dubois' feature tiles beside a tall photograph. */}
    <section className="wrap service">
      <div className="service-tiles">
        {service.map((s) => <article className="tile" key={s.title}>
          <h3 data-rise>{s.title}<sup>+</sup></h3>
          <p>{s.text}</p>
          <Icon name={s.icon} />
        </article>)}
      </div>
      <div className="service-media" data-clip>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-parallax src="/media/2024-09-colourful-hallway-sibcas.jpg" alt="Inside a SiBCAS modular building" loading="lazy" />
      </div>
    </section>

    {/* Dubois "About" with its global reach: here the depots and the UK cities SiBCAS serves. */}
    <section className="section wrap about" aria-labelledby="about-title">
      <div className="split">
        <h2 className="display about-title" id="about-title" data-rise>About SiBCAS</h2>
        <div>
          <p className="lede" data-rise>Sibcas Ltd is a leading provider of Quality Modular Buildings and Relocatable Accommodation. Established in 1973, Sibcas is a family-owned and managed business.</p>
          <p className="lede accent" data-rise>We have 5 strategically located depots throughout the UK, employing in house skilled tradespersons.</p>
          <a className="text-link" href="https://sibcas.co.uk/about/" data-rise>Learn More<Arrow /></a>
        </div>
      </div>
      <div className="split cities">
        <p className="label" data-rise>Modular Buildings across the UK</p>
        <ul className="city-list">
          {cities.map((city) => <li key={city}><a href={cityHref(city)}>{city}</a></li>)}
        </ul>
      </div>
    </section>

    {/* Dubois "Our Solutions": a text tile, then photographs. */}
    <section className="wrap sectors" aria-labelledby="sectors-title">
      <div className="tile sectors-intro">
        <h2 className="display" id="sectors-title" data-rise>Sectors</h2>
        <p data-rise>SiBCAS specialises in providing high-end modular buildings including classrooms, health centres, office space and sports facilities, that combine the comfort and reliability of a permanent building with the flexibility of being relocatable.</p>
        <a className="text-link" href="https://sibcas.co.uk/sectors/">Learn More<Arrow /></a>
      </div>
      {sectors.map((s) => <a className="sector" key={s.name} href={s.href}>
        <span className="sector-name">{s.name}<Arrow /></span>
        <span className="sector-media" data-clip>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-parallax src={s.img} alt="" loading="lazy" />
        </span>
        <span className="sector-text">{s.text}</span>
      </a>)}
    </section>

    <section className="section wrap" aria-labelledby="cs-title">
      <div className="row-head">
        <h2 className="h-section" id="cs-title" data-rise>Case Studies</h2>
        <a className="text-link" href="/case-studies">All {caseStudies.length} case studies<Arrow /></a>
      </div>
      <div className="cards">{featured.map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </section>

    <Testimonials items={testimonials} />

    <section className="section wrap" aria-labelledby="news-title">
      <div className="row-head">
        <h2 className="h-section" id="news-title" data-rise>Latest News</h2>
        <a className="text-link" href="/news">View All News<Arrow /></a>
      </div>
      <div className="cards">{news.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </section>
  </>;
}
