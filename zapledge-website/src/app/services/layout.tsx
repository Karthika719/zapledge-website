import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Capabilities',
  description:
    'Explore Zapledge International enterprise AI consulting, custom agentic engineering, and intelligent automation services.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

