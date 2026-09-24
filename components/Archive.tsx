"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/ui";
import type { Post } from "@/lib/posts";

const PAGE = 12;

/* Index grid with a filter row. The full set is rendered in pages of twelve so images load as you go. */
export default function Archive({ posts, filters, by }: { posts: Post[]; filters: string[]; by: "category" | "year" }) {
  const [active, setActive] = useState<string>("All");
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => active === "All" ? posts : posts.filter((p) => by === "year" ? p.date.startsWith(active) : p.categories.includes(active)), [active, posts, by]);

  return <>
    <div className="filters" role="group" aria-label="Filter">
      {["All", ...filters].map((f) => <button key={f} aria-pressed={active === f} onClick={() => { setActive(f); setShown(PAGE); }}>{f}</button>)}
      <span className="filters-count">{list.length} {list.length === 1 ? "entry" : "entries"}</span>
    </div>
    <div className="cards cards-archive">
      {list.slice(0, shown).map((p, i) => <PostCard key={p.slug} post={p} eager={i < 3} />)}
    </div>
    {shown < list.length && <div className="more"><button className="pill pill-outline" onClick={() => setShown((n) => n + PAGE)}><span>Show more</span></button></div>}
  </>;
}
