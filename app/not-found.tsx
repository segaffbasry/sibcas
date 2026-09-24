import { Pill } from "@/components/ui";

export default function NotFound() {
  return <section className="page-head wrap split">
    <p className="label">404</p>
    <div>
      <h1 className="display page-title">This page could not be found.</h1>
      <Pill href="/" tone="dark">Home</Pill>
    </div>
  </section>;
}
