import Link from 'next/link';

/**
 * Dedicated bottom CTA section replacing the Let's Talk section.
 * Rendered as the last section inside the `data-reveal-curtain` wrapper.
 */
export default function AccurateNumberCTA() {
  return (
    <section
      id="get-accurate-number"
      aria-labelledby="accurate-number-heading"
      className="w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 relative bg-white bg-[radial-gradient(90%_80%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] md:bg-[radial-gradient(70%_90%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)] lg:bg-[radial-gradient(55%_90%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)]"
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center md:gap-5">
        <h2
          id="accurate-number-heading"
          className="m-0 text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#00003C] md:text-[38px] md:leading-[1.12] md:tracking-[-0.03em] lg:text-[44px] lg:leading-[1.1]"
        >
          Get an Accurate Number for Your Business
        </h2>

        <p className="m-0 max-w-[680px] text-[15.5px] leading-[1.7] text-[#555555] md:text-base lg:text-[17px]">
          If you&apos;re trying to figure out what a specific project would actually cost for your business,
          the fastest way to find out is to map the workflow itself. That&apos;s exactly where{' '}
          <a
            href="https://buildit3.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0033FF] font-semibold underline underline-offset-2 hover:text-[#0022CC]"
          >
            Zapledge
          </a>{' '}
          starts, with a free consultation to understand your actual bottleneck before any number gets discussed.
        </p>

        <Link
          href="/contact"
          className="mt-3 w-full rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] px-8 py-[17px] text-center text-base font-bold text-white transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0033FF] sm:w-auto md:px-9 md:py-[18px]"
        >
          Request a Free Consultation →
        </Link>
      </div>
    </section>
  );
}
