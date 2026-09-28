export default function BlogKeyTakeaways({ takeaways }: { takeaways: string[] }) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <section
      id="key-takeaways"
      aria-labelledby="key-takeaways-heading"
      className="scroll-mt-28 my-10 bg-white rounded-2xl border border-[#E5E5E5] p-6 sm:p-8"
    >
      <h2
        id="key-takeaways-heading"
        className="text-2xl sm:text-[26px] font-extrabold text-[#00003C] tracking-tight mb-5"
      >
        Key Takeaways
      </h2>
      <ul className="space-y-4">
        {takeaways.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3.5">
            <span
              className="h-6 w-6 rounded-full bg-[#0033FF]/10 text-[#0033FF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"
              aria-hidden="true"
            >
              {idx + 1}
            </span>
            <span className="text-[16px] text-[#333333] leading-relaxed font-normal">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
