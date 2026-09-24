import { Arrow, Pill, PostCard } from "@/components/ui";
import type { Block, Post } from "@/lib/posts";
import { caseStudies, formatDate, hrefOf, neighbours, news } from "@/lib/posts";

/* Dubois' editorial rhythm on the article: section labels sit in the left column, copy on the right,
   photographs run full width and open as they arrive. */
function Body({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = [];
  let label: string | null = null;
  let buffer: Block[] = [];
  const flush = (key: number) => {
    if (!label && !buffer.length) return;
    out.push(<section className="split article-row" key={`s${key}`}>
      <h2 className="label" data-rise>{label ?? ""}</h2>
      <div className="prose">{buffer.map((b, i) => b.t === "p" ? <div key={i} data-rise dangerouslySetInnerHTML={{ __html: b.html }} /> : null)}</div>
    </section>);
    label = null; buffer = [];
  };
  blocks.forEach((b, i) => {
    if (b.t === "h") { flush(i); label = b.text; return; }
    if (b.t === "p") { buffer.push(b); return; }
    flush(i);
    if (b.t === "img") out.push(<figure className="article-figure" key={i} data-clip>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-parallax src={b.src} alt={b.alt ?? ""} loading="lazy" />
    </figure>);
    if (b.t === "gallery") out.push(<div className={`gallery gallery-${Math.min(b.imgs.length, 3)}`} key={i}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {b.imgs.map((src) => <figure key={src} data-clip><img src={src} alt="" loading="lazy" /></figure>)}
    </div>);
    if (b.t === "video") out.push(<div className="video" key={i} data-clip>
      <iframe src={`https://www.youtube-nocookie.com/embed/${b.id}?rel=0`} title="SiBCAS video" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />
    </div>);
    if (b.t === "mp4") out.push(<div className="video" key={i}><video src={b.src} controls playsInline preload="metadata" /></div>);
    if (b.t === "file") out.push(<div className="split article-row" key={i}><span /><div><Pill href={b.href} tone="dark" external>{b.label}</Pill></div></div>);
  });
  flush(blocks.length);
  return <>{out}</>;
}

export default function Article({ post }: { post: Post }) {
  const isNews = post.kind === "news";
  const { newer, older } = neighbours(post);
  const related = (isNews ? news : caseStudies).filter((p) => p.slug !== post.slug && (isNews || p.categories.some((c) => post.categories.includes(c)))).slice(0, 3);
  return <article>
    <header className="article-head wrap split">
      <p className="label" data-rise><a href={isNews ? "/news" : "/case-studies"}>{isNews ? "Latest News" : "Case Studies"}</a></p>
      <div>
        <h1 className="display page-title" data-rise>{post.title}</h1>
        {post.subtitle && <p className="lede accent" data-rise>{post.subtitle}</p>}
        <dl className="meta" data-rise>
          <div><dt>Posted on</dt><dd><time dateTime={post.date}>{formatDate(post.date)}</time></dd></div>
          <div><dt>Author</dt><dd>{post.author}</dd></div>
          {post.categories.length > 0 && <div><dt>{isNews ? "Category" : "Sector"}</dt><dd>{post.categories.join(", ")}</dd></div>}
        </dl>
      </div>
    </header>
    {post.hero && <figure className="article-hero wrap" data-clip>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-parallax src={post.hero} alt="" fetchPriority="high" />
    </figure>}
    <div className="wrap article-body">
      <Body blocks={post.blocks.filter((b) => !(b.t === "img" && b.src === post.hero))} />
    </div>
    <nav className="wrap pager" aria-label="More posts">
      {older ? <a href={hrefOf(older)}><span>Previous</span>{older.title}</a> : <span />}
      {newer ? <a href={hrefOf(newer)} className="pager-next"><span>Next</span>{newer.title}<Arrow /></a> : <span />}
    </nav>
    {related.length > 0 && <section className="section wrap">
      <div className="row-head">
        <h2 className="h-section" data-rise>{isNews ? "More News" : "Related Case Studies"}</h2>
        <a className="text-link" href={isNews ? "/news" : "/case-studies"}>View all<Arrow /></a>
      </div>
      <div className="cards">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
    </section>}
  </article>;
}
