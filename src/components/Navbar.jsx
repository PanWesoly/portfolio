import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenGame }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracker for active navigation highlight
      const sections = CONFIG.NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg shadow-black/20'
          : 'bg-[#090a0f]/60 backdrop-blur-sm border-b border-white/[0.04] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#about"
            className="flex items-center gap-2.5 group text-white font-medium text-base tracking-tight focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
            aria-label="daniel.dev - Strona główna portfolio"
          >
            <span className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700/80 flex items-center justify-center text-sky-400 font-mono text-xs font-semibold group-hover:border-sky-500/50 transition-colors">
              &lt;/&gt;
            </span>
            <span className="flex items-center font-semibold text-slate-100 group-hover:text-white transition-colors">
              <span>daniel</span>
              <span className="text-sky-400">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/40 p-1 rounded-full border border-white/[0.05]" aria-label="Nawigacja główna">
            {CONFIG.NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                    isActive
                      ? 'text-white bg-slate-800 border border-white/10 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Tablet screen links */}
          <nav className="hidden md:flex xl:hidden items-center gap-2" aria-label="Nawigacja skrócona">
            <a href="#about" className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">O mnie</a>
            <a href="#projects" className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">Projekty</a>
            <a href="#skills" className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">Umiejętności</a>
            <a href="#experience" className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">Doświadczenie</a>
            <a href="#contact" className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors">Kontakt</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span>Kontakt</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={toggleMenu}
              className="xl:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#0d0f17] border-b border-white/[0.08] px-4 pt-3 pb-6 shadow-2xl">
          <nav className="flex flex-col space-y-1" aria-label="Nawigacja mobilna">
            {CONFIG.NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-slate-800 border border-white/10'
                      : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
