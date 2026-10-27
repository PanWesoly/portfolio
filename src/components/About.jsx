import React from 'react';
import { CONFIG } from '../config';
import danielPhoto from '../assets/daniel.jpg';
import { Terminal, Code2, Layers, ArrowRight, FileCode2 } from 'lucide-react';

export default function About() {
  const { DEVELOPER } = CONFIG;
  const photoSrc = danielPhoto || DEVELOPER.avatar || '/avatar.jpg';

  return (
    <section id="about" className="pt-28 pb-16 md:pt-36 md:pb-24 bg-[#090a0f] relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 subtle-grid opacity-40 pointer-events-none" />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-sky-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Intro & Highlights */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-sm text-xs font-medium text-slate-300 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{DEVELOPER.status}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Programista Webowy & <span className="text-sky-400">Full-Stack</span>
            </h1>

            {/* Subtitle / Intro Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {DEVELOPER.tagline}
            </p>

            {/* Tech stack highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl card-base">
                <Code2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-200">HTML, JS & Next.js</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl card-base">
                <Terminal className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-200">Node.js, PHP & MySQL</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl card-base">
                <Layers className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-200">Python & Java</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-sky-600 hover:bg-sky-500 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>Zobacz Projekty</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>Skontaktuj się</span>
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Zobacz technologie"
              >
                <FileCode2 className="w-4 h-4" />
                <span>Technologie</span>
              </a>
            </div>

            {/* Metrics */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">Full-Stack</p>
                <p className="text-xs text-slate-400">Architektura & Kod</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">Clean Code</p>
                <p className="text-xs text-slate-400">Czytelność & Standardy</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">7+ Tech</p>
                <p className="text-xs text-slate-400">Kluczowe języki</p>
              </div>
            </div>

          </div>

          {/* Right Column: Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-2xl bg-[#111420] p-3 shadow-xl border border-white/[0.08]">
                
                {/* Photo frame */}
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 relative">
                  <img
                    src={photoSrc}
                    alt={`${DEVELOPER.name} - ${DEVELOPER.title}`}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent opacity-75" />

                  {/* Caption on Photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[11px] font-mono font-medium text-sky-400">daniel.dev</p>
                    <p className="text-lg font-bold">{DEVELOPER.name}</p>
                    <p className="text-xs text-slate-300">{DEVELOPER.title}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
