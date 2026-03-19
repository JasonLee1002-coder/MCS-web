import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.mcstation.ai/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["銓幻元科技"],
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const wordCount = post.content.replace(/<[^>]*>/g, "").length;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "zh-Hant",
    wordCount,
    author: {
      "@type": "Organization",
      name: "銓幻元科技股份有限公司",
      url: "https://www.mcstation.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mcstation.ai/images/mcs-logo.png",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "銓幻元科技股份有限公司",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mcstation.ai/images/mcs-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.mcstation.ai/blog/${slug}`,
    },
    image: post.image
      ? `https://www.mcstation.ai${post.image}`
      : "https://www.mcstation.ai/images/mcs-logo.png",
    keywords: post.keywords.join(", "),
    articleSection: "智慧設備與餐飲數位轉型",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: "https://www.mcstation.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "部落格",
        item: "https://www.mcstation.ai/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://www.mcstation.ai/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />

        {/* Header */}
        <section className="bg-gradient-to-br from-mcs-blue-dark to-mcs-blue pt-28 pb-12 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回部落格
            </Link>
            <time className="text-white/60 text-sm">{post.date}</time>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.image && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={post.image}
                alt={`${post.title} — 銓幻元科技部落格`}
                width={1200}
                height={630}
                className="w-full h-64 sm:h-80 object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h4:text-lg prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-mcs-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-table:border-collapse prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-gray-200 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-200 prose-blockquote:border-l-mcs-orange prose-blockquote:text-gray-600 prose-li:text-gray-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related CTA */}
        <section className="bg-gradient-to-r from-mcs-orange to-mcs-orange-light py-12">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              想了解更多？
            </h2>
            <p className="text-white/90 mb-6">
              銓幻元科技提供 GraBox AI智取櫃、智慧販賣機、冷凍微波販賣機等完整解決方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/grabox"
                className="bg-white text-mcs-orange px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                了解 GraBox 智取櫃
              </Link>
              <Link
                href="/products/frozen-microwave"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
              >
                冷凍微波販賣機
              </Link>
              <Link
                href="/cases"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                查看客戶實績
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
