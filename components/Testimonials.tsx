"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/Motion";
import type { testimonials as list } from "@/lib/site";

/* SiBCAS' homepage testimonial slider, set as a Dubois statement: one quote at a time, numbered pager. */
export default function Testimonials({ items }: { items: typeof list }) {
  const [index, setIndex] = useState(0);
  const quote = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!quote.current || reducedMotion()) return;
    gsap.fromTo(quote.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .8, ease: "power3.out" });
  }, [index]);

  const item = items[index];
  return <section className="section wrap split testimonials" aria-labelledby="t-title" aria-roledescription="carousel">
    <div>
      <p className="label" id="t-title" data-rise>Testimonials</p>
      <p className="t-sub" data-rise>Here&apos;s what our customers have to say.</p>
    </div>
    <div>
      <div className="t-quote" ref={quote} aria-live="polite">
        <blockquote>{item.quote.map((line) => <p key={line}>{line}</p>)}</blockquote>
        <p className="t-cite"><strong>{item.name}</strong>{item.role && <span>{item.role}</span>}</p>
      </div>
      <div className="t-pager" role="group" aria-label="Choose testimonial">
        {items.map((t, i) => <button key={t.slug} aria-current={i === index} aria-label={`Testimonial ${i + 1}: ${t.role || t.name}`} onClick={() => setIndex(i)}>{i + 1}</button>)}
      </div>
    </div>
  </section>;
}
