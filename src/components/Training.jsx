import React from 'react';
import SectionHeader from './SectionHeader';
import { trainingData } from '../data/training';
import { ShieldCheck, Calendar, Hash } from 'lucide-react';

export default function Training() {
  return (
    <section id="training" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Certyfikaty"
          title="Kursy i Szkolenia"
          subtitle="Ukończone warsztaty i szkolenia specjalistyczne z zakresu nowoczesnych technologii webowych."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingData.map(item => (
            <div
              key={item.id}
              className="card-base rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-sky-400">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {item.issuer}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-white/[0.06]">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.year}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mt-2">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Topics Tag List */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.topics.map(topic => (
                    <span
                      key={topic}
                      className="px-2.5 py-0.5 rounded text-xs font-mono text-slate-300 bg-slate-900 border border-white/[0.06]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credential ID */}
              <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Hash className="w-3 h-3 text-slate-400" />
                  {item.credentialId}
                </span>
                <span className="text-emerald-400 text-xs font-medium bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Zweryfikowany
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
