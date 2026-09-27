import { future } from '@/content/about';
import { H2, Rich, Rings } from './primitives';

export default function WhereWereGoing() {
  return (
    <section aria-labelledby="future-heading" className="bg-white p-3 md:p-6">
      <div
        className="relative mx-auto max-w-[1392px] overflow-hidden rounded-[28px] border border-[rgba(0,51,255,0.1)] bg-future-panel px-6 pt-16 pb-14 md:px-12 md:pt-24 md:pb-20 lg:rounded-[40px] lg:px-[72px] lg:pt-28 lg:pb-[104px]"
        style={{
          backgroundImage:
            'radial-gradient(620px 460px at 85% 10%, rgba(0,51,255,0.14), transparent 70%), radial-gradient(560px 420px at 5% 95%, rgba(92,124,255,0.12), transparent 70%)',
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Rings diameters={[620]} x="96%" y="4%" />
        </div>

        <div className="relative">
          <h2 id="future-heading" className={H2}>
            {future.title}
          </h2>
          <p className="mt-5 max-w-[980px] text-xl leading-normal font-medium text-ink md:mt-7 lg:text-[26px]">
            <Rich text={future.intro} />
          </p>

          <ol className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-3 lg:gap-0 lg:border-t lg:border-[rgba(0,0,60,0.12)]">
            {future.items.map((item) => (
              <li
                key={item.number}
                className="flex flex-col gap-2.5 border-t border-[rgba(0,0,60,0.12)] pt-6 lg:border-t-0 lg:border-l lg:border-[rgba(0,0,60,0.1)] lg:px-10 lg:pt-9 lg:pb-2 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="text-[13px] font-bold tracking-[0.08em] text-accent">{item.number}</span>
                <h3 className="text-[23px] leading-[1.2] font-extrabold tracking-[-0.025em] text-navy lg:text-[28px] lg:leading-[1.15]">
                  {item.title}
                </h3>
                <p className="text-base leading-[1.7] text-ink">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
