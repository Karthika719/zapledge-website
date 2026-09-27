'use client';

import React from 'react';
import LogoLoop, { LogoItem } from './ui/LogoLoop';
import { typography } from '../styles/theme';

interface ClientLogoData {
  src: string;
  alt: string;
}

const CLIENT_LOGOS: ClientLogoData[] = [
  { src: '/images/clients/KingKorn.png', alt: 'King Korn' },
  { src: '/images/clients/KottungalFurniture.png', alt: 'Kottungal Furniture' },
  { src: '/images/clients/Liro.jpeg', alt: 'Liro' },
  { src: '/images/clients/Orgo.png', alt: 'Orgo' },
  { src: '/images/clients/OxyIndia.svg', alt: 'Oxy India' },
  { src: '/images/clients/PCWF.png', alt: 'PCWF' },
  { src: '/images/clients/Winpro.jpg', alt: 'Winpro' },
  { src: '/images/clients/YesYesRoof.png', alt: 'Yes Yes Roof' },
  { src: '/images/clients/Chairman.jpg', alt: 'Chairman' },
];

function createLogoItem(client: ClientLogoData): LogoItem {
  return {
    node: (
      <div className="trusted-open-corner-badge w-[96px] sm:w-[110px] md:w-[165px] h-[70px] sm:h-[76px] md:h-[105px] p-2.5 sm:p-3 md:p-4">
        <img
          src={client.src}
          alt={client.alt}
          className="max-w-full max-h-full object-contain pointer-events-none"
        />
      </div>
    ),
  };
}

const LOGO_ITEMS_COL1: LogoItem[] = [
  createLogoItem(CLIENT_LOGOS[0]), // KingKorn
  createLogoItem(CLIENT_LOGOS[1]), // KottungalFurniture
  createLogoItem(CLIENT_LOGOS[2]), // Liro
];

const LOGO_ITEMS_COL2: LogoItem[] = [
  createLogoItem(CLIENT_LOGOS[3]), // Orgo
  createLogoItem(CLIENT_LOGOS[4]), // OxyIndia
  createLogoItem(CLIENT_LOGOS[5]), // PCWF
];

const LOGO_ITEMS_COL3: LogoItem[] = [
  createLogoItem(CLIENT_LOGOS[6]), // Winpro
  createLogoItem(CLIENT_LOGOS[7]), // YesYesRoof
  createLogoItem(CLIENT_LOGOS[8]), // Chairman
];

export function TrustedBySection() {
  return (
    <>
      <style>{`
        .trusted-open-corner-badge {
          position: relative;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Top-Right visible rounded corner + top & right borders */
        .trusted-open-corner-badge::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 60%;
          border-top: 1px solid rgba(0, 0, 0, 0.14);
          border-right: 1px solid rgba(0, 0, 0, 0.14);
          border-top-right-radius: 10px;
          pointer-events: none;
          transition: border-color 0.3s ease;
        }

        @media (min-width: 768px) {
          .trusted-open-corner-badge::before {
            border-top-right-radius: 14px;
          }
        }

        /* Bottom-Left visible rounded corner + bottom & left borders */
        .trusted-open-corner-badge::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60%;
          height: 60%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.14);
          border-left: 1px solid rgba(0, 0, 0, 0.14);
          border-bottom-left-radius: 10px;
          pointer-events: none;
          transition: border-color 0.3s ease;
        }

        @media (min-width: 768px) {
          .trusted-open-corner-badge::after {
            border-bottom-left-radius: 14px;
          }
        }

        .trusted-open-corner-badge:hover::before,
        .trusted-open-corner-badge:hover::after {
          border-color: rgba(0, 51, 255, 0.35);
        }
      `}</style>

      <section
        id="trusted-by"
        className="relative w-full py-16 md:py-24 border-t border-gray-100 overflow-hidden"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN — SECTION HEADER */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0033FF]/5 border border-[#0033FF]/15 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0033FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0033FF]" />
                </span>
                <span className="text-xs font-bold tracking-wider text-[#0033FF] uppercase">
                  Trusted By
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#00003C] mb-5 leading-[1.15]"
                style={{ fontFamily: typography.fontFamily }}
              >
                Trusted by Businesses Across India
              </h2>

              <p
                className="text-base md:text-lg text-gray-600 leading-relaxed font-normal"
                style={{ fontFamily: typography.fontFamily }}
              >
                Partnering with forward-thinking enterprises and growth-stage companies to deliver scalable AI solutions.
              </p>
            </div>

            {/* RIGHT COLUMN — 3-COLUMN VERTICAL LOGO LOOP GRID (MOBILE & DESKTOP) */}
            <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
              <div className="flex flex-row justify-center gap-2.5 sm:gap-4 md:gap-6 lg:gap-7 h-[360px] sm:h-[400px] md:h-[440px] relative overflow-hidden">
                {/* Column 1: UP */}
                <div className="w-[96px] sm:w-[110px] md:w-[165px] h-full relative">
                  <LogoLoop
                    logos={LOGO_ITEMS_COL1}
                    direction="up"
                    speed={38}
                    gap={16}
                    logoHeight={70}
                    fadeOut={true}
                    fadeOutColor="#FAFAFA"
                    ariaLabel="Client logos column 1"
                  />
                </div>

                {/* Column 2: DOWN */}
                <div className="w-[96px] sm:w-[110px] md:w-[165px] h-full relative">
                  <LogoLoop
                    logos={LOGO_ITEMS_COL2}
                    direction="down"
                    speed={38}
                    gap={16}
                    logoHeight={70}
                    fadeOut={true}
                    fadeOutColor="#FAFAFA"
                    ariaLabel="Client logos column 2"
                  />
                </div>

                {/* Column 3: UP */}
                <div className="w-[96px] sm:w-[110px] md:w-[165px] h-full relative">
                  <LogoLoop
                    logos={LOGO_ITEMS_COL3}
                    direction="up"
                    speed={38}
                    gap={16}
                    logoHeight={70}
                    fadeOut={true}
                    fadeOutColor="#FAFAFA"
                    ariaLabel="Client logos column 3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
