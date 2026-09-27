import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-[#0033FF]/20 border-t-[#0033FF] rounded-full animate-spin" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
          Loading...
        </span>
      </div>
    </div>
  );
}

