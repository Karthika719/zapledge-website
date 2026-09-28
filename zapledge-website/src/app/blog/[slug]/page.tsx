import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogArticleTOC from '@/components/blog/BlogArticleTOC';
import BlogQuickAnswer from '@/components/blog/BlogQuickAnswer';
import BlogKeyTakeaways from '@/components/blog/BlogKeyTakeaways';
import BlogCostTiers from '@/components/blog/BlogCostTiers';
import BlogFaqAccordion from '@/components/blog/BlogFaqAccordion';
import BlogAuthorBio from '@/components/blog/BlogAuthorBio';
import BlogRelatedPosts from '@/components/blog/BlogRelatedPosts';
import ArticleBottomCTA from '@/components/blog/ArticleBottomCTA';
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from '@/content/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Zapledge International',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug);

  // If article content is not yet ready, show clean publication notice
  if (!post.isReady) {
    return (
      <div className="w-full bg-[#FAFAFA] min-h-[70vh] flex flex-col justify-between">
        <div className="max-w-3xl mx-auto px-6 pt-36 pb-20 text-center flex-1 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0033FF]/15 bg-[#0033FF]/5 px-3.5 py-1.5 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0033FF] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0033FF]">
              Blog
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00003C] tracking-tight">
            {post.title}
          </h1>
          <p className="text-base text-[#555555] mt-4 max-w-xl leading-relaxed">
            This article is currently being prepared for publication.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0033FF] hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>

        {/* Bottom CTA */}
        <ArticleBottomCTA cta={post.cta} />
      </div>
    );
  }

  const authorInitials = post.author?.name
    ? post.author.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : 'ZP';

  return (
    <article className="w-full bg-white">
      {/* Top Reading Container */}
      <div className="pt-32 sm:pt-36 lg:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          
          {/* Article Header */}
          <header className="mb-8 max-w-4xl">
            {/* Breadcrumb / Category */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <div className="text-xs font-bold text-[#0033FF] tracking-wider uppercase flex items-center gap-2">
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
                <span className="text-[#E5E5E5]" aria-hidden="true">→</span>
                <span className="text-[#555555]">{post.category.replace('Blog → ', '')}</span>
              </div>
            </nav>

            {/* Title with Optional Dual-Tone Accent */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#00003C] tracking-tight leading-[1.18]">
              {post.titlePrefix ? (
                <>
                  {post.titlePrefix}
                  <span className="text-[#0033FF]">{post.titleAccent}</span>
                </>
              ) : (
                post.title
              )}
            </h1>

            {/* Subtitle / Excerpt */}
            {post.description && (
              <p className="mt-4 text-base sm:text-lg lg:text-[18.5px] text-[#555555] leading-relaxed max-w-3xl font-normal">
                {post.description}
              </p>
            )}

            {/* Author / Metadata Row */}
            {post.author && (
              <div className="mt-6 pt-6 border-t border-[#E5E5E5] flex items-center gap-3.5">
                <div
                  className="h-10 w-10 rounded-full bg-[#00003C] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-[#0033FF]/20"
                  aria-hidden="true"
                >
                  {authorInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#00003C]">
                      {post.author.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#555555]">
                    {post.author.role} {post.readTime && `· ${post.readTime}`} {post.date && `· ${post.date}`}
                  </p>
                </div>
              </div>
            )}
          </header>

          {/* Main Featured Hero Image */}
          <div className="my-8 sm:my-10">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#00003C] shadow-lg shadow-[#00003C]/5 border border-[#E5E5E5]">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Two-Column Editorial Reading Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 items-start">
            
            {/* Desktop Sticky Table of Contents */}
            <aside className="hidden lg:block lg:col-span-3">
              {post.tableOfContents && (
                <BlogArticleTOC items={post.tableOfContents} />
              )}
            </aside>

            {/* Main Editorial Reading Body Column (Centered, Medium-style) */}
            <div className="lg:col-span-9 max-w-3xl space-y-8">
              
              {/* Intro Narrative */}
              {post.intro && (
                <div className="text-lg sm:text-[18.5px] leading-[1.8] text-[#333333] font-normal">
                  <p>{post.intro}</p>
                </div>
              )}

              {/* Quick Answer Highlight Callout */}
              {post.quickAnswer && (
                <BlogQuickAnswer text={post.quickAnswer} />
              )}

              {/* Key Takeaways Card */}
              {post.keyTakeaways && (
                <BlogKeyTakeaways takeaways={post.keyTakeaways} />
              )}

              {/* Article Content Sections */}
              {post.contentSections && post.contentSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 pt-4 space-y-5"
                >
                  <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#00003C] tracking-tight leading-snug">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base sm:text-[17px] leading-[1.8] text-[#333333]"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Bullet points */}
                  {section.bullets && (
                    <ul className="space-y-3.5 my-5">
                      {section.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className="text-[#0033FF] font-bold text-base leading-none mt-1">●</span>
                          <span className="text-base sm:text-[16.5px] leading-relaxed text-[#333333]">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Supporting Image / Diagram if provided */}
                  {section.supportingImage && (
                    <div className="my-8">
                      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-[#00003C] shadow-md border border-[#E5E5E5]">
                        <Image
                          src={section.supportingImage.src}
                          alt={section.supportingImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 720px"
                          className="object-cover"
                        />
                      </div>
                      {section.supportingImage.caption && (
                        <p className="text-center text-xs sm:text-sm text-[#555555] mt-2.5 font-normal">
                          {section.supportingImage.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Paragraphs after supporting image */}
                  {section.afterParagraphs && section.afterParagraphs.map((ap, apIdx) => (
                    <p
                      key={apIdx}
                      className="text-base sm:text-[17px] leading-[1.8] text-[#333333]"
                    >
                      {ap}
                    </p>
                  ))}

                  {/* Inject Cost Tiers Bar Component under cost-ranges */}
                  {section.id === 'cost-ranges' && post.costTiers && (
                    <BlogCostTiers tiers={post.costTiers} />
                  )}
                </section>
              ))}

              {/* FAQ Accordion Section */}
              {post.faqs && <BlogFaqAccordion faqs={post.faqs} />}

              {/* Author Bio Section if enabled */}
              {post.showAuthorBio && post.author && (
                <BlogAuthorBio author={post.author} />
              )}

            </div>
          </div>
        </div>
      </div>

      {/* "More from the Zapledge Blog" Section if enabled */}
      {post.showRelatedPosts && (
        <BlogRelatedPosts posts={relatedPosts} />
      )}

      {/* Dedicated Consultation CTA Section replacing Let's Talk */}
      <ArticleBottomCTA cta={post.cta} />
    </article>
  );
}
