import React from 'react';
import SectionHeader from './SectionHeader';
import { achievementsData } from '../data/achievements';
import { Trophy, TrendingUp, Star, Zap } from 'lucide-react';

function BadgeIcon({ type, className = "w-3.5 h-3.5" }) {
  switch (type) {
    case 'star':
      return <Star className={`${className} text-amber-400 fill-amber-400`} />;
    case 'zap':
      return <Zap className={`${className} text-sky-400 fill-sky-400`} />;
    case 'trophy':
    default:
      return <Trophy className={`${className} text-amber-400`} />;
  }
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Wyróżnienia"
          title="Osiągnięcia i Wyniki"
          subtitle="Projekty o wysokiej wydajności, optymalizacje oraz zaangażowanie w jakość tworzonego oprogramowania."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map(item => (
            <div
              key={item.id}
              className="card-base rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-950/40 text-amber-300 border border-amber-500/20">
                    <BadgeIcon type={item.iconType} className="w-3.5 h-3.5" />
                    {item.badge}
                  </span>
                  <span className="text-xs text-slate-400">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-xs font-medium text-sky-400 mt-1">
                  {item.organization}
                </p>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Key Impact Metric */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-300 font-medium">
                <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Rezultat: <strong className="text-white font-semibold">{item.metrics}</strong></span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
