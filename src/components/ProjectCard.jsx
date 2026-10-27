import React from 'react';
import { ExternalLink, Github, Clock, Star } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { title, category, summary, image, tags, liveDemoUrl, repoUrl, featured, comingSoon } = project;

  return (
    <article className="card-base rounded-2xl overflow-hidden flex flex-col h-full group">
      
      {/* Project Image Frame */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={`Podgląd projektu ${title}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out opacity-90"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111420] via-transparent to-transparent opacity-80" />

        {/* Category & Status Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#090a0f]/90 backdrop-blur-md text-slate-200 border border-white/10 shadow-sm">
            {category}
          </span>
          {comingSoon ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-500/30">
              <Clock className="w-3 h-3 text-amber-400" />
              W przygotowaniu
            </span>
          ) : featured ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-sky-950/80 text-sky-300 border border-sky-500/30">
              <Star className="w-3 h-3 text-sky-400" />
              Wyróżniony
            </span>
          ) : null}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
            {title}
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            {summary}
          </p>

          {/* Technology Badges */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-900/90 text-slate-300 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions / Live Demo */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          {comingSoon ? (
            <div className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm text-slate-400 bg-slate-900/50 border border-slate-800 cursor-default">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Wkrótce dostępne</span>
            </div>
          ) : (
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm text-white bg-sky-600 hover:bg-sky-500 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label={`Otwórz demo projektu ${title}`}
            >
              <span>Zobacz Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Code Repo link */}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label={`Zobacz kod na GitHub dla ${title}`}
              title="Kod źródłowy"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>

    </article>
  );
}
