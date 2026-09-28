import type { Metadata } from "next";
import Archive from "@/components/Archive";
import { Label } from "@/components/ui";
import { caseStudies, sectorsOf } from "@/lib/posts";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudies() {
  return <>
    <section className="page-head wrap">
      <Label>Case Studies</Label>
      <div className="page-head-body">
        <h1 className="page-title" data-rise>Case Studies</h1>
        <p className="lede" data-rise>From multi-functional Modular Building complexes to suit any purpose including Classrooms and school facilities, Offices, Changing rooms and Health Centres to self-contained welfare units, storage containers and site accommodation.</p>
      </div>
    </section>
    <section className="wrap archive">
      <Archive posts={caseStudies} filters={sectorsOf(caseStudies)} by="category" />
    </section>
  </>;
}
