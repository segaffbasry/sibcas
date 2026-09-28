import { Pill } from "@/components/ui";

export default function NotFound() {
  return <section className="page-head wrap">
    <p className="label">+ 404</p>
    <div className="page-head-body">
      <h1 className="page-title">This page could not be found.</h1>
      <Pill href="/" tone="dark">Home</Pill>
    </div>
  </section>;
}
