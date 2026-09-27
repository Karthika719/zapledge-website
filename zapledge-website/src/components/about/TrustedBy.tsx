import { trustedBy } from '@/content/about';
import { CONTAINER, Rich } from './primitives';

export default function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-heading"
      className="relative overflow-hidden bg-white py-20 lg:py-32"
      style={{ backgroundImage: 'radial-gradient(520px 360px at 0% 100%, rgba(0,51,255,0.07), transparent 70%)' }}
    >
      <div className={`${CONTAINER} grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-end lg:gap-6`}>
        <h2
          id="trusted-heading"
          className="text-[42px] leading-[1.04] font-extrabold tracking-[-0.04em] text-navy md:text-6xl lg:col-span-7 lg:text-[76px] lg:leading-[1.02]"
        >
          <Rich text={trustedBy.title} />
        </h2>
        <div className="lg:col-span-4 lg:col-start-9">
          <div aria-hidden="true" className="h-[3px] w-12 rounded-sm bg-accent" />
          <p className="mt-5 text-lg leading-[1.6] text-ink lg:mt-6 lg:text-[21px]">
            <Rich text={trustedBy.body} />
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-6 bottom-0 h-px bg-[rgba(0,0,60,0.08)] md:inset-x-12 lg:inset-x-24" />
    </section>
  );
}
