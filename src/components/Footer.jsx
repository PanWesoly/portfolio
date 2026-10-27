import React from 'react';
import { CONFIG } from '../config';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080e] text-slate-400 py-12 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-sky-400 font-mono font-bold text-xs flex items-center justify-center">
              &lt;/&gt;
            </span>
            <div>
              <p className="text-white font-medium text-sm tracking-tight">
                daniel<span className="text-sky-400">.dev</span>
              </p>
              <p className="text-xs text-slate-400">{CONFIG.DEVELOPER.title}</p>
            </div>
          </div>

          {/* Quick Nav in Footer */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400" aria-label="Nawigacja w stopce">
            {CONFIG.NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="Wróć na górę strony"
          >
            <span>Do góry</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        {/* Copyright & Subtext */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {CONFIG.DEVELOPER.name}. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-slate-400">
            Portfolio programisty stron i aplikacji internetowych.
          </p>
        </div>

      </div>
    </footer>
  );
}
