export default function BlogQuickAnswer({ text }: { text: string }) {
  return (
    <aside
      id="quick-answer"
      aria-label="Quick Answer"
      className="scroll-mt-28 my-8 rounded-2xl bg-[#00003C] p-6 sm:p-8 text-white shadow-xl shadow-[#00003C]/10 border border-[#0033FF]/30 relative overflow-hidden"
    >
      <div
        className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#0033FF]/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0033FF]/30 px-3 py-1 mb-4 border border-[#0033FF]/40">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5C7CFF] animate-pulse" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Quick Answer
          </span>
        </div>
        <p className="text-base sm:text-[17px] leading-relaxed text-white/95 font-medium">
          {text}
        </p>
      </div>
    </aside>
  );
}
