"use client";

import { useId } from "react";

export interface ZSparkIconProps {
  variant?: "onDark" | "onLight";
  size?: number | string;
  shift?: number;
  showConnector?: boolean;
  showNode?: boolean;
  connectorPath?: string;
  className?: string;
}

export function ZSparkIcon({
  variant = "onDark",
  size = 32,
  shift = 0.9,
  showConnector = true,
  showNode = true,
  connectorPath,
  className = "",
}: ZSparkIconProps) {
  // Generate safe unique IDs for SVG defs to avoid collisions across multiple instances
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");

  const zdA = `zdA-${safeId}`;
  const zdB = `zdB-${safeId}`;
  const zdP = `zdP-${safeId}`;
  const zcA = `zcA-${safeId}`;
  const zcB = `zcB-${safeId}`;

  // Gradients and node colors based on variant
  // onDark: default specified colors
  // onLight: half A #0B3BFF → #6A4BFF, half B #0B3BFF → #19B8E6, satellite #8B5CF6 → #EC4899, node #22C3EE
  const isDark = variant === "onDark";

  const colorHalfAStart = isDark ? "#FFFFFF" : "#0B3BFF";
  const colorHalfAEnd = isDark ? "#C3CBFF" : "#6A4BFF";

  const colorHalfBStart = isDark ? "#8FE3FF" : "#0B3BFF";
  const colorHalfBEnd = isDark ? "#E9F5FF" : "#19B8E6";

  const colorSatStart = isDark ? "#C4B5FD" : "#8B5CF6";
  const colorSatEnd = isDark ? "#FBB6DC" : "#EC4899";

  const nodeColor = isDark ? "#7DD3FC" : "#22C3EE";

  // Connector line path: shifts to M33.2 14.8L36.2 11.8 on hover (when shift > 1.2)
  const activeConnectorD =
    connectorPath ??
    (shift > 1.2 ? "M33.2 14.8L36.2 11.8" : "M32.6 15.4L36.2 11.8");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient
          id={zdA}
          x1="6"
          y1="5"
          x2="30"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={colorHalfAStart} />
          <stop offset="1" stopColor={colorHalfAEnd} />
        </linearGradient>

        <linearGradient
          id={zdB}
          x1="20"
          y1="20"
          x2="43"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={colorHalfBStart} />
          <stop offset="1" stopColor={colorHalfBEnd} />
        </linearGradient>

        <linearGradient
          id={zdP}
          x1="32"
          y1="3"
          x2="45"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={colorSatStart} />
          <stop offset="1" stopColor={colorSatEnd} />
        </linearGradient>

        <clipPath id={zcA}>
          <polygon points="-10,-10 56.5,-10 -10,56.5" />
        </clipPath>

        <clipPath id={zcB}>
          <polygon points="59.5,-10 59.5,59.5 -10,59.5" />
        </clipPath>
      </defs>

      {/* Half A (Top-Left / Diagonal Upper Half) */}
      <g clipPath={`url(#${zcA})`}>
        <path
          transform={`translate(${shift} ${-shift})`}
          fill={`url(#${zdA})`}
          d="M24 5C25.2 16.5 31.5 22.8 43 24C31.5 25.2 25.2 31.5 24 43C22.8 31.5 16.5 25.2 5 24C16.5 22.8 22.8 16.5 24 5Z"
          style={{
            transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        />
      </g>

      {/* Half B (Bottom-Right / Diagonal Lower Half) */}
      <g clipPath={`url(#${zcB})`}>
        <path
          transform={`translate(${-shift} ${shift})`}
          fill={`url(#${zdB})`}
          d="M24 5C25.2 16.5 31.5 22.8 43 24C31.5 25.2 25.2 31.5 24 43C22.8 31.5 16.5 25.2 5 24C16.5 22.8 22.8 16.5 24 5Z"
          style={{
            transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        />
      </g>

      {/* Satellite Sparkle Connector */}
      {showConnector && (
        <path
          d={activeConnectorD}
          stroke={`url(#${zdP})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{
            transition: "d 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        />
      )}

      {/* Satellite Sparkle (Top-Right) */}
      <path
        fill={`url(#${zdP})`}
        d="M39.5 3C39.9 7 41 8.1 45 8.5C41 8.9 39.9 10 39.5 14C39.1 10 38 8.9 34 8.5C38 8.1 39.1 7 39.5 3Z"
      />

      {/* Cyan Node (Bottom-Left) */}
      {showNode && <circle cx="9" cy="39" r="2.1" fill={nodeColor} />}
    </svg>
  );
}

export default ZSparkIcon;
