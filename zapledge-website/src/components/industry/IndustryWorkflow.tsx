import React from 'react';

export interface WorkflowStep {
  title: string;
  body: string;
  /** Conceptual visual shown at the top of the card. */
  visual: React.ReactNode;
}

export interface IndustryWorkflowProps {
  title: string;
  intro: string;
  steps: WorkflowStep[];
  /** Unique per page if more than one workflow renders on a page. */
  id?: string;
}

const num = (i: number) => String(i + 1).padStart(2, '0');

/* Content-driven step grid: 1 col mobile, 2 tablet, 3 desktop. Visuals share a fixed
   height and rows stretch, so cards read as one even size. Hover and
   focus lift is CSS-only and disabled under prefers-reduced-motion. */
export const IndustryWorkflow: React.FC<IndustryWorkflowProps> = ({
  title,
  intro,
  steps,
  id = 'industry-workflow',
}) => (
  <section
    aria-labelledby={`${id}-heading`}
    className="w-full bg-[#FAFAFA] text-[#00003C] px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 border-b border-[#E5E5E5]/80"
  >
    <div className="max-w-6xl mx-auto">
      <div className="max-w-3xl mb-10 lg:mb-12">
        <h2
          id={`${id}-heading`}
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.15] mb-4"
        >
          {title}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-[#555555]">{intro}</p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch list-none p-0 m-0">
        {steps.map((s, i) => (
          <li key={s.title} className="flex">
            <article
              tabIndex={0}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className="wf-card group w-full rounded-2xl border border-[#E5E5E5] bg-white p-6 sm:p-7 shadow-sm outline-none transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] hover:border-[#0033FF]/40 hover:shadow-[0_12px_30px_-4px_rgba(0,51,255,0.10)] focus-visible:-translate-y-1 focus-visible:scale-[1.015] focus-visible:border-[#0033FF]/50 focus-visible:ring-2 focus-visible:ring-[#0033FF]/25 active:border-[#0033FF]/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100"
            >
              <div className="rounded-xl bg-[#F3F5FF] border border-[#0033FF]/10 p-3 h-[132px] flex flex-col justify-center">{s.visual}</div>
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs font-bold tracking-wider text-[#0033FF] tabular-nums">{num(i)}</span>
                <span aria-hidden="true" className="h-px w-6 bg-[#0033FF]/30 transition-[width] duration-300 group-hover:w-10 group-focus-visible:w-10 motion-reduce:transition-none" />
              </div>
              <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight leading-snug">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#555555]">{s.body}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default IndustryWorkflow;
