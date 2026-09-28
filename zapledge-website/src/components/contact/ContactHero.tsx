import { outfitFont } from './shared';

export function ContactHero() {
  return (
    <section className="px-5 pt-28 sm:pt-32 md:px-10 xl:px-16 xl:pt-36">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 md:gap-10 xl:grid-cols-[1.3fr_1fr] xl:items-end xl:gap-16">
        <div>
          <span
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/18 bg-accent/7 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span
                aria-hidden="true"
                className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            GET IN TOUCH
          </span>

          <h1 className={`mt-5 md:mt-6 ${outfitFont} text-[64px] leading-[0.98] tracking-[-0.045em] text-navy md:text-[84px] xl:whitespace-nowrap xl:text-[128px]`}>
            <span className="font-light">Contact </span>
            <span className="font-medium text-accent">Us</span>
          </h1>
        </div>

        <div>
          <p className={`${outfitFont} text-[20px] font-light leading-[1.45] text-text-secondary md:text-[22px] xl:text-[24px]`}>
            Email or complete the form to learn how{' '}
            <span className="font-medium text-navy">Zapledge International Pvt Ltd</span> can support your
            business.
          </p>
        </div>
      </div>
    </section>
  );
}
