import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Teddy from '../components/Teddy';
import CuteButton from '../components/CuteButton';
import ScreenTransition from '../components/ScreenTransition';
import { BottomNav } from '../components/Navigation';
import { sound } from '../utils/sound';
import { Sparkles, Gift } from 'lucide-react';

export default function FunSurprise({ onNext, onBack, currentStep }) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    sound.playChime();

    // Cute pastel confetti explosion
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD6E7', '#FF4F87', '#E9DFFF', '#DDF4FF', '#FFB3D1']
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 640 }}>
        <span className="page-badge">Step 4 • Surprise Time</span>

        <h1 className="page-title">Let's Have Some Fun! 😄</h1>
        <p className="page-subtitle">Because life is better when we laugh.</p>

        {/* Mischievous peeking teddy behind a gift card */}
        <div style={{ position: 'relative', height: 210, margin: '1rem auto 1.5rem auto', overflow: 'hidden', maxWidth: 360 }}>
          {/* Peeking Teddy */}
          <motion.div
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: revealed ? 10 : 50 }}
            animate={revealed ? { y: [0, -10, 0] } : { y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Teddy mood={revealed ? "celebrating" : "waving"} size={160} />
          </motion.div>

          {/* Front covering card/gift box */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '85%',
              height: 100,
              background: 'linear-gradient(135deg, #FFD6E7 0%, #FFA8C5 100%)',
              borderRadius: '24px 24px 16px 16px',
              border: '3px solid #FFFFFF',
              boxShadow: '0 8px 20px rgba(255, 79, 135, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5
            }}
            animate={revealed ? { y: 55, opacity: 0.85 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span style={{ fontSize: '1.8rem' }}>🎁</span>
            <span style={{ fontWeight: '700', color: '#4A2818', marginLeft: '0.6rem' }}>
              {revealed ? "Surprise Unlocked! ✨" : "Special Delivery for You"}
            </span>
          </motion.div>
        </div>

        {/* Action Button & Revealed Message */}
        {!revealed ? (
          <div style={{ margin: '1.5rem 0' }}>
            <CuteButton
              onClick={handleReveal}
              variant="primary"
              soundType="chime"
              icon={<Gift size={18} />}
            >
              Show Me the Surprise!
            </CuteButton>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, #FFF5F9 0%, #F5ECFF 100%)',
                border: '2px dashed var(--rose-pink)',
                borderRadius: 'var(--radius-md)',
                padding: '1.4rem',
                margin: '1.2rem auto',
                maxWidth: 480
              }}
            >
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--rose-pink)', marginBottom: '0.4rem' }}>
                🌸 Smile Guarantee Activated!
              </div>
              <p style={{ fontSize: '1.05rem', color: '#5A3525', lineHeight: 1.6 }}>
                Teddy traveled across the internet just to tell you:
                <br />
                <strong>You are impossible to stay angry at, and even more impossible to replace.</strong>
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        <BottomNav
          currentStep={currentStep}
          totalSteps={9}
          onBack={onBack}
          onNext={onNext}
          nextLabel="Continue →"
          disableNext={!revealed}
        />
      </div>
    </ScreenTransition>
  );
}
