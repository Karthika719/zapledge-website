import { principles } from '@/content/about';
import { CONTAINER, H2, INTRO, Rings } from './primitives';

export default function OurPrinciples() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="relative overflow-hidden bg-lavender py-20 lg:py-32"
      style={{
        backgroundImage:
          'radial-gradient(520px 420px at 12% 20%, rgba(0,51,255,0.07), transparent 70%), radial-gradient(520px 420px at 92% 85%, rgba(0,51,255,0.07), transparent 70%)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Rings diameters={[560, 880]} x="100%" y="0%" />
      </div>

      <div className={`${CONTAINER} relative`}>
        <h2 id="principles-heading" className={H2}>
          {principles.title}
        </h2>
        <p className={INTRO}>{principles.intro}</p>

        {/* Progress line, one ring per card column (desktop only) */}
        <div
          aria-hidden="true"
          className="relative mt-[72px] hidden h-px bg-[linear-gradient(90deg,rgba(0,51,255,0.5),rgba(0,51,255,0.12))] lg:grid lg:grid-cols-4 lg:gap-6"
        >
          {principles.items.map((item, i) => (
            <span key={item.number} className="relative">
              <span
                className={`absolute -top-1 left-7 size-[9px] rounded-full border-[1.5px] border-accent ${
                  i === principles.items.length - 1 ? 'bg-accent' : 'bg-lavender'
                }`}
              />
            </span>
          ))}
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-6">
          {principles.items.map((item) => (
            <li
              key={item.number}
              className="group flex flex-col gap-3 rounded-3xl border border-[rgba(0,0,60,0.07)] bg-white px-6 pt-7 pb-8 shadow-[0_16px_40px_rgba(0,0,60,0.05)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[rgba(0,51,255,0.3)] hover:shadow-[0_30px_60px_rgba(0,20,160,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:rounded-[28px] lg:px-7 lg:pt-8 lg:pb-9"
            >
              <span className="text-[13px] font-bold tracking-[0.08em] text-ink-muted transition-colors group-hover:text-accent">
                {item.number}
              </span>
              <h3 className="text-[23px] leading-[1.2] font-extrabold tracking-[-0.025em] text-navy">{item.title}</h3>
              <p className="text-base leading-[1.65] text-ink">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
