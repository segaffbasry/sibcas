import type { ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";
import type { Post } from "@/lib/posts";
import { formatDate, hrefOf } from "@/lib/posts";

// The real SiBCAS mark. The white-lettered version sits over dark backgrounds; the header swaps between them.
export const Logo = ({ className = "" }: { className?: string }) => <span className={`logo ${className}`}>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img className="logo-dark" src="/brand/sibcas-logo-colour-8.png" alt="SiBCAS" width={1805} height={574} />
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img className="logo-light" src="/brand/sibcas-logo-colour-white-8.png" alt="" aria-hidden="true" width={1805} height={574} />
</span>;

// Dubois' north-east arrow, drawn at 18px beside link labels.
export const Arrow = ({ className = "" }: { className?: string }) => <svg className={`arrow ${className}`} viewBox="0 0 18 18" aria-hidden="true">
  <path d="M5 13 13 5M6.5 5H13v6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
</svg>;

export const BrandIcon = ({ icon }: { icon: keyof typeof brandIcons }) => <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon"><path d={brandIcons[icon]} fill="currentColor" /></svg>;

export const Social = ({ name, icon, href }: { name: string; icon: keyof typeof brandIcons; href: string }) =>
  <a className="social" href={href} target="_blank" rel="noopener" aria-label={name}><BrandIcon icon={icon} /></a>;

/* The Dubois "Contact us" pill, copied from its live hover: see .pill in globals.css. */
export function Pill({ href, children, tone = "light", external }: { href: string; children: ReactNode; tone?: "light" | "dark"; external?: boolean }) {
  return <a className={`pill pill-${tone}`} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
    <span>{children}</span><Arrow />
  </a>;
}

/* Dubois insight card: image (or a patterned plate when a post has none), title with arrow, date. */
export function PostCard({ post, eager }: { post: Post; eager?: boolean }) {
  return <a className="card" href={hrefOf(post)}>
    <div className="card-media" data-clip>
      {post.hero
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={post.hero} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
        : <Plate seed={post.id} />}
    </div>
    <div className="card-body">
      <h3>{post.title}<Arrow /></h3>
      <p className="card-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.categories[0] && <span>{post.categories[0]}</span>}
      </p>
    </div>
  </a>;
}

/* Dubois fills imageless insight cards with a rhythmic pattern. Here it is a field of module outlines,
   the SiBCAS unit seen in plan, varied per post so neighbouring cards differ. */
export function Plate({ seed }: { seed: number }) {
  const cols = 9, rows = 6;
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const v = (seed * 31 + r * 17 + c * 7) % 11;
    const w = v < 3 ? 2 : 1;
    if (v % 4 === 0) continue;
    cells.push(<rect key={`${r}-${c}`} x={c * 40 + 6} y={r * 40 + 6} width={w * 40 - 12} height={28} rx={1} />);
  }
  return <svg className="plate" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{cells}</svg>;
}
