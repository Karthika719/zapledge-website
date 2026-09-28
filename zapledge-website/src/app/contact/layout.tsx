import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

// Scoped to /contact only: the rest of the site has no display-face token, so this
// page introduces Outfit locally rather than touching the global font configuration.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Contact Us | Zapledge',
  description:
    'Email or complete the form to learn how Zapledge International Pvt Ltd can support your business.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={outfit.variable}>{children}</div>;
}
