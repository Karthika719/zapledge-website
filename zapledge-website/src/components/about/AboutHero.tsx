import { hero } from '@/content/about';
import ClarityBand from './ClarityBand';
import { CONTAINER, EyebrowPill, PrimaryCta, Rich, Rings } from './primitives';

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-lavender pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
      style={{
        backgroundImage:
          'radial-gradient(640px 420px at 50% 42%, rgba(0,51,255,0.10), transparent 70%), radial-gradient(420px 360px at 6% 70%, rgba(0,51,255,0.07), transparent 70%), radial-gradient(460px 360px at 96% 18%, rgba(92,124,255,0.08), transparent 70%)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Rings diameters={[720, 1120, 1560]} y="44%" />
      </div>

      <div className={`${CONTAINER} relative flex flex-col items-center`}>
        <EyebrowPill>{hero.eyebrow}</EyebrowPill>
        <h1
          id="about-heading"
          className="mt-6 max-w-4xl text-center text-4xl leading-[1.12] font-extrabold tracking-tight text-navy sm:mt-8 sm:text-5xl lg:text-6xl"
        >
          <Rich text={hero.title} />
        </h1>

        <ClarityBand />

        <p className="mt-8 max-w-3xl text-left text-base leading-relaxed text-ink sm:text-[16.5px] md:text-center">{hero.body}</p>

        <PrimaryCta href={hero.cta.href} className="mt-8 w-full md:w-auto">
          {hero.cta.label}
        </PrimaryCta>
      </div>
    </section>
  );
}
