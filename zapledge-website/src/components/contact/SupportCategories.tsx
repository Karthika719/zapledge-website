import type { ReactNode } from 'react';
import { focusRing, outfitFont } from './shared';
import { HeadsetIcon, MegaphoneIcon, MessageIcon } from './icons';

interface Category {
  title: string;
  text: ReactNode;
  Icon: typeof HeadsetIcon;
  tint: string;
  iconColor: string;
}

const CATEGORIES: Category[] = [
  {
    title: 'Customer Support',
    text: 'Our support team is available around the clock to address any concerns or queries you may have.',
    Icon: HeadsetIcon,
    tint: '#EEF1FF',
    iconColor: '#0033FF',
  },
  {
    title: 'Feedback and Suggestions',
    text: 'We value your feedback and are continuously working to improve our services. Your input is crucial in shaping our future.',
    Icon: MessageIcon,
    tint: '#F2EEFF',
    iconColor: '#6A4BEA',
  },
  {
    title: 'Media Inquiries',
    text: (
      <>
        For media-related questions or press inquiries, please contact us at{' '}
        <a
          href="mailto:info@zapledge.com"
          className={`text-accent rounded-sm underline-offset-4 hover:underline ${focusRing}`}
        >
          info@zapledge.com
        </a>
        .
      </>
    ),
    Icon: MegaphoneIcon,
    tint: '#E8F8FD',
    iconColor: '#0E7FA0',
  },
];

export function SupportCategories() {
  return (
    <div className="flex flex-col">
      {CATEGORIES.map((cat, i) => (
        <div
          key={cat.title}
          className={`border-border-subtle flex gap-4 py-5 sm:gap-5 ${i !== 0 ? 'border-t' : ''}`}
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: cat.tint, color: cat.iconColor }}
          >
            <cat.Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className={`${outfitFont} text-navy text-[20px] font-semibold`}>{cat.title}</h3>
            <p className="text-text-secondary mt-1.5 text-[15.5px] leading-[1.6]">{cat.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
