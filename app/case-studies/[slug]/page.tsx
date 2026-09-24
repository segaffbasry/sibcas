import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "@/components/Article";
import { caseStudies, findPost } from "@/lib/posts";

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = findPost("case-study", (await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const post = findPost("case-study", (await params).slug);
  if (!post) notFound();
  return <Article post={post} />;
}
