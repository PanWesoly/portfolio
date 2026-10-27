import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { skillsData } from '../data/skills';
import { Check, Layers, Smartphone, Globe, Sparkles, Cpu, Wrench } from 'lucide-react';
import { 
  SiNextdotjs, 
  SiJavascript, 
  SiHtml5, 
  SiTailwindcss, 
  SiReact, 
  SiNodedotjs, 
  SiPhp, 
  SiPython, 
  SiMysql, 
  SiGithub, 
  SiExpress 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';

// Helper component for technology icons
function SkillIcon({ iconKey, className = "w-4 h-4" }) {
  switch (iconKey) {
    case 'nextjs':
      return <SiNextdotjs className={`${className} text-slate-100`} />;
    case 'javascript':
      return <SiJavascript className={`${className} text-amber-400`} />;
    case 'html5':
      return <SiHtml5 className={`${className} text-orange-400`} />;
    case 'tailwind':
      return <SiTailwindcss className={`${className} text-sky-400`} />;
    case 'react':
      return <SiReact className={`${className} text-sky-400`} />;
    case 'responsive':
      return <Smartphone className={`${className} text-slate-300`} />;
    case 'nodejs':
      return <SiNodedotjs className={`${className} text-emerald-400`} />;
    case 'php':
      return <SiPhp className={`${className} text-indigo-400`} />;
    case 'python':
      return <SiPython className={`${className} text-sky-400`} />;
    case 'java':
      return <FaJava className={`${className} text-red-400`} />;
    case 'api':
      return <Globe className={`${className} text-teal-400`} />;
    case 'express':
      return <SiExpress className={`${className} text-slate-300`} />;
    case 'database':
      return <SiMysql className={`${className} text-sky-400`} />;
    case 'github':
      return <SiGithub className={`${className} text-slate-200`} />;
    case 'cleancode':
      return <Sparkles className={`${className} text-amber-400`} />;
    case 'problem':
      return <Cpu className={`${className} text-sky-400`} />;
    case 'tools':
      return <Wrench className={`${className} text-slate-300`} />;
    default:
      return <Layers className={`${className} text-slate-300`} />;
  }
}

export default function Skills() {
  const [selectedGroup, setSelectedGroup] = useState('Wszystkie');

  const categories = ['Wszystkie', ...skillsData.map(s => s.category)];

  const filteredSkills = selectedGroup === 'Wszystkie' 
    ? skillsData 
    : skillsData.filter(s => s.category === selectedGroup);

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Technologie"
          title="Umiejętności i Narzędzia"
          subtitle="Zestaw technologii wykorzystywanych w codziennej pracy nad aplikacjami webowymi."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedGroup(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-sky-500 ${
                selectedGroup === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-300 border border-white/[0.06] hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((group) => (
            <div
              key={group.category}
              className="card-base rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                    <Layers className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {group.category}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed font-normal">
                  {group.description}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/[0.06] text-slate-200 text-xs font-medium"
                    >
                      <SkillIcon iconKey={skill.iconKey} className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{skill.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 pl-1 border-l border-slate-800">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Praktyczna znajomość i ciągły rozwój</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
