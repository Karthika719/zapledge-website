"use client";

import React from "react";

export type FlowStep = string;

export type ExampleBranch = {
  afterIndex: number; // 0-indexed step index after which branch occurs
  label: string;
};

export type Example = {
  steps: FlowStep[]; // 3–5 short step labels (≤ 5 words each)
  highlightIndex?: number; // 0-indexed step shown as the "AI" step (solid blue), default 1
  branch?: ExampleBranch; // optional exception branch
  caption: string; // full illustrative sentence, muted small text
};

export type Item = {
  title: string;
  body: string;
  icon: React.ReactNode;
  example?: Example;
};

export type CapabilitiesIndexProps = {
  label: string; // eyebrow pill, e.g. "WHAT'S INCLUDED"
  headline: string; // e.g. "AI Application, Agent & Systems Engineering"
  headlineAccent: string; // trailing part of headline rendered in blue, e.g. "Capabilities"
  intro: string; // one sentence intro
  items: Item[];
};

export const CapabilitiesIndex: React.FC<CapabilitiesIndexProps> = ({
  label,
  headline,
  headlineAccent,
  intro,
  items = [],
}) => {
  const totalItems = items.length;
  const lastIndex = Math.max(0, totalItems - 1);
  const lastNumberFormatted = String(totalItems).padStart(2, "0");

  return (
    <section
      aria-labelledby="capabilities-index-heading"
      className="w-full relative overflow-hidden text-[#00003C] font-sans antialiased"
      style={{
        background:
          "radial-gradient(560px 420px at 0% 0%, rgba(0,51,255,0.06), transparent 70%), radial-gradient(520px 420px at 100% 100%, rgba(0,51,255,0.06), transparent 70%), linear-gradient(180deg, #F3F5FF 0px, #FFFFFF 360px)",
      }}
    >
      {/* Centered Main Container */}
      <div className="max-w-[1248px] mx-auto px-6 py-[80px] lg:px-[96px] lg:py-[128px]">
        
        {/* ========================================================================= */}
        {/* HEADER                                                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-end">
          {/* Left Column (cols 1–7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-[10px] px-4 py-2 rounded-full bg-[rgba(0,51,255,0.07)] border border-[rgba(0,51,255,0.22)] text-[#0026C2] text-[13px] font-semibold uppercase tracking-[0.06em] select-none">
              <span className="w-[7px] h-[7px] rounded-full bg-[#0033FF] shrink-0" />
              <span>{label}</span>
            </div>

            {/* H2 Headline */}
            <h2
              id="capabilities-index-heading"
              className="mt-5 lg:mt-[24px] max-w-[760px] text-[34px] leading-[1.1] sm:text-[44px] lg:text-[54px] lg:leading-[1.06] font-extrabold tracking-[-0.035em] text-[#00003C]"
            >
              {headline}{" "}
              <span className="text-[#0033FF]">{headlineAccent}</span>
            </h2>
          </div>

          {/* Right Column (cols 8–12) */}
          <div className="lg:col-span-5 flex flex-col gap-[20px] text-left">
            {/* Intro Paragraph */}
            <p className="mt-5 lg:mt-0 text-[17px] leading-[1.6] lg:text-[20px] lg:leading-[1.55] font-medium text-[#00003C] tracking-[-0.01em]">
              {intro}
            </p>

            {/* Decorative Range Rule (Desktop only) */}
            <div
              aria-hidden="true"
              className="hidden lg:flex items-center gap-3 select-none"
            >
              <span className="text-[12px] font-bold tracking-[0.08em] text-[#0033FF]">
                01
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(0,51,255,0.5)] to-[rgba(0,51,255,0.12)]" />
              <span className="text-[12px] font-bold tracking-[0.08em] text-[#6B6B80]">
                {lastNumberFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE LIST (CORE)                                                          */}
        {/* ========================================================================= */}
        <ol className="mt-[48px] lg:mt-[80px] list-none p-0 m-0 flex flex-col">
          {items.map((item, idx) => {
            const itemNumber = String(idx + 1).padStart(2, "0");
            const isFirst = idx === 0;
            const isLast = idx === lastIndex;

            return (
              <li
                key={idx}
                className="group flex flex-row gap-[14px] lg:gap-[40px] items-stretch relative"
              >
                {/* ----------------------------------------------------------------- */}
                {/* SPINE COLUMN (aria-hidden)                                        */}
                {/* ----------------------------------------------------------------- */}
                <div
                  aria-hidden="true"
                  className="relative flex-shrink-0 w-[32px] lg:w-[40px] select-none"
                >
                  {/* Vertical Spine Line */}
                  <div
                    className={`absolute w-[1.5px] bg-[rgba(0,51,255,0.2)] left-[15px] lg:left-[19px] ${
                      isFirst
                        ? "top-[34px] lg:top-[38px] bottom-0"
                        : isLast
                        ? "top-0 h-[34px] lg:h-[38px]"
                        : "top-0 bottom-0"
                    }`}
                  />

                  {/* Node Circle */}
                  <div
                    className={`absolute top-[34px] lg:top-[38px] left-0 w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] rounded-full border-[1.5px] flex items-center justify-center text-[12px] lg:text-[13px] font-bold transition-colors duration-250 motion-reduce:transition-none ${
                      isLast
                        ? "bg-[#00003C] border-[#00003C] text-white"
                        : "bg-white border-[rgba(0,51,255,0.4)] text-[#0033FF] group-hover:bg-[#0033FF] group-hover:border-[#0033FF] group-hover:text-white"
                    }`}
                  >
                    {itemNumber}
                  </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* CONTENT COLUMN                                                    */}
                {/* ----------------------------------------------------------------- */}
                <div
                  className={`flex-1 pt-[32px] pb-[36px] lg:pt-[40px] lg:pb-[44px] ${
                    !isFirst ? "border-t border-[rgba(0,0,60,0.09)]" : ""
                  }`}
                >
                  {/* Desktop Layout: 11-column grid | Mobile Layout: Stacked */}
                  <div className="flex flex-col lg:grid lg:grid-cols-11 lg:gap-6 lg:items-start">
                    
                    {/* Cols 1–4: Icon Tile + H3 Title */}
                    <div className="lg:col-span-4 flex items-center gap-3 lg:gap-4">
                      {/* Icon Tile */}
                      <div className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] rounded-[12px] bg-[rgba(0,51,255,0.08)] group-hover:bg-[#0033FF] transition-colors duration-250 motion-reduce:transition-none flex items-center justify-center shrink-0 text-[#0033FF] group-hover:text-white">
                        {React.isValidElement(item.icon) ? (
                          React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                            className: `w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] stroke-current stroke-[1.8] fill-none transition-colors duration-250 motion-reduce:transition-none ${
                              (item.icon as React.ReactElement<{ className?: string }>).props.className || ""
                            }`,
                          })
                        ) : (
                          item.icon
                        )}
                      </div>

                      {/* Title H3 */}
                      <h3 className="text-[20px] lg:text-[24px] leading-[1.2] font-extrabold tracking-[-0.02em] text-[#00003C] group-hover:text-[#0033FF] transition-colors duration-250 motion-reduce:transition-none">
                        {item.title}
                      </h3>
                    </div>

                    {/* Cols 5–11: Body Paragraph & Optional Example Panel */}
                    <div className="mt-3.5 lg:mt-0 lg:col-span-7 flex flex-col">
                      <p className="text-[15px] leading-[1.7] lg:text-[17px] lg:leading-[1.75] font-normal text-[#45455A]">
                        {item.body}
                      </p>

                      {/* Optional Example Panel */}
                      {item.example && (
                        <div className="mt-6 p-4 sm:p-5 lg:p-[20px_22px] rounded-[18px] bg-[#F3F5FF] border border-[rgba(0,51,255,0.10)] flex flex-col text-left">
                          
                          {/* Panel Header */}
                          <div className="mb-[14px] flex items-center gap-2 select-none">
                            <svg
                              className="w-[14px] h-[14px] stroke-[#6B6B80] fill-none"
                              viewBox="0 0 14 14"
                              aria-hidden="true"
                            >
                              <circle
                                cx="7"
                                cy="7"
                                r="6"
                                strokeDasharray="3 3"
                                strokeWidth="1.2"
                              />
                            </svg>
                            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B6B80]">
                              ILLUSTRATIVE EXAMPLE
                            </span>
                          </div>

                          {/* Flow Steps Container */}
                          <ol
                            aria-label="Example flow"
                            className="list-none p-0 m-0 flex flex-col lg:flex-row lg:items-center"
                          >
                            {item.example.steps.map((stepLabel, stepIdx) => {
                              const isHighlighted =
                                stepIdx === (item.example?.highlightIndex ?? 1);

                              return (
                                <React.Fragment key={stepIdx}>
                                  {/* Step Chip */}
                                  <div
                                    className={`min-h-[52px] px-[12px] py-[10px] rounded-[12px] flex items-center gap-[8px] text-[13px] leading-[1.3] font-semibold lg:flex-1 lg:min-w-0 ${
                                      isHighlighted
                                        ? "bg-[#0033FF] border border-[#0033FF] text-white shadow-sm"
                                        : "bg-white border border-[rgba(0,51,255,0.22)] text-[#00003C]"
                                    }`}
                                  >
                                    {/* Number Circle */}
                                    <span
                                      className={`w-5 h-5 min-w-[20px] rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                                        isHighlighted
                                          ? "bg-[rgba(255,255,255,0.20)] text-white"
                                          : "bg-[rgba(0,51,255,0.08)] text-[#0033FF]"
                                      }`}
                                    >
                                      {stepIdx + 1}
                                    </span>

                                    {/* Label Text */}
                                    <span className="truncate" title={stepLabel}>
                                      {stepLabel}
                                    </span>
                                  </div>

                                  {/* Connector Arrow (if not last step) */}
                                  {stepIdx < item.example!.steps.length - 1 && (
                                    <>
                                      {/* Mobile Down Arrow */}
                                      <div
                                        aria-hidden="true"
                                        className="lg:hidden my-1 flex justify-center text-[#0033FF]"
                                      >
                                        <svg
                                          className="w-[18px] h-[18px] stroke-current stroke-[2] fill-none"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            d="M12 5v14M5 12l7 7 7-7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>

                                      {/* Desktop Right Arrow */}
                                      <div
                                        aria-hidden="true"
                                        className="hidden lg:flex items-center justify-center px-2 text-[#0033FF] shrink-0"
                                      >
                                        <svg
                                          className="w-[20px] h-[20px] stroke-current stroke-[2] fill-none"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            d="M5 12h14M12 5l7 7-7 7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </div>
                                    </>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </ol>

                          {/* Optional Branch (Exception Path) */}
                          {item.example.branch && (
                            <>
                              {/* Desktop Branch Connector & Chip */}
                              <div
                                className="hidden lg:flex items-center mt-3"
                                style={{
                                  paddingLeft: `${
                                    (item.example.branch.afterIndex /
                                      item.example.steps.length) *
                                    100
                                  }%`,
                                }}
                              >
                                <svg
                                  className="w-[22px] h-[30px] shrink-0 text-[rgba(0,0,60,0.35)] fill-none"
                                  viewBox="0 0 22 30"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M1 0v18a8 8 0 0 0 8 8h13"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeDasharray="3 4"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="ml-1 px-[12px] py-[7px] rounded-[10px] border-[1.5px] border-dashed border-[rgba(0,0,60,0.30)] bg-white text-[12px] font-semibold text-[#00003C] flex items-center gap-1.5 shadow-2xs">
                                  <svg
                                    className="w-3.5 h-3.5 text-[#0033FF] stroke-current stroke-[2] fill-none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span>{item.example.branch.label}</span>
                                </div>
                              </div>

                              {/* Mobile Branch Chip */}
                              <div className="lg:hidden mt-[10px] w-full px-[12px] py-[8px] rounded-[10px] border-[1.5px] border-dashed border-[rgba(0,0,60,0.30)] bg-white text-[12px] font-semibold text-[#00003C] flex items-center gap-1.5">
                                <svg
                                  className="w-3.5 h-3.5 text-[#0033FF] stroke-current stroke-[2] fill-none shrink-0"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>
                                  Branch after step{" "}
                                  {item.example.branch.afterIndex + 1}:{" "}
                                  {item.example.branch.label}
                                </span>
                              </div>
                            </>
                          )}

                          {/* Caption */}
                          <p className="mt-[14px] text-[13px] leading-[1.6] text-[#5E5E73] font-normal">
                            {item.example.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default CapabilitiesIndex;

/* ========================================================================= */
/* SAMPLE / DEMO DATA (FOR TESTING / DEMONSTRATION PURPOSES ONLY)            */
/* ========================================================================= */
export const sampleCapabilitiesData: CapabilitiesIndexProps = {
  label: "WHAT'S INCLUDED",
  headline: "AI Application, Agent & Systems Engineering",
  headlineAccent: "Capabilities",
  intro:
    "Every build draws from the same core capabilities below, combined to match what you're trying to create.",
  items: [
    {
      title: "AI Application Development",
      body: "We design and develop complete software applications where AI is a core capability, not an add-on chat box, built around the end-to-end user experience and workflow your business actually needs.",
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
      example: {
        steps: [
          "RFQ Received",
          "Extract Specs",
          "Check History",
          "Draft Estimate",
        ],
        highlightIndex: 1,
        branch: { afterIndex: 1, label: "Flag missing technical spec" },
        caption:
          "Illustrative example: an AI quotation application that accepts an RFQ, extracts specifications, checks historical pricing, and prepares a draft estimate for review. This is illustrative of the kind of system we build, not a completed Zapledge project.",
      },
    },
    {
      title: "AI Agent Development",
      body: "We build controlled AI agents that reason over your data, use approved tools, and take actions within defined boundaries, with clear rules on what they can access and where human approval is required.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z" />
          <circle cx="9" cy="15" r="1" />
          <circle cx="15" cy="15" r="1" />
        </svg>
      ),
    },
    {
      title: "Generative AI Solutions",
      body: "Generative AI applied to your business content: documents, reports, responses, and knowledge, to accelerate reading, writing, summarizing, and analysis that would otherwise take hours.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
      example: {
        steps: ["Upload Report", "Extract Terms", "Risk Summary"],
        highlightIndex: 1,
        caption:
          "Illustrative example, relevant to WealthTech or FinTech businesses: extracting deadlines, terms, and risk factors from a lengthy contract or report into a structured summary for faster review. This is illustrative only.",
      },
    },
    {
      title: "Enterprise AI Systems",
      body: "Larger AI systems that connect departments, data sources, and applications, with security, role-based access, and shared intelligence built in from the start, not bolted on afterward.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      title: "AI System Integration",
      body: "We connect new AI capability to the systems you already rely on: ERP, CRM, databases, cloud platforms, IoT, or legacy software, so AI isn't isolated from the rest of your operations.",
      icon: (
        <svg viewBox="0 0 24 24">
          <rect x="2" y="2" width="8" height="8" rx="2" />
          <rect x="14" y="2" width="8" height="8" rx="2" />
          <rect x="14" y="14" width="8" height="8" rx="2" />
          <rect x="2" y="14" width="8" height="8" rx="2" />
        </svg>
      ),
    },
  ],
};
