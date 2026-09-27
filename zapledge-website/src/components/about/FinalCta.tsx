import { finalCta } from '@/content/about';
import { PrimaryCta, Rich } from './primitives';

/** Last section inside the layout's curtain; the existing footer reveals beneath it. */
export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-off-white px-6 pt-16 pb-[72px] md:px-12 lg:px-24 lg:pt-[104px] lg:pb-28"
      style={{ backgroundImage: 'radial-gradient(55% 90% at 50% 0%, rgba(0,51,255,0.12), transparent 70%)' }}
    >
      <div className="mx-auto flex max-w-[360px] flex-col items-center gap-6 text-center md:max-w-[1040px]">
        <h2
          id="final-cta-heading"
          className="text-[30px] leading-[1.15] font-extrabold tracking-[-0.035em] text-navy md:text-[44px] lg:text-[56px] lg:leading-[1.08]"
        >
          <Rich text={finalCta.title} />
        </h2>
        <p className="max-w-[720px] text-lg leading-[1.7] text-text-secondary">{finalCta.body}</p>
        <PrimaryCta href={finalCta.cta.href} className="mt-2 w-full md:w-auto">
          {finalCta.cta.label}
        </PrimaryCta>
      </div>
    </section>
  );
}
