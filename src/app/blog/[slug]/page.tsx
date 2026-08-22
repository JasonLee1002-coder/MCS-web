import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/blog/ReadingProgress";
import { TocMobile, TocDesktop } from "@/components/blog/TableOfContents";

import { getBlogPost, getAllBlogSlugs, getAdjacentPosts, getRelatedPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

// 文章來源是 build 時掃 content/blog/*.md，不存在動態新增的 slug。
// 關掉 dynamicParams 讓 Next 對名單外的路徑直接回 404，不進 render。
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "找不到文章" };
  // 根 layout 的 title.template 是「%s | 銓幻元科技 MCS」，會自動接在後面。
  // 但有些文章的標題本身就必須帶品牌名——例如「GraBox 智取櫃是哪家公司製造的？
  // 銓幻元科技 MCS 完整介紹」，品牌就是那個查詢的答案，拿掉反而弱化。
  // 這種情況套上模板會變成品牌出現兩次、標題超過 40 字（中文 SERP 約只顯示 30），
  // 等於把尾巴白白截掉。標題已自帶品牌時就用 absolute 略過模板。
  const title = post.title.includes('銓幻元')
    ? { absolute: post.title }
    : post.title;

  return {
    title,
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
  if (!post) notFound();

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
      "@id": "https://www.mcstation.ai/#organization",
      name: "銓幻元科技股份有限公司",
      url: "https://www.mcstation.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mcstation.ai/images/mcs-logo.png",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.mcstation.ai/#organization",
      name: "銓幻元科技股份有限公司",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mcstation.ai/images/mcs-logo.png",
        width: 300,
        height: 100,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.mcstation.ai/blog/${slug}`,
    },
    image: post.image
      ? {
          "@type": "ImageObject",
          url: `https://www.mcstation.ai${post.image}`,
          width: 1200,
          height: 630,
        }
      : {
          "@type": "ImageObject",
          url: "https://www.mcstation.ai/images/mcs-logo.png",
          width: 1200,
          height: 630,
        },
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

  const faqJsonLd = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null;

  return (
    <>
      <ReadingProgress />
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
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

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

            {/*
              2026-08-23 GEO 修正：H1 正下方原本是關鍵字標籤列。

              實測（AI 引用測試，56 題 × 兩平台）發現 mcstation 在
              「智取櫃跟寄物櫃差在哪」這類題目上輸給自家的 transtep.com 與
              李奇申.com——但內容其實存在且完整。抓下線上 HTML 才看到：
              H1 之後緊接的是「餐飲智取櫃 取餐智取櫃 智取櫃差異」這串標籤，
              **AI 最常引用的位置被關鍵字堆佔住了**，摘要反而沒出現在正文裡。

              改為在 H1 下方放 description（那本來就是一句話直接回答），
              關鍵字標籤降到文末。這是模板，影響全站約 137 篇。

              關鍵字標籤本身對排名早已沒有作用，把它放在最值錢的版位是純損失。
            */}
            {post.description && (
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl">
                {post.description}
              </p>
            )}
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

        {/* Article Content + TOC Sidebar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12 xl:gap-16 items-start">
            <article>
              <TocMobile items={post.toc} />
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
            <TocDesktop items={post.toc} />
          </div>
        </div>

        {/* Related Articles */}
        {(() => {
          const related = getRelatedPosts(slug, 3);
          if (related.length === 0) return null;
          return (
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">相關文章</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block rounded-xl border border-gray-100 hover:border-mcs-orange/30 hover:shadow-md transition-all overflow-hidden"
                  >
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.title}
                        width={400}
                        height={210}
                        className="w-full h-36 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-mcs-orange transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <time className="text-xs text-gray-400 mt-1 block">{r.date}</time>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Prev/Next Navigation */}
        {(() => {
          const { prev, next } = getAdjacentPosts(slug);
          if (!prev && !next) return null;
          return (
            <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100" aria-label="文章導覽">
              <div className="flex justify-between items-stretch gap-4">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="flex-1 group flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-mcs-orange/30 hover:shadow-sm transition-all"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-mcs-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">上一篇</div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-mcs-orange transition-colors truncate">{prev.title}</div>
                    </div>
                  </Link>
                ) : <div className="flex-1" />}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border border-gray-100 hover:border-mcs-orange/30 hover:shadow-sm transition-all text-right"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">下一篇</div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-mcs-orange transition-colors truncate">{next.title}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-mcs-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : <div className="flex-1" />}
              </div>
            </nav>
          );
        })()}

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
