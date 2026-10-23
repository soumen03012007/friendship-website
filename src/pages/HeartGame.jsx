import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import CuteButton from '../components/CuteButton';
import ScreenTransition from '../components/ScreenTransition';
import { BottomNav } from '../components/Navigation';
import { sound } from '../utils/sound';
import { Timer, Trophy, Play, RotateCcw, Heart } from 'lucide-react';

const GAME_DURATION = 30; // 30 seconds as specified

export default function HeartGame({ onNext, onBack, currentStep }) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'ended'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeHearts, setActiveHearts] = useState([]);

  const timerRef = useRef(null);
  const spawnRef = useRef(null);
  const heartIdCounter = useRef(0);

  // Countdown timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Spawn hearts loop
  useEffect(() => {
    if (gameState === 'playing') {
      spawnRef.current = setInterval(() => {
        spawnNewHeart();
      }, 750);
    }
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [gameState]);

  const spawnNewHeart = () => {
    const newId = ++heartIdCounter.current;
    // Keep positions inside arena padding (10% to 85%)
    const top = Math.floor(Math.random() * 70) + 12;
    const left = Math.floor(Math.random() * 80) + 8;
    const icons = ['💖', '💕', '💗', '💓', '🧸'];
    const symbol = icons[Math.floor(Math.random() * icons.length)];
    const points = symbol === '🧸' ? 3 : 1;

    setActiveHearts((prev) => [
      ...prev.slice(-6), // keep max 7 visible at once
      { id: newId, top, left, symbol, points }
    ]);
  };

  const handleCatchHeart = (e, heartId, points) => {
    e.stopPropagation();
    sound.playHeartCatch();
    setScore((s) => s + points);
    setActiveHearts((prev) => prev.filter((h) => h.id !== heartId));
  };

  const startGame = () => {
    sound.playPop();
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setActiveHearts([]);
    setGameState('playing');
  };

  const finishGame = () => {
    setGameState('ended');
    sound.playHug();

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF4F87', '#FFD6E7', '#FFE4EE', '#FFAAA6']
      });
    } catch (e) {}
  };

  const getResultMessage = () => {
    if (score >= 25) {
      return {
        badge: "Grand Master of Teddy Hugs! 🏆🧸",
        text: "Incredible reflexes! You caught so much love that all anger has officially evaporated into thin air!"
      };
    } else if (score >= 15) {
      return {
        badge: "Heart Catcher Champion! 🌟💖",
        text: "Awesome job! You caught tons of friendship hearts. My teddy is jumping with joy!"
      };
    } else {
      return {
        badge: "Sweet Catcher! 🌸",
        text: "Every heart caught was filled with sincere apologies and unlimited hugs just for you!"
      };
    }
  };

  const result = getResultMessage();

  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 680 }}>
        <span className="page-badge">Step 7 • Mini-Game</span>

        <h1 className="page-title">Catch the Hearts! 💖</h1>
        <p className="page-subtitle">Catch as many hearts as you can before they disappear!</p>

        <div className="heart-game-container">
          {/* Game HUD */}
          <div className="game-hud">
            <div className="hud-item">
              <Trophy size={20} color="var(--rose-pink)" />
              Score: <span>{score}</span>
            </div>

            <div className="hud-item">
              <Timer size={20} color={timeLeft <= 5 ? '#FF3333' : 'var(--warm-brown)'} />
              Time: <span style={{ color: timeLeft <= 5 ? '#FF3333' : 'var(--rose-pink)' }}>{timeLeft}s</span>
            </div>
          </div>

          {/* Game Play Area */}
          <div className="game-arena">
            {gameState === 'idle' && (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎯💗</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--warm-brown)', marginBottom: '0.4rem' }}>
                  Ready to Catch Some Love?
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.2rem', textAlign: 'center' }}>
                  Tap hearts as they appear. Catch rare 🧸 for +3 bonus points!
                </div>
                <CuteButton onClick={startGame} variant="primary" icon={<Play size={18} />}>
                  Start Game (30s)
                </CuteButton>
              </div>
            )}

            {gameState === 'playing' && (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <AnimatePresence>
                  {activeHearts.map((heart) => (
                    <motion.div
                      key={heart.id}
                      className="game-heart-target"
                      style={{
                        top: `${heart.top}%`,
                        left: `${heart.left}%`,
                        fontSize: heart.points > 1 ? '2.4rem' : '2.1rem'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onClick={(e) => handleCatchHeart(e, heart.id, heart.points)}
                    >
                      {heart.symbol}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {gameState === 'ended' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>🎉</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--rose-pink)', marginBottom: '0.2rem' }}>
                  Time's Up! Final Score: {score}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--warm-brown)', marginBottom: '0.4rem' }}>
                  {result.badge}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: 420, textAlign: 'center', marginBottom: '1.2rem' }}>
                  {result.text}
                </p>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button type="button" className="btn-cute-secondary" onClick={startGame}>
                    <RotateCcw size={16} />
                    <span>Play Again</span>
                  </button>
                  <button type="button" className="btn-cute-primary game-finish-next-btn" onClick={onNext}>
                    <span>Continue to Special Message →</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <BottomNav
          currentStep={currentStep}
          totalSteps={9}
          onBack={onBack}
          onNext={onNext}
          nextLabel="Continue →"
        />
      </div>
    </ScreenTransition>
  );
}
