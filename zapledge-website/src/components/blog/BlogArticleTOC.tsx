'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/content/blog';

export default function BlogArticleTOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden lg:block sticky top-28 w-56 self-start text-xs pr-6"
    >
      <div className="font-extrabold uppercase tracking-wider text-[#00003C] mb-3 text-[11px]">
        On this page
      </div>
      <ul className="space-y-2 border-l border-[#E5E5E5] pl-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollTo(e, item.id)}
                className={`block py-1 transition-colors leading-snug ${
                  isActive
                    ? 'font-bold text-[#0033FF] -ml-[13px] pl-3 border-l-2 border-[#0033FF]'
                    : 'text-[#555555] hover:text-[#00003C]'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
