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

// North-east arrow; inside a button tile it swings 45° to point straight ahead on hover.
export const Arrow = ({ className = "" }: { className?: string }) => <svg className={`arrow ${className}`} viewBox="0 0 16 16" aria-hidden="true">
  <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.3" />
</svg>;

// MeiLog's eyebrow: "+ LABEL" in PT Mono capitals.
export const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) =>
  <p className={`label ${className}`} data-rise><span aria-hidden="true">+ </span>{children}</p>;

export const BrandIcon = ({ icon }: { icon: keyof typeof brandIcons }) => <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon"><path d={brandIcons[icon]} fill="currentColor" /></svg>;

export const Social = ({ name, icon, href }: { name: string; icon: keyof typeof brandIcons; href: string }) =>
  <a className="social" href={href} target="_blank" rel="noopener" aria-label={name}><BrandIcon icon={icon} /></a>;

/* MeiLog's button: a label pill and a separate square arrow tile, 44px tall, 8px corners, 4px apart.
   Hover (copied from the live site) darkens both tiles, opens the label's padding by 2px and swings the
   arrow 45° on the sampled curve in globals.css. */
export function Pill({ href, children, tone = "light", external }: { href: string; children: ReactNode; tone?: "light" | "dark"; external?: boolean }) {
  return <a className={`btn btn-${tone}`} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
    <span className="btn-label">{children}</span>
    <span className="btn-tile"><Arrow /></span>
  </a>;
}

export function PostCard({ post, eager }: { post: Post; eager?: boolean }) {
  return <a className="card" href={hrefOf(post)}>
    <div className="card-media" data-clip>
      {post.hero
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={post.hero} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
        : <Plate seed={post.id} />}
    </div>
    <div className="card-body">
      <p className="card-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.categories[0] && <span>{post.categories[0]}</span>}
      </p>
      <h3>{post.title}</h3>
      <span className="card-go" aria-hidden="true"><Arrow /></span>
    </div>
  </a>;
}

/* Imageless posts get a plate of module outlines, the SiBCAS unit seen in plan, varied per post. */
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
