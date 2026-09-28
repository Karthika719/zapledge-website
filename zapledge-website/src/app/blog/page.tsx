import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HomeCTASection from '@/components/HomeCTASection';
import { blogPosts } from '@/content/blog';

export const metadata: Metadata = {
  title: 'Blogs | Zapledge International',
  description:
    'Explore practical guides, pricing frameworks, and engineering insights on AI automation, software workflows, and systems architecture from Zapledge.',
};

export default function BlogIndexPage() {
  const featuredPost = blogPosts[0]; // Blog 1: AI Automation Cost in India: 2026 Pricing Guide
  const gridPosts = blogPosts.slice(1); // Blogs 2, 3, and 4

  return (
    <div className="w-full bg-[#FAFAFA]">
      {/* Top Eyebrow Section */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-4 sm:pb-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0033FF]/15 bg-[#0033FF]/5 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0033FF] animate-pulse" />
            <h1 className="text-xs font-bold uppercase tracking-wider text-[#0033FF]">
              BLOGS
            </h1>
          </div>
        </div>
      </section>

      {/* Main Editorial Listing Section */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          
          {/* Featured Story Lead Card */}
          <article>
            <Link
              href={featuredPost.fullSlug}
              className="group block bg-white rounded-3xl border border-[#E5E5E5] p-5 sm:p-7 lg:p-8 transition-all duration-300 hover:border-[#0033FF]/40 hover:shadow-[0_16px_40px_-6px_rgba(0,51,255,0.10)] focus-visible:outline-2 focus-visible:outline-[#0033FF]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                {/* Featured Visual */}
                <div className="lg:col-span-7">
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-[#FAFAFA]">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Featured Content Details */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center rounded-full bg-[#0033FF]/10 px-3 py-1 text-xs font-bold text-[#0033FF] uppercase tracking-wider">
                        Featured Guide
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#00003C] group-hover:text-[#0033FF] transition-colors leading-[1.2]">
                      {featuredPost.title}
                    </h2>
                    <p className="text-base sm:text-[16.5px] text-[#555555] mt-4 leading-relaxed">
                      {featuredPost.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[#E5E5E5]/80">
                    <span className="text-sm sm:text-base font-bold text-[#0033FF] inline-flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
                      Read Full Pricing Guide <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>

          {/* Clean 3-Column Editorial Grid for Remaining Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 sm:mt-12">
            {gridPosts.map((post) => (
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
                    <h2 className="text-lg sm:text-xl font-bold text-[#00003C] group-hover:text-[#0033FF] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#555555] mt-2.5 leading-relaxed line-clamp-3">
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

      {/* Global Home CTA Section */}
      <HomeCTASection />
    </div>
  );
}
