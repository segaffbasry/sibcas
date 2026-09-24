import type { Metadata } from "next";
import Archive from "@/components/Archive";
import { news } from "@/lib/posts";

export const metadata: Metadata = { title: "Latest News" };

export default function News() {
  const years = Array.from(new Set(news.map((p) => p.date.slice(0, 4))));
  return <>
    <section className="page-head wrap split">
      <p className="label" data-rise>Latest News</p>
      <div>
        <h1 className="display page-title" data-rise>Latest News</h1>
        <p className="lede" data-rise>News, accreditations and community stories from SiBCAS, manufacturing Modular Buildings and Portable Site Cabins since 1973.</p>
      </div>
    </section>
    <section className="wrap archive">
      <Archive posts={news} filters={years} by="year" />
    </section>
  </>;
}
