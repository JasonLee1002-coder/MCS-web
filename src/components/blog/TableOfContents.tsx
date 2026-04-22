"use client";
import { useState, useEffect } from "react";

interface TocItem {
  text: string;
  level: number;
  id: string;
}

function useTocActive(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -60% 0px", threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return activeId;
}

/** Renders collapsible TOC for mobile — place inside <article> before prose */
export function TocMobile({ items }: { items: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useTocActive(items);

  if (items.length < 2) return null;

  return (
    <div className="lg:hidden mb-8">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-mcs-orange"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h10M4 18h7"
            />
          </svg>
          文章目錄
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <nav
          aria-label="文章目錄"
          className="mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
        >
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm leading-snug transition-colors ${
                    item.level === 3 ? "ml-3" : ""
                  } ${
                    activeId === item.id
                      ? "text-mcs-orange font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

/** Renders sticky desktop sidebar TOC — place in the sidebar grid column */
export function TocDesktop({ items }: { items: TocItem[] }) {
  const activeId = useTocActive(items);

  if (items.length < 2) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <nav
          aria-label="文章目錄"
          className="bg-gray-50 rounded-2xl px-5 py-5 border border-gray-100"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            目錄
          </p>
          <ul className="space-y-1.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-sm leading-snug transition-colors rounded px-2 py-0.5 ${
                    item.level === 3 ? "ml-3" : ""
                  } ${
                    activeId === item.id
                      ? "text-mcs-orange font-semibold bg-orange-50"
                      : "text-gray-500 hover:text-gray-800 hover:bg-white"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
