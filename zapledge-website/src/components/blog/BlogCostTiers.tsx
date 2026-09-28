import type { CostTier } from '@/content/blog';

export default function BlogCostTiers({ tiers }: { tiers: CostTier[] }) {
  if (!tiers || tiers.length === 0) return null;

  return (
    <div className="my-8 rounded-2xl bg-white border border-[#E5E5E5] p-6 sm:p-8">
      <div className="space-y-6">
        {tiers.map((tier, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#00003C]">
                  {tier.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555]">
                  {tier.description}
                </p>
              </div>
              <span className="text-base sm:text-lg font-extrabold text-[#0033FF] whitespace-nowrap self-start sm:self-center">
                {tier.range}
              </span>
            </div>

            {/* Visual Range Bar */}
            <div className="w-full bg-[#FAFAFA] border border-[#E5E5E5]/80 h-3 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#0033FF,#5C7CFF)] transition-all duration-700"
                style={{ width: `${tier.percentage}%` }}
                role="progressbar"
                aria-valuenow={tier.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Axis Scale Markers */}
      <div className="mt-6 pt-4 border-t border-[#E5E5E5]/70 flex justify-between text-[11px] font-bold text-[#555555] tracking-wider uppercase">
        <span>₹0</span>
        <span>₹5L</span>
        <span>₹10L</span>
        <span>₹15L</span>
        <span>₹20L</span>
        <span>₹25L+</span>
      </div>
    </div>
  );
}
