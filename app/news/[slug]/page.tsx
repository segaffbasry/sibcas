import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "@/components/Article";
import { news, findPost } from "@/lib/posts";

export const dynamicParams = false;
export const generateStaticParams = () => news.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = findPost("news", (await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function NewsPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = findPost("news", (await params).slug);
  if (!post) notFound();
  return <Article post={post} />;
}
