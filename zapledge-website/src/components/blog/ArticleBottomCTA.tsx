import Link from 'next/link';

interface CtaProps {
  title: string;
  body: string;
  buttonText: string;
  buttonHref: string;
}

export default function ArticleBottomCTA({ cta }: { cta: CtaProps }) {
  return (
    <section
      id="cta-section"
      aria-labelledby="bottom-cta-heading"
      className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-16 relative bg-white bg-[radial-gradient(90%_80%_at_50%_0%,rgba(0,51,255,0.12),rgba(0,51,255,0)_70%)]"
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-4 text-center md:gap-5">
        <h2
          id="bottom-cta-heading"
          className="m-0 text-[28px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#00003C] md:text-[36px] md:leading-[1.12] md:tracking-[-0.03em] lg:text-[42px] lg:leading-[1.1]"
        >
          {cta.title}
        </h2>

        <p className="m-0 max-w-[680px] text-[15.5px] leading-[1.7] text-[#555555] md:text-base lg:text-[17px]">
          {cta.body.includes('Zapledge') ? (
            <>
              {cta.body.split('Zapledge')[0]}
              <a
                href="https://buildit3.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0033FF] font-semibold underline underline-offset-2 hover:text-[#0022CC]"
              >
                Zapledge
              </a>
              {cta.body.split('Zapledge')[1]}
            </>
          ) : (
            cta.body
          )}
        </p>

        <Link
          href={cta.buttonHref}
          className="mt-3 w-full rounded-full bg-[linear-gradient(90deg,#0033FF,#00003C)] px-8 py-[17px] text-center text-base font-bold text-white transition-[opacity,transform] duration-200 hover:-translate-y-px hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0033FF] sm:w-auto md:px-9 md:py-[18px]"
        >
          {cta.buttonText}
        </Link>
      </div>
    </section>
  );
}
