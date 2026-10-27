import React from 'react';

/**
 * Reusable Section Header Component
 * Clean, minimalist and highly readable typography.
 */
export default function SectionHeader({ badge, title, subtitle, alignment = "center" }) {
  const isCenter = alignment === "center";

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-slate-800/80 text-sky-300 border border-slate-700/60 mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
