import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Teddy from '../components/Teddy';
import FloatingHearts from '../components/FloatingHearts';
import ScreenTransition from '../components/ScreenTransition';
import { BottomNav } from '../components/Navigation';
import { mainPranks } from '../data/pranks';
import { sound } from '../utils/sound';
import { Sparkles, RefreshCw } from 'lucide-react';

export default function TeddyPrank({ onNext, onBack, currentStep }) {
  const [prankIndex, setPrankIndex] = useState(0);
  const [wobbleKey, setWobbleKey] = useState(0);

  const activePrank = mainPranks[prankIndex];

  const triggerNextPrank = () => {
    sound.playBoing();
    setPrankIndex((prev) => (prev + 1) % mainPranks.length);
    setWobbleKey((prev) => prev + 1);

    // Confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFF275', '#FF4F87', '#FFD6E7', '#83B81A']
      });
    } catch (e) {}
  };

  return (
    <ScreenTransition>
      {/* Floating banana or confetti in background */}
      {activePrank.outfit === 'banana' && <FloatingHearts count={10} shape="banana" />}

      <div className="cute-card" style={{ maxWidth: 650 }}>
        <span className="page-badge">Step 5 • Goofy Prank</span>

        <h1 className="page-title">{activePrank.title}</h1>

        {/* Wobble / Shake Animation Container */}
        <div style={{ position: 'relative', margin: '1rem auto' }}>
          {/* Speech Bubble */}
          <motion.div
            key={`speech-${wobbleKey}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{
              position: 'relative',
              background: '#FFFFFF',
              border: '2px solid var(--rose-pink)',
              borderRadius: '18px',
              padding: '0.65rem 1.4rem',
              display: 'inline-block',
              fontSize: '1.25rem',
              fontWeight: '700',
              color: 'var(--rose-pink)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '0.6rem'
            }}
          >
            {activePrank.speech}
            <div
              style={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid var(--rose-pink)'
              }}
            />
          </motion.div>

          {/* Teddy with outfit and shake animation */}
          <motion.div
            key={`bear-${wobbleKey}`}
            animate={{
              rotate: [0, -10, 10, -8, 8, -4, 4, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Teddy mood={activePrank.outfit} size={200} animated={true} />
          </motion.div>
        </div>

        {/* Prank Messages */}
        <p className="page-subtitle" style={{ fontSize: '1.2rem', color: '#5A3525', marginBottom: '0.6rem' }}>
          <strong>"{activePrank.message}"</strong>
        </p>

        <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 1.5rem auto' }}>
          {activePrank.detail}
        </p>

        {/* Switch to next silly prank button */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            className="btn-cute-secondary"
            onClick={triggerNextPrank}
            style={{ fontSize: '0.95rem' }}
          >
            <RefreshCw size={16} />
            <span>{activePrank.nextPrankText}</span>
          </button>
        </div>

        <BottomNav
          currentStep={currentStep}
          totalSteps={9}
          onBack={onBack}
          onNext={onNext}
          nextLabel={activePrank.buttonText}
        />
      </div>
    </ScreenTransition>
  );
}
