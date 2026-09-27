import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Domain-tailored enterprise AI solutions for finance, healthcare, e-commerce, and logistics.',
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

