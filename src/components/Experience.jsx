import React from 'react';
import SectionHeader from './SectionHeader';
import { experienceData } from '../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Kariera"
          title="Doświadczenie Zawodowe"
          subtitle="Projekty komercyjne, integracje systemowe oraz tworzenie aplikacji."
        />

        {/* Timeline Layout */}
        <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-10">
          {experienceData.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shadow-md">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              </div>

              {/* Experience Card */}
              <div className="card-base rounded-2xl p-6 sm:p-7">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-sky-400">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-white/[0.06]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-white/[0.06]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Job Description */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Bullet Highlights */}
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-1.5">
                  {item.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-900 text-slate-300 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
