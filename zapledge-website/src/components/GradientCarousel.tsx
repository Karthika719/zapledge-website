"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

export type GradientCarouselItem = {
  number: string;
  title: string;
  body: string;
};

export type GradientCarouselProps = {
  label: string;
  headline: string;
  intro: string;
  items: GradientCarouselItem[];
};

// Soft light-blue highlight positions, varied per card so the surface feels organic.
const HIGHLIGHTS = [
  { x: 14, y: 64, angle: 205 },
  { x: 84, y: 38, angle: 160 },
  { x: 30, y: 70, angle: 215 },
  { x: 76, y: 60, angle: 190 },
  { x: 10, y: 46, angle: 225 },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const cardBackground = (i: number) => {
  const h = HIGHLIGHTS[i % HIGHLIGHTS.length];
  return [
    // Legibility wash behind the text at the bottom of the card
    "linear-gradient(180deg, rgba(0,0,60,0) 38%, rgba(0,0,60,0.7) 100%)",
    // Deep navy corner
    "radial-gradient(115% 80% at 0% 0%, rgba(0,0,60,0.96) 0%, rgba(0,0,60,0.6) 28%, rgba(0,0,60,0) 62%)",
    // Soft diagonal light streak
    `linear-gradient(${h.angle}deg, rgba(150,170,255,0) 32%, rgba(178,194,255,0.46) 50%, rgba(150,170,255,0) 70%)`,
    // Light-blue bloom
    `radial-gradient(95% 70% at ${h.x}% ${h.y}%, rgba(204,216,255,0.85) 0%, rgba(141,162,255,0.5) 30%, rgba(46,91,245,0) 70%)`,
    // Electric blue base
    "linear-gradient(155deg, #0B1A8F 0%, #1D3FE0 34%, #2E5BF5 60%, #3A63F0 80%, #1A3AD0 100%)",
  ].join(", ");
};

/* ------------------------------------------------------------------------- */
/* Motion engine                                                             */
/* ------------------------------------------------------------------------- */

export type MotionProfile = {
  spreadFactor: number; // horizontal spacing as a fraction of card width
  spreadVw: number; // minimum spacing as a fraction of stage width
  curve: number; // >1 pushes outer cards further out
  rotate: number; // degrees of Y rotation per card of distance
  rotateMax: number;
  depth: number; // px pushed back per card of distance
  scaleStep: number;
  perspective: number;
  msPerCard: number;
  shadeMax: number;
};

const CLASSIC: MotionProfile = {
  spreadFactor: 0.6,
  spreadVw: 0.15,
  curve: 1.35,
  rotate: 36,
  rotateMax: 62,
  depth: 150,
  scaleStep: 0.06,
  perspective: 1300,
  msPerCard: 2400,
  shadeMax: 0.62,
};
const classicProfile = () => CLASSIC;

const STEP_MS = 520;
const HOLD_AFTER_STEP_MS = 1400;
const TOUCH_RESUME_MS = 2500;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedServer = () => false;

export const useReducedMotion = () => useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

const mod = (a: number, n: number) => ((a % n) + n) % n;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
// Always moving, but slows near each card's centre so it can be read, then swoops to the next.
const rhythm = (f: number) => 0.25 * f + 0.75 * f * f * f * (f * (f * 6 - 15) + 10);
const easeOutCubic = (k: number) => 1 - Math.pow(1 - k, 3);
const canHover = () => window.matchMedia("(hover: hover)").matches;

export type GradientCarouselStageProps = {
  count: number;
  getTitle: (index: number) => string;
  renderCard: (index: number) => React.ReactNode;
  ariaLabel: string;
  /** Size, radius and shadow classes for each card slot. */
  cardClassName: string;
  /** Height classes for the 3D stage. */
  stageClassName: string;
  /** Motion settings for a given stage width; defaults to the classic profile at every size. */
  profile?: (stageWidth: number) => MotionProfile;
  /** Holds the carousel still, e.g. while a card is expanded. */
  paused?: boolean;
  onActiveChange?: (index: number) => void;
};

export const GradientCarouselStage: React.FC<GradientCarouselStageProps> = ({
  count: total,
  getTitle,
  renderCard,
  ariaLabel,
  cardClassName,
  stageClassName,
  profile = classicProfile,
  paused = false,
  onActiveChange,
}) => {
  const stageId = useId();
  const stageRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Animation state lives in refs so frames never trigger React renders.
  const pos = useRef(0); // continuous position in card units
  const speed = useRef(1); // 0..1, eased toward target for smooth resume
  const tween = useRef<{ from: number; to: number; start: number | null; hold?: boolean } | null>(null);
  const holdUntil = useRef(0);
  const pauses = useRef({
    hover: false,
    touch: false,
    focus: false,
    manual: false,
    offscreen: false,
    hidden: false,
    external: false,
  });
  const touchTimer = useRef<number | null>(null);
  const swipe = useRef<{ x: number } | null>(null);
  const swiped = useRef(false);
  const activeRef = useRef(0);
  const profileRef = useRef(profile);
  const currentProfile = useRef<MotionProfile>(CLASSIC);
  const onActiveChangeRef = useRef(onActiveChange);

  const [active, setActive] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);

  useEffect(() => {
    profileRef.current = profile;
    onActiveChangeRef.current = onActiveChange;
    pauses.current.external = paused;
  }, [profile, onActiveChange, paused]);

  const displayPos = () => {
    const u = pos.current;
    return tween.current ? u : Math.floor(u) + rhythm(u - Math.floor(u));
  };

  const layout = useCallback(
    (p: number) => {
      const stage = stageRef.current;
      const first = cardRefs.current[0];
      if (!stage || !first) return;
      const m = profileRef.current(stage.offsetWidth);
      currentProfile.current = m;
      stage.style.perspective = `${m.perspective}px`;
      const cardW = first.offsetWidth;
      const spread = Math.max(cardW * m.spreadFactor, stage.offsetWidth * m.spreadVw);
      const half = total / 2;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        let d = mod(i - p + half, total) - half; // signed distance from centre, wrapped
        if (total <= 2) d = i - p;
        const a = Math.abs(d);
        const x = Math.sign(d) * Math.pow(a, m.curve) * spread;
        const z = -a * m.depth;
        const rot = clamp(-d * m.rotate, -m.rotateMax, m.rotateMax);
        const scale = 1 - Math.min(a, 2.5) * m.scaleStep;
        const fade = clamp((half - a) / 0.35, 0, 1);

        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = fade.toFixed(3);
        card.style.zIndex = String(100 - Math.round(a * 10));
        card.style.pointerEvents = fade < 0.5 ? "none" : "";
        const shade = shadeRefs.current[i];
        if (shade) shade.style.opacity = clamp(a * 0.32, 0, m.shadeMax).toFixed(3);
      });

      const idx = mod(Math.round(p), total);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
        onActiveChangeRef.current?.(idx);
      }
    },
    [total],
  );

  // Place cards before first paint so they never flash stacked.
  useLayoutEffect(() => {
    layout(displayPos());
  }, [layout]);

  useEffect(() => {
    if (total < 2) return;
    const stage = stageRef.current;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const t = tween.current;
      if (t) {
        t.start ??= now;
        const k = clamp((now - t.start) / STEP_MS, 0, 1);
        pos.current = t.from + (t.to - t.from) * easeOutCubic(k);
        if (k >= 1) {
          pos.current = t.to;
          tween.current = null;
          if (t.hold) holdUntil.current = now + HOLD_AFTER_STEP_MS;
          speed.current = 0;
        }
      } else {
        const pz = pauses.current;
        const isPaused =
          pz.hover || pz.touch || pz.focus || pz.manual || pz.offscreen || pz.hidden || pz.external || now < holdUntil.current;
        if (isPaused) {
          const p = displayPos();
          const settled = Math.round(p);
          // Glide the nearest card to centre, then hold still.
          if (Math.abs(p - settled) > 0.001) tween.current = { from: p, to: settled, start: now };
          speed.current = 0;
        } else {
          speed.current += (1 - speed.current) * Math.min(1, dt / 260);
          pos.current += (dt / currentProfile.current.msPerCard) * speed.current;
        }
      }
      layout(displayPos());
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([entry]) => {
      pauses.current.offscreen = !entry.isIntersecting;
    });
    if (stage) io.observe(stage);
    const onVisibility = () => {
      pauses.current.hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);
    const onResize = () => layout(displayPos());
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      if (touchTimer.current) window.clearTimeout(touchTimer.current);
    };
  }, [total, layout]);

  const goTo = (target: number) => {
    const from = displayPos();
    tween.current = { from, to: target, start: null, hold: true };
  };
  const step = (dir: 1 | -1) => goTo(Math.round(displayPos()) + dir);
  const goToIndex = (i: number) => {
    const base = Math.round(displayPos());
    let diff = mod(i - mod(base, total), total);
    if (diff > total / 2) diff -= total;
    if (diff !== 0) goTo(base + diff);
  };

  const toggleManual = () => {
    pauses.current.manual = !pauses.current.manual;
    setManualPaused(pauses.current.manual);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX };
    swiped.current = false;
    if (e.pointerType !== "mouse") {
      if (touchTimer.current) window.clearTimeout(touchTimer.current);
      pauses.current.touch = true;
    }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const dx = swipe.current ? e.clientX - swipe.current.x : 0;
    swipe.current = null;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      step(dx < 0 ? 1 : -1);
    }
    if (e.pointerType !== "mouse") {
      touchTimer.current = window.setTimeout(() => {
        pauses.current.touch = false;
      }, TOUCH_RESUME_MS);
    }
  };
  // A swipe shouldn't also count as a tap on the card underneath.
  const onClickCapture = (e: React.MouseEvent) => {
    if (swiped.current) {
      swiped.current = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (total === 0) return null;

  return (
    <>
      {/* 3D stage: full-bleed so cards enter and leave past the viewport edges */}
      <div
        className="-mx-6 sm:-mx-8 md:-mx-12 lg:-mx-16"
        onMouseEnter={() => (pauses.current.hover = true)}
        onMouseLeave={() => (pauses.current.hover = false)}
        onFocus={() => (pauses.current.focus = true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) pauses.current.focus = false;
        }}
      >
        <ul
          id={stageId}
          ref={stageRef}
          aria-label={`${ariaLabel}, ${total} items`}
          aria-live="off"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
          className={`relative list-none m-0 p-0 select-none touch-pan-y outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-accent/20 ${stageClassName}`}
          style={{
            perspective: `${CLASSIC.perspective}px`,
            maskImage: "linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)",
          }}
        >
          {Array.from({ length: total }, (_, i) => (
            <li
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${getTitle(i)}`}
              onFocus={() => goToIndex(i)}
              onClickCapture={(e) => {
                // On touch, tapping a side card brings it to the centre instead of activating it.
                if (i !== activeRef.current && !canHover()) {
                  e.preventDefault();
                  e.stopPropagation();
                  goToIndex(i);
                }
              }}
              className={`absolute left-1/2 top-1/2 opacity-0 will-change-transform ${cardClassName}`}
            >
              {renderCard(i)}
              {/* Depth shade: darkens cards as they move away from centre */}
              <span
                aria-hidden="true"
                ref={(el) => {
                  shadeRefs.current[i] = el;
                }}
                className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] bg-navy opacity-0"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Controls */}
      {total > 1 && (
        <div className="relative max-w-7xl mx-auto mt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1" role="group" aria-label="Choose card">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToIndex(i)}
                aria-controls={stageId}
                aria-label={`Go to ${i + 1}: ${getTitle(i)}`}
                aria-current={i === active ? "true" : undefined}
                className="p-1.5 -m-0.5 flex items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-accent" : "w-1.5 bg-accent/25 hover:bg-accent/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-controls={stageId}
              aria-label="Previous"
              className="h-11 w-11 rounded-full border border-border-subtle bg-white text-navy flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={toggleManual}
              aria-controls={stageId}
              aria-label={manualPaused ? "Play carousel" : "Pause carousel"}
              aria-pressed={manualPaused}
              className="h-11 w-11 rounded-full border border-border-subtle bg-white text-navy flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              {manualPaused ? (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <rect x="6.5" y="5" width="4" height="14" rx="1" />
                  <rect x="13.5" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-controls={stageId}
              aria-label="Next"
              className="h-11 w-11 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-dark transition-colors"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ------------------------------------------------------------------------- */
/* Gradient card carousel                                                    */
/* ------------------------------------------------------------------------- */

const Card: React.FC<{ item: GradientCarouselItem; index: number; className?: string }> = ({
  item,
  index,
  className = "",
}) => (
  <article
    className={`relative h-full w-full rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col text-white ${className}`}
    style={{ background: cardBackground(index) }}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
      style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
    />
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15" />

    <div className="relative flex items-center gap-3">
      <span className="text-sm font-bold tracking-wider text-white/90 tabular-nums">{item.number}</span>
      <span className="h-px flex-1 bg-white/25" aria-hidden="true" />
    </div>

    <div className="relative mt-auto">
      <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug mb-2.5 [text-shadow:0_1px_12px_rgba(0,0,60,0.35)]">
        {item.title}
      </h3>
      <p className="text-sm sm:text-[15px] leading-relaxed text-white/90">{item.body}</p>
    </div>
  </article>
);

export const GradientCarousel: React.FC<GradientCarouselProps> = ({ label, headline, intro, items }) => {
  const reducedMotion = useReducedMotion();
  const headingId = useId();

  if (items.length === 0) return null;

  const header = (
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/5 border border-accent/15 mb-5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs font-bold tracking-wider text-accent uppercase">{label}</span>
        </div>
        <h2
          id={headingId}
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-navy tracking-tight leading-[1.15] mb-5"
        >
          {headline}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-text-secondary max-w-2xl mx-auto">{intro}</p>
      </div>
    </div>
  );

  // Static, fully readable fallback for reduced motion.
  if (reducedMotion) {
    return (
      <section
        aria-labelledby={headingId}
        className="w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 relative light-section-tint border-b border-border-subtle/80"
      >
        {header}
        <ul className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0">
          {items.map((item, i) => (
            <li key={item.number} className="h-[260px] sm:h-[280px]">
              <Card item={item} index={i} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      className="w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-8 md:px-12 lg:px-16 relative light-section-tint border-b border-border-subtle/80 overflow-hidden"
    >
      {header}
      <GradientCarouselStage
        count={items.length}
        getTitle={(i) => items[i].title}
        renderCard={(i) => <Card item={items[i]} index={i} />}
        ariaLabel={headline}
        cardClassName="w-[236px] h-[290px] sm:w-[264px] sm:h-[320px] lg:w-[284px] lg:h-[340px] rounded-3xl shadow-[0_24px_50px_-20px_rgba(0,0,60,0.55)]"
        stageClassName="h-[380px] sm:h-[420px] lg:h-[450px]"
      />
    </section>
  );
};

export default GradientCarousel;
