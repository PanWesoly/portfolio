import React from 'react';
import SectionHeader from './SectionHeader';
import { educationData } from '../data/education';
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Edukacja"
          title="Wykształcenie"
          subtitle="Fundamenty akademickie, inżynieria oprogramowania oraz technologie sieciowe."
        />

        <div className="space-y-6">
          {educationData.map(edu => (
            <div
              key={edu.id}
              className="card-base rounded-2xl p-6 sm:p-7"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{edu.degree}</h3>
                    <p className="text-sm font-medium text-slate-300 mt-0.5">{edu.institution}</p>
                    {edu.honors && (
                      <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded bg-amber-950/50 text-amber-300 text-xs border border-amber-500/20">
                        <Award className="w-3 h-3 text-amber-400" />
                        <span>{edu.honors}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs text-slate-400 font-normal">
                  <span className="inline-flex items-center gap-1 bg-slate-900 border border-white/[0.06] px-2.5 py-1 rounded">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-900 border border-white/[0.06] px-2.5 py-1 rounded">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {edu.location}
                  </span>
                  <span className="text-slate-300 font-mono">GPA: {edu.gpa}</span>
                </div>

              </div>

              {/* Coursework list */}
              {edu.coursework && (
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    Główne przedmioty
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map(course => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-white/[0.06] text-xs font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
