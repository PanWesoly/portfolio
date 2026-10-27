import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CONFIG } from '../config';
import { X, Play, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Gamepad2 } from 'lucide-react';

const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = 18; // 18px per cell (360x360 canvas)
const INITIAL_SPEED = 120; // ms per tick

const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving Up

export default function SnakeGameModal({ isOpen, onClose }) {
  // If game is disabled via config, do not render modal
  if (!CONFIG.ENABLE_GAME || !isOpen) return null;

  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('snake_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // References for mutable game loop state to prevent stale closures
  const stateRef = useRef({
    snake: INITIAL_SNAKE,
    direction: INITIAL_DIRECTION,
    nextDirection: INITIAL_DIRECTION,
    food: { x: 5, y: 5 },
    score: 0,
    isGameOver: false,
    isPaused: false,
    hasStarted: false,
  });

  // Generate random food position not on snake
  const generateFood = useCallback((currentSnake) => {
    while (true) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const onSnake = currentSnake.some(segment => segment.x === x && segment.y === y);
      if (!onSnake) {
        return { x, y };
      }
    }
  }, []);

  // Reset Game
  const resetGame = useCallback(() => {
    const startSnake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    const newFood = generateFood(startSnake);
    setSnake(startSnake);
    setDirection(INITIAL_DIRECTION);
    setFood(newFood);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setHasStarted(true);

    stateRef.current = {
      snake: startSnake,
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      food: newFood,
      score: 0,
      isGameOver: false,
      isPaused: false,
      hasStarted: true,
    };
  }, [generateFood]);

  // Handle directional input
  const changeDirection = useCallback((newDir) => {
    const current = stateRef.current.direction;
    // Prevent 180-degree immediate reversal into oneself
    if (current.x + newDir.x === 0 && current.y + newDir.y === 0) {
      return;
    }
    stateRef.current.nextDirection = newDir;
    if (!stateRef.current.hasStarted) {
      stateRef.current.hasStarted = true;
      setHasStarted(true);
    }
  }, []);

  // Keyboard navigation & Esc listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection({ x: 1, y: 0 });
          break;
        case ' ':
          e.preventDefault();
          if (stateRef.current.isGameOver) {
            resetGame();
          } else {
            setIsPaused(p => !p);
            stateRef.current.isPaused = !stateRef.current.isPaused;
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, changeDirection, resetGame]);

  // Main Game Loop Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const state = stateRef.current;
      if (!state.hasStarted || state.isGameOver || state.isPaused) {
        return;
      }

      state.direction = state.nextDirection;
      const head = state.snake[0];
      const newHead = {
        x: head.x + state.direction.x,
        y: head.y + state.direction.y,
      };

      // Wall Collision Check
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        state.isGameOver = true;
        setIsGameOver(true);
        return;
      }

      // Self Collision Check
      if (state.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        state.isGameOver = true;
        setIsGameOver(true);
        return;
      }

      const newSnake = [newHead, ...state.snake];

      // Food Eaten Check
      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        const newScore = state.score + 10;
        state.score = newScore;
        setScore(newScore);

        if (newScore > highScore) {
          setHighScore(newScore);
          try {
            localStorage.setItem('snake_high_score', newScore.toString());
          } catch {
            // ignore localStorage quota errors
          }
        }

        const newFood = generateFood(newSnake);
        state.food = newFood;
        setFood(newFood);
      } else {
        newSnake.pop(); // Remove tail segment
      }

      state.snake = newSnake;
      setSnake(newSnake);
      setDirection(state.direction);
    }, INITIAL_SPEED);

    return () => clearInterval(interval);
  }, [highScore, generateFood]);

  // Render on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Background (Retro deep dark violet-slate)
    ctx.fillStyle = '#0a0c14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Grid Lines
    ctx.strokeStyle = '#181b2e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw Food (Pulsing Berry Glow)
    const fx = food.x * CELL_SIZE;
    const fy = food.y * CELL_SIZE;
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(fx + CELL_SIZE / 2, fy + CELL_SIZE / 2, CELL_SIZE / 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Draw Snake
    snake.forEach((seg, index) => {
      const sx = seg.x * CELL_SIZE;
      const sy = seg.y * CELL_SIZE;

      if (index === 0) {
        // Snake Head (Vibrant Purple)
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.roundRect(sx + 1, sy + 1, CELL_SIZE - 2, CELL_SIZE - 2, 4);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(sx + 5, sy + 5, 2, 0, Math.PI * 2);
        ctx.arc(sx + CELL_SIZE - 5, sy + 5, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Snake Body Gradient
        ctx.fillStyle = index % 2 === 0 ? '#c084fc' : '#9333ea';
        ctx.beginPath();
        ctx.roundRect(sx + 1.5, sy + 1.5, CELL_SIZE - 3, CELL_SIZE - 3, 3);
        ctx.fill();
      }
    });
  }, [snake, food]);

  // Touch Swipe Gesture Handlers
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return; // Small tap ignore

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) changeDirection({ x: 1, y: 0 }); // Right
      else changeDirection({ x: -1, y: 0 }); // Left
    } else {
      if (dy > 0) changeDirection({ x: 0, y: 1 }); // Down
      else changeDirection({ x: 0, y: -1 }); // Up
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a0c14]/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
    >
      <div className="bg-[#111422] border border-purple-500/30 text-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative flex flex-col items-center shadow-purple-950/40">
        
        {/* Top Header Row with Skip Button & Close Button */}
        <div className="w-full flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <h3 id="game-modal-title" className="text-base sm:text-lg font-bold text-white">
              Retro Snake Arcade
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Prominent Skip Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#15192c] hover:bg-[#1a1f38] text-slate-200 border border-purple-500/30 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="Pomiń grę i przejdź do portfolio"
            >
              Pomiń grę / Przejdź do portfolio
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#15192c] transition-colors"
              aria-label="Zamknij grę"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score Board */}
        <div className="w-full flex items-center justify-between px-3 py-2 bg-[#0a0c14] rounded-xl border border-slate-800 text-xs sm:text-sm font-semibold mb-3">
          <div className="flex items-center gap-1.5 text-purple-400">
            <span>Wynik:</span>
            <span className="text-base font-extrabold text-white">{score}</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-400">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Rekord:</span>
            <span className="text-base font-extrabold text-white">{highScore}</span>
          </div>
        </div>

        {/* Canvas Game Area */}
        <div
          className="relative rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-inner bg-[#0a0c14] touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="block"
          />

          {/* Overlay when not started / paused / game over */}
          {(!hasStarted || isGameOver || isPaused) && (
            <div className="absolute inset-0 bg-[#0a0c14]/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
              {isGameOver ? (
                <>
                  <p className="text-xl font-extrabold text-rose-400 mb-1">Koniec Gry!</p>
                  <p className="text-xs text-slate-300 mb-4">Twój wynik to {score} pkt.</p>
                  <button
                    type="button"
                    onClick={resetGame}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Zagraj ponownie</span>
                  </button>
                </>
              ) : isPaused ? (
                <>
                  <p className="text-lg font-bold text-amber-400 mb-2">Pauza</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPaused(false);
                      stateRef.current.isPaused = false;
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md active:scale-95"
                  >
                    <Play className="w-4 h-4" />
                    <span>Wznów grę</span>
                  </button>
                </>
              ) : (
                <>
                  <p className="text-base font-bold text-white mb-1">Gotowy na rundę Snake'a?</p>
                  <p className="text-xs text-slate-400 mb-4">Steruj strzałkami / WASD lub przyciskami na ekranie</p>
                  <button
                    type="button"
                    onClick={resetGame}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-md active:scale-95"
                  >
                    <Play className="w-4 h-4" />
                    <span>Rozpocznij grę</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* On-Screen Touch / D-Pad Controls for Mobile */}
        <div className="mt-4 flex flex-col items-center gap-1.5 select-none">
          <button
            type="button"
            onClick={() => changeDirection({ x: 0, y: -1 })}
            className="w-12 h-10 rounded-xl bg-[#15192c] hover:bg-[#1c223c] active:bg-[#252c4e] flex items-center justify-center border border-slate-800 hover:border-purple-500/40 shadow-sm"
            aria-label="W górę"
          >
            <ArrowUp className="w-5 h-5 text-purple-300" />
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => changeDirection({ x: -1, y: 0 })}
              className="w-12 h-10 rounded-xl bg-[#15192c] hover:bg-[#1c223c] active:bg-[#252c4e] flex items-center justify-center border border-slate-800 hover:border-purple-500/40 shadow-sm"
              aria-label="W lewo"
            >
              <ArrowLeft className="w-5 h-5 text-purple-300" />
            </button>
            <button
              type="button"
              onClick={() => changeDirection({ x: 0, y: 1 })}
              className="w-12 h-10 rounded-xl bg-[#15192c] hover:bg-[#1c223c] active:bg-[#252c4e] flex items-center justify-center border border-slate-800 hover:border-purple-500/40 shadow-sm"
              aria-label="W dół"
            >
              <ArrowDown className="w-5 h-5 text-purple-300" />
            </button>
            <button
              type="button"
              onClick={() => changeDirection({ x: 1, y: 0 })}
              className="w-12 h-10 rounded-xl bg-[#15192c] hover:bg-[#1c223c] active:bg-[#252c4e] flex items-center justify-center border border-slate-800 hover:border-purple-500/40 shadow-sm"
              aria-label="W prawo"
            >
              <ArrowRight className="w-5 h-5 text-purple-300" />
            </button>
          </div>
        </div>

        {/* Bottom Helper Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 w-full flex items-center justify-between text-[11px] text-slate-400">
          <span>Sterowanie: Strzałki / Przesuwanie palcem</span>
          <button
            type="button"
            onClick={onClose}
            className="text-purple-400 hover:text-purple-300 font-semibold underline"
          >
            Pomiń grę & przejdź do portfolio &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
