"use client";

import { useState } from "react";
import { ZSparkIcon } from "./ZSparkIcon";

export interface AiLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AiLauncher({ isOpen, onToggle }: AiLauncherProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Gradient rotation shifts from 210deg to 250deg on hover
  const gradientAngle = isHovered ? "250deg" : "210deg";

  return (
    <>
      <style>{`
        /* Hide tooltip pill on touch devices */
        @media (hover: none), (pointer: coarse) {
          .ai-launcher-tooltip {
            display: none !important;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .ai-launcher-btn,
          .ai-launcher-btn *,
          .ai-launcher-glow,
          .ai-launcher-tooltip {
            animation: none !important;
            transition: opacity 0.1s linear !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Floating launcher fixed container */}
      <div
        className={`fixed right-[40px] bottom-[40px] max-sm:right-[16px] max-sm:bottom-[16px] z-50 flex items-center justify-end pointer-events-none ${
          isOpen ? "max-sm:hidden" : ""
        }`}
      >
        {/* Tooltip Pill (to the left, 10px gap, shown on hover when closed, hidden on touch) */}
        <div
          className={`ai-launcher-tooltip mr-[10px] h-[38px] px-4 rounded-full bg-white flex items-center gap-2 select-none pointer-events-none transition-all duration-[180ms] ease-out ${
            isHovered && !isOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2.5"
          }`}
          style={{
            border: "1px solid rgba(11, 59, 255, 0.14)",
            boxShadow: "0 8px 20px -10px rgba(10, 11, 61, 0.3)",
          }}
          aria-hidden="true"
        >
          {/* 7px Gradient Dot */}
          <span
            className="w-[7px] h-[7px] rounded-full shrink-0 inline-block"
            style={{
              background: "linear-gradient(135deg, #0B3BFF, #EC4899)",
            }}
          />
          {/* Tooltip Text */}
          <span className="text-[14px] font-semibold text-[#0A0B3D] whitespace-nowrap leading-none">
            Ask Zapledge AI
          </span>
        </div>

        {/* Button Wrapper with ambient glow */}
        <div
          className="relative pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glow Behind Button (76px circle offset left:-6px top:-2px) */}
          <div
            aria-hidden="true"
            className="ai-launcher-glow absolute -left-[6px] -top-[2px] w-[76px] h-[76px] max-sm:w-[66px] max-sm:h-[66px] max-sm:-left-[5px] rounded-full pointer-events-none transition-all duration-300 ease-out"
            style={{
              background: `conic-gradient(from ${gradientAngle}, #0B3BFF, #7C5CFF, #F472B6, #22D3EE, #0B3BFF)`,
              filter: `blur(${isHovered ? "18px" : "16px"})`,
              opacity: isHovered ? 0.6 : 0.42,
            }}
          />

          {/* Launcher Button (64x64px, 56px mobile) */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={
              isOpen
                ? "Close Zapledge AI Assistant"
                : "Open Zapledge AI Assistant"
            }
            aria-expanded={isOpen}
            aria-controls="zapledge-ai-panel"
            className={`ai-launcher-btn relative w-[64px] h-[64px] max-sm:w-[56px] max-sm:h-[56px] rounded-full p-[1.5px] border-0 cursor-pointer flex items-center justify-center select-none outline-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#0B3BFF] focus-visible:outline-offset-[3px] transition-all duration-300 ease-out ${
              isHovered ? "scale-[1.06]" : "scale-100"
            }`}
            style={{
              background: `conic-gradient(from ${gradientAngle}, #4D6BFF, #9B87FF, #F9A8D4, #67E8F9, #4D6BFF)`,
              boxShadow:
                "0 14px 32px -10px rgba(11, 59, 255, 0.6), 0 2px 6px rgba(10, 11, 61, 0.22)",
            }}
          >
            {/* Inner Fill */}
            <span
              className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(120% 120% at 30% 18%, #2346FF 0%, #0B1A9A 42%, #070B34 100%)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.28)",
              }}
            >
              {/* Centre: ZSparkIcon onDark (crossfades out when isOpen) */}
              <div
                className="flex items-center justify-center"
                style={{
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen
                    ? "rotate(-90deg) scale(0.6)"
                    : "rotate(0deg) scale(1)",
                  transition:
                    "opacity 0.22s ease, transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  pointerEvents: isOpen ? "none" : "auto",
                }}
              >
                <ZSparkIcon
                  variant="onDark"
                  size={32}
                  shift={isHovered ? 1.6 : 0.9}
                />
              </div>

              {/* White Chevron-Down (crossfades in when isOpen) */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="absolute"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen
                    ? "rotate(0deg) scale(1)"
                    : "rotate(90deg) scale(0.6)",
                  transition:
                    "opacity 0.22s ease, transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  pointerEvents: isOpen ? "auto" : "none",
                }}
              >
                <path
                  d="M6 9.5L12 15.5L18 9.5"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AiLauncher;
