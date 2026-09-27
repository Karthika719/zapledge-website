import Link from "next/link";

/**
 * Let's Talk — compact CTA band.
 * Render it as the LAST section inside the `data-reveal-curtain` wrapper
 * (see layout.tsx) so its rounded bottom edge lifts off the navy footer.
 */
export default function HomeCTASection() {
  return (
    <section
      id="lets-talk"
      aria-labelledby="lets-talk-title"
      className="bg-[#FAFAFA] bg-[radial-gradient(90%_80%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] px-6 pt-16 pb-[72px] md:bg-[radial-gradient(70%_90%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] md:px-14 md:pt-[88px] md:pb-24 lg:bg-[radial-gradient(55%_90%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] lg:px-24 lg:pt-[104px] lg:pb-28"
    >
      <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 text-center md:gap-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-3.5 py-[7px] md:px-4 md:py-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0033FF]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#00003C] md:text-xs">
            Let&apos;s Talk
          </span>
        </div>

        <h2
          id="lets-talk-title"
          className="m-0 text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#00003C] md:text-[38px] md:leading-[1.12] md:tracking-[-0.03em] lg:text-[46px] lg:leading-[1.1]"
        >
          Talk to Zapledge About Your AI Opportunity
        </h2>

        <p className="m-0 max-w-[540px] text-[15px] leading-[1.65] text-[#555555] md:text-base lg:max-w-[620px] lg:text-[17px]">
          Whether you have a specific AI requirement or simply want to understand where AI could help
          your business, book a free consultation with our team to explore the right AI opportunity
          for you.
        </p>

        <Link
          href="/contact"
          className="mt-2 w-full rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] px-6 py-[17px] text-center text-base font-bold text-white transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0033FF] sm:w-auto md:px-9 md:py-[18px] lg:px-[38px]"
        >
          Get Free Consultation
        </Link>
      </div>
    </section>
  );
}