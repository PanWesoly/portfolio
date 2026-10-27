import React, { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Training from './components/Training';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SnakeGameModal from './components/SnakeGameModal';
import { CONFIG } from './config';

export default function App() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleOpenGame = () => {
    if (CONFIG.ENABLE_GAME) {
      setIsGameOpen(true);
    }
  };

  const handleCloseGame = () => {
    setIsGameOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-200">
      {/* Navigation */}
      <Navbar onOpenGame={handleOpenGame} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Training />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Retro Game Modal (if enabled in config) */}
      {CONFIG.ENABLE_GAME && (
        <SnakeGameModal
          isOpen={isGameOpen}
          onClose={handleCloseGame}
        />
      )}
    </div>
  );
}
