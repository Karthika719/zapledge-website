import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Client success stories and production deployment results across industries.',
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

