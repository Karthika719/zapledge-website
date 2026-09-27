import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full bg-white min-h-[75vh] pt-32 pb-24 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-5xl font-extrabold text-[#0033FF] mb-4 block">404</span>
        <h1 className="text-2xl font-bold text-[#00003C] mb-2">Page Not Found</h1>
        <p className="text-sm text-[#555555] mb-6 leading-relaxed">
          The requested page could not be located. It may have been moved, renamed, or is currently under development.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0033FF] hover:bg-[#0022CC] text-white text-sm font-semibold transition-all duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
