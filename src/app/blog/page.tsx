import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "部落格 | AI智取櫃・智慧販賣機・餐飲數位轉型知識庫",
  description:
    "銓幻元科技部落格：AI智取櫃趨勢、智慧販賣機市場分析、冷凍微波販賣機技術解析、餐飲數位轉型實戰指南、OEM/ODM客製化案例分享。台灣智慧設備產業最專業的知識平台。",
  keywords: [
    "AI智取櫃",
    "智慧販賣機",
    "冷凍微波販賣機",
    "餐飲數位轉型",
    "智能販賣機",
    "銓幻元科技",
    "GraBox",
    "OEM",
    "台灣製造",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "部落格 | 銓幻元科技 MCS",
    description:
      "AI智取櫃、智慧販賣機、餐飲數位轉型的最新趨勢與深度分析。",
    url: "https://www.mcstation.ai/blog",
  },
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
  ],
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "部落格 | 銓幻元科技 MCS",
    description:
      "AI智取櫃、智慧販賣機、餐飲數位轉型的最新趨勢與深度分析。",
    url: "https://www.mcstation.ai/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.mcstation.ai/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
        />

        {/* Header */}
        <section className="bg-gradient-to-br from-mcs-blue-dark to-mcs-blue pt-28 pb-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
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
              回首頁
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">部落格</h1>
            <p className="text-xl text-white/80 max-w-2xl">
              AI智取櫃、智慧販賣機、餐飲數位轉型的最新趨勢、技術解析與實戰案例分享。
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  {post.image && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    <time className="text-sm text-gray-400">{post.date}</time>
                    <h2 className="text-lg font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-mcs-orange transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.keywords.slice(0, 3).map((kw) => (
                        <span
                          key={kw}
                          className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              想了解更多智慧設備解決方案？
            </h2>
            <p className="text-gray-600 mb-8">
              從 GraBox AI智取櫃到冷凍微波販賣機，銓幻元科技為您量身打造最適合的方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/grabox"
                className="bg-mcs-orange text-white px-8 py-3 rounded-full font-medium hover:bg-mcs-orange-light transition-colors"
              >
                了解 GraBox 智取櫃
              </Link>
              <Link
                href="/cases"
                className="border-2 border-mcs-blue-dark text-mcs-blue-dark px-8 py-3 rounded-full font-medium hover:bg-mcs-blue-dark hover:text-white transition-colors"
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
