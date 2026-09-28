import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog & Insights | Zapledge International',
  description:
    'Explore practical insights, pricing guides, and business guides on AI automation, engineering, and systems.',
};

const blogPosts = [
  {
    slug: '/blog/ai-automation-cost-india',
    title: 'AI Automation Cost in India: 2026 Pricing Guide',
    description:
      'See real 2026 pricing for AI automation in India, from single workflows to full custom builds, plus what actually drives the cost up or down.',
  },
  {
    slug: '/blog/what-is-ai-automation',
    title: 'What Is AI Automation? A Practical Business Guide',
    description:
      "AI automation combines machine learning and automation to handle tasks traditional software can't. Here's what it actually means for your business.",
  },
  {
    slug: '/blog/signs-you-need-workflow-automation',
    title: '5 Signs Your Business Needs Workflow Automation',
    description:
      'IDC research shows businesses lose 20-30% of revenue to process inefficiencies. Here are 5 signs your manual workflows are costing you more than time.',
  },
  {
    slug: '/blog/ai-vs-traditional-software',
    title: "AI vs Traditional Software: What's Different?",
    description:
      "Traditional software follows fixed rules. AI software learns from data and adapts. Here's what that actually means for your business systems.",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-[75vh] pt-32 pb-24 px-6 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00003C]">Blogs &amp; Insights</h1>
          <p className="text-sm sm:text-base text-[#555555] mt-3">
            Practical guides and perspectives on AI automation, software engineering, and operational transformation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={post.slug}
              className="p-6 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#0033FF]/40 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-[#00003C] group-hover:text-[#0033FF] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-[#555555] mt-2 line-clamp-3">
                  {post.description}
                </p>
              </div>
              <span className="text-sm font-semibold text-[#0033FF] mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
