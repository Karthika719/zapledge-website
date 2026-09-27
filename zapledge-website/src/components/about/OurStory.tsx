import { story } from '@/content/about';
import { CONTAINER, H2, INTRO, Rich } from './primitives';
import { ConnectedOps, ResearchLens } from './StoryIllustrations';

const H3 = 'text-[28px] leading-[1.15] font-extrabold tracking-[-0.025em] text-navy lg:text-[38px] lg:leading-[1.1]';
const BODY = 'mt-4 text-base leading-[1.7] text-ink lg:mt-5 lg:text-[17px] lg:leading-[1.75]';
const CARD =
  'rounded-[22px] border border-[rgba(0,0,60,0.07)] bg-white p-3.5 shadow-[0_30px_70px_rgba(0,0,60,0.08)] lg:rounded-[28px] lg:p-6';

export default function OurStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="bg-[linear-gradient(180deg,#F3F5FF_0,#FFFFFF_220px)] py-20 lg:py-32"
    >
      <div className={CONTAINER}>
        <h2 id="story-heading" className={H2}>
          {story.title}
        </h2>
        <p className={INTRO}>
          <Rich text={story.intro} />
        </p>

        <div className="mt-14 grid grid-cols-1 items-center gap-6 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className={H3}>
              <Rich text={story.research.title} />
            </h3>
            <p className={BODY}>
              <Rich text={story.research.body} />
            </p>
          </div>
          <div className={`${CARD} lg:col-span-7`}>
            <ResearchLens />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-6 lg:mt-28 lg:grid-cols-12">
          {/* Text first in the DOM so mobile reads heading → body → illustration */}
          <div className="lg:order-2 lg:col-span-5 lg:pl-4">
            <h3 className={H3}>
              <Rich text={story.elevate.title} />
            </h3>
            <p className={BODY}>
              <Rich text={story.elevate.body} />
            </p>
          </div>
          <div className={`${CARD} lg:order-1 lg:col-span-7`}>
            <ConnectedOps />
          </div>
        </div>
      </div>
    </section>
  );
}
