import data from "@/content/posts.json";
import { testimonials } from "@/lib/site";

export type Block =
  | { t: "h"; text: string }
  | { t: "p"; html: string }
  | { t: "img"; src: string; alt?: string }
  | { t: "gallery"; imgs: string[] }
  | { t: "video"; id: string }
  | { t: "mp4"; src: string }
  | { t: "file"; href: string; label: string };

export type Post = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  date: string;
  kind: "news" | "case-study";
  categories: string[];
  author: string;
  hero: string | null;
  link: string;
  excerpt: string;
  blocks: Block[];
};

const byDate = (a: Post, b: Post) => b.date.localeCompare(a.date);

// Testimonial posts are empty shells on the live site; their quotes live on its homepage, so they are joined here.
const all: Post[] = (data as Post[]).map((post) => {
  const quote = testimonials.find((t) => t.slug === post.slug);
  if (!quote || post.blocks.length) return post;
  const html = quote.quote.map((line) => `<p>${line}</p>`).join("");
  const blocks: Block[] = [{ t: "h", text: "Testimonial" }, { t: "p", html }];
  return { ...post, blocks, excerpt: quote.quote[0].slice(0, 200) + "…" };
}).sort(byDate);

export const caseStudies = all.filter((p) => p.kind === "case-study");
export const news = all.filter((p) => p.kind === "news");
export const hrefOf = (p: Post) => `/${p.kind === "news" ? "news" : "case-studies"}/${p.slug}`;
export const findPost = (kind: Post["kind"], slug: string) => all.find((p) => p.kind === kind && p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });

export const sectorsOf = (list: Post[]) =>
  Array.from(new Set(list.flatMap((p) => p.categories))).filter((c) => c !== "Video").sort();

export function neighbours(post: Post) {
  const list = post.kind === "news" ? news : caseStudies;
  const i = list.findIndex((p) => p.slug === post.slug);
  return { newer: i > 0 ? list[i - 1] : null, older: i < list.length - 1 ? list[i + 1] : null };
}
