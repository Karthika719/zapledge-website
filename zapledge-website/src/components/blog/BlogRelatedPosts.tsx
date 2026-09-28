import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostDetail } from '@/content/blog';

export default function BlogRelatedPosts({ posts }: { posts: BlogPostDetail[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="border-t border-[#E5E5E5] bg-[#FAFAFA] py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-[#0033FF] tracking-wider uppercase mb-1">
              Keep Reading
            </div>
            <h2
              id="related-posts-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#00003C] tracking-tight"
            >
              More from the Zapledge Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-bold text-[#0033FF] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            View all posts <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="flex">
              <Link
                href={post.fullSlug}
                className="group flex flex-col w-full bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 transition-all duration-300 hover:border-[#0033FF]/40 hover:shadow-[0_12px_30px_-4px_rgba(0,51,255,0.08)] focus-visible:outline-2 focus-visible:outline-[#0033FF] justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#FAFAFA] mb-4">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#0033FF] tracking-wider uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#00003C] group-hover:text-[#0033FF] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#555555] mt-2 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <span className="text-sm font-semibold text-[#0033FF] mt-5 inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Read Guide <span aria-hidden="true">→</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
