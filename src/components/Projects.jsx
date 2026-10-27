import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('Wszystkie');

  const categories = ['Wszystkie', ...Array.from(new Set(projectsData.map(p => p.category)))];

  const filteredProjects = filter === 'Wszystkie'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Portfolio"
          title="Wybrane Projekty i Realizacje"
          subtitle="Aplikacje webowe, serwisy internetowe oraz projekty zrealizowane z użyciem nowoczesnych technologii."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-sky-500 ${
                filter === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-300 border border-white/[0.06] hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom GitHub Archive Callout */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-slate-600 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
          >
            <span>Więcej projektów i kodu na GitHubie</span>
            <ArrowUpRight className="w-4 h-4 text-sky-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
