import { testimonial } from '@/content/about';
import { CONTAINER, EyebrowPill, Rich, Rings } from './primitives';

export default function Testimonial() {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative overflow-hidden bg-lavender py-20 lg:py-32"
      style={{ backgroundImage: 'radial-gradient(640px 420px at 50% 50%, rgba(0,51,255,0.08), transparent 70%)' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Rings diameters={[760, 1100]} />
      </div>

      <div className={`${CONTAINER} relative flex flex-col items-start md:items-center md:text-center`}>
        <EyebrowPill as="h2" id="testimonial-heading">
          {testimonial.title}
        </EyebrowPill>
        <figure className="mt-8 flex flex-col items-start md:mt-10 md:items-center">
          <blockquote className="max-w-[1060px] text-[27px] leading-[1.3] font-bold tracking-[-0.025em] text-balance text-navy md:text-4xl lg:text-[44px]">
            <p>
              <Rich text={testimonial.quote} />
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4 md:mt-11">
            <span aria-hidden="true" className="h-0.5 w-10 shrink-0 bg-accent" />
            <span className="text-base leading-[1.4] md:text-[17px]">
              <span className="font-bold text-navy">{testimonial.role}</span>
              <span className="font-medium text-ink">{testimonial.company}</span>
            </span>
            <span aria-hidden="true" className="hidden h-0.5 w-10 shrink-0 bg-accent md:block" />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
