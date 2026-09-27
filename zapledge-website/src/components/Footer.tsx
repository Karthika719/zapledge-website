"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { useFooterReveal } from "@/hooks/useFooterReveal";
import { colors } from "@/styles/theme";

const EMAILS = [
  { label: "General", address: "info@zapledge.com" },
  { label: "Careers", address: "hr@zapledge.com" },
  { label: "Sales", address: "sales@zapledge.com" },
] as const;

// Quiet navy gradient — stays dark and desaturated, never reaching the vivid accent blue
const FOOTER_BACKGROUND = `linear-gradient(180deg, ${colors.navy} 0%, #0a1a4d 40%, #1a2f7a 100%)`;

// Tileable fine-grain noise (inline SVG feTurbulence), blended over the gradient.
// Raw feTurbulence is colored, semi-transparent and clusters around mid-gray, which overlay treats as
// "no change" — so it's desaturated, contrast-stretched (0.33–0.67 → 0–1) and made opaque.
const GRAIN_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='3' intercept='-1'/%3E%3CfeFuncG type='linear' slope='3' intercept='-1'/%3E%3CfeFuncB type='linear' slope='3' intercept='-1'/%3E%3CfeFuncA type='linear' slope='0' intercept='1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Row animation values come from CSS variables written by useFooterReveal.
// Fallbacks (opacity 1, no offset) mean the footer is fully visible before JS runs.
const row = (n: 1 | 2 | 3): CSSProperties => ({
  opacity: `var(--row${n}-o, 1)`,
  transform: `translate3d(0, var(--row${n}-y, 0px), 0)`,
  willChange: "transform, opacity",
});

// Text on the gradient: white for headings, slightly receded links, white/60 for secondary/muted
const muted = "text-white/60";
const label = `text-[11px] font-semibold uppercase tracking-[0.08em] ${muted} md:text-xs`;
const link =
  "text-white/85 underline-offset-4 decoration-white/40 transition-colors duration-150 hover:text-white hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8DA2FF]";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { sticky } = useFooterReveal(footerRef);

  return (
    <footer
      ref={footerRef}
      className={`${sticky ? "sticky bottom-0" : "relative"} z-0 overflow-hidden`}
      style={{ backgroundImage: FOOTER_BACKGROUND, backgroundColor: colors.navy, color: colors.white }}
    >
      {/* Grain texture overlay — barely perceptible, paper-like */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_TEXTURE, backgroundSize: "200px 200px" }}
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-12 px-6 pt-14 pb-8 md:gap-14 md:px-16 md:pt-16 lg:px-24 lg:pt-20 lg:pb-10">
        {/* Main Content */}
        <div
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-10 lg:gap-x-12 items-start"
          style={row(2)}
        >
          {/* Company Info */}
          <div className="flex flex-col gap-2.5 md:col-span-12 lg:col-span-6 lg:pr-10">
            <div className={label}>Company</div>
            <div className="text-xl font-bold leading-[1.25] tracking-[-0.015em] md:text-2xl">
              Zapledge International Pvt Ltd
            </div>
            <address className={`max-w-[440px] text-sm not-italic leading-[1.6] ${muted} md:text-[15px]`}>
              Ground Floor, Building No: 3100, Manikath Rd, Ravipuram, Kochi, Kerala, India
            </address>
          </div>

          {/* Email Contacts */}
          <div className="flex flex-col gap-2.5 border-t border-white/[0.08] pt-6 md:border-t-0 md:pt-0 md:col-span-7 lg:col-span-3 lg:border-l lg:pl-8">
            <div className={`${label} mb-1 md:mb-0`}>Email</div>
            <div className="flex flex-col gap-3">
              {EMAILS.map((e) => (
                <a
                  key={e.address}
                  href={`mailto:${e.address}`}
                  className={`${link} flex items-center justify-between text-sm font-medium md:flex-col-reverse md:items-start md:gap-0.5 lg:text-[15px]`}
                >
                  <span>{e.address}</span>
                  <span className={`text-xs font-normal ${muted}`}>{e.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Phone Info */}
          <div className="flex flex-col gap-2.5 border-t border-white/[0.08] pt-6 md:border-t-0 md:pt-0 md:col-span-5 lg:col-span-3 lg:border-l lg:pl-8">
            <div className={label}>Phone</div>
            <span className={`text-sm leading-normal ${muted} lg:text-[15px]`}>
              [Phone number to be provided]
            </span>
          </div>
        </div>

        {/* Legal Bar */}
        <div
          className="flex flex-col gap-3 border-t border-white/[0.08] pt-6 md:flex-row-reverse md:items-center md:justify-between md:gap-6"
          style={row(3)}
        >
          <div className="flex items-center gap-4">
            <Link href="/privacy" className={`${link} py-1.5 text-[13px]`}>
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-white/20" />
            <Link href="/terms" className={`${link} py-1.5 text-[13px]`}>
              Terms &amp; Conditions
            </Link>
          </div>
          <p className={`m-0 text-xs leading-normal ${muted} md:text-[13px]`}>
            © 2026 Zapledge International Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>

      {/* Depth: the footer starts dimmed while covered and brightens as it's revealed */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#000014]"
        style={{ opacity: "var(--reveal-dim, 0)" }}
      />
    </footer>
  );
}
