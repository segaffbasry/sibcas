"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/Motion";
import { Label } from "@/components/ui";
import type { testimonials as list } from "@/lib/site";

/* SiBCAS' homepage testimonials in MeiLog's type: one quote at a time in the headline face, the client in
   mono, and a numbered pager. */
export default function Testimonials({ items }: { items: typeof list }) {
  const [index, setIndex] = useState(0);
  const quote = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!quote.current || reducedMotion()) return;
    gsap.fromTo(quote.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .7, ease: "power3.out" });
  }, [index]);

  const item = items[index];
  return <section className="section wrap quotes" aria-labelledby="t-title" aria-roledescription="carousel">
    <div className="quotes-side">
      <Label>Testimonials</Label>
      <h2 className="quotes-sub" id="t-title" data-rise>Here&apos;s what our customers have to say.</h2>
      <div className="t-pager" role="group" aria-label="Choose testimonial">
        {items.map((t, i) => <button key={t.slug} aria-current={i === index} aria-label={`Testimonial ${i + 1}: ${t.role || t.name}`} onClick={() => setIndex(i)}>{String(i + 1).padStart(2, "0")}</button>)}
      </div>
    </div>
    <div className="t-quote" ref={quote} aria-live="polite">
      <blockquote>{item.quote.map((line) => <p key={line}>{line}</p>)}</blockquote>
      <p className="t-cite"><span className="mono">{item.name}</span>{item.role && <span>{item.role}</span>}</p>
    </div>
  </section>;
}
