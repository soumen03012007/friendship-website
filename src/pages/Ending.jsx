import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Teddy from '../components/Teddy';
import CuteButton from '../components/CuteButton';
import ScreenTransition from '../components/ScreenTransition';
import { sound } from '../utils/sound';
import { ArrowLeft, RotateCcw, Heart, Sparkles as SparkleIcon } from 'lucide-react';

export default function Ending({ onReset, onBack }) {
  const [isEnded, setIsEnded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bearSize = isMobile ? 120 : 155;
  const hugOffset = isMobile ? 25 : 38;

  const handleEndClick = () => {
    setIsEnded(true);
    sound.playHug();

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF4F87', '#FFD6E7', '#FFE4EE', '#FFFDF0', '#FF8BA7']
      });
    } catch (e) {}
  };

  return (
    <ScreenTransition>
      <div
        className="cute-card ending-sky"
        style={{
          maxWidth: 720,
          position: 'relative',
          overflow: 'hidden',
          padding: '2.5rem 1.8rem',
          minHeight: 580
        }}
      >
        {/* Glowing Moon */}
        <div className="glowing-moon" />

        {/* Twinkling Stars in Night Sky */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="night-star"
            style={{
              top: `${(i * 19) % 75 + 4}%`,
              left: `${(i * 27) % 92 + 4}%`,
              width: i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
              animation: `starTwinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 2.5}s`
            }}
          />
        ))}

        {/* Pink Glow Finish Overlay when End is clicked */}
        <AnimatePresence>
          {isEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(255, 120, 170, 0.45) 0%, rgba(255, 214, 231, 0.75) 80%, rgba(255, 235, 245, 0.95) 100%)',
                pointerEvents: 'none',
                zIndex: 15
              }}
            />
          )}
        </AnimatePresence>

        {/* Content Container */}
        <div style={{ position: 'relative', zIndex: 20 }}>
          <span
            className="page-badge"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#FFE4EE',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <SparkleIcon size={14} /> Final Chapter • Endless Friendship
          </span>

          <h1
            className="page-title"
            style={{
              color: '#FFFFFF',
              textShadow: '0 4px 16px rgba(0,0,0,0.3)',
              marginTop: '0.4rem'
            }}
          >
            Thank You for Being You... 💖
          </h1>

          {/* Two Adorable Teddy Bears Sitting Together with Hug Animation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              margin: '1.2rem auto',
              height: 190
            }}
          >
            {/* Bear 1 (Left) */}
            <motion.div
              animate={
                isEnded
                  ? { x: hugOffset, rotate: 10, scale: 1.05 }
                  : { y: [0, -6, 0] }
              }
              transition={
                isEnded
                  ? { duration: 0.9, ease: 'easeOut' }
                  : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
              }
              style={{ zIndex: 2 }}
            >
              <Teddy mood={isEnded ? 'love' : 'shy'} size={bearSize} animated={!isEnded} />
            </motion.div>

            {/* Glowing Hearts between them */}
            <motion.div
              style={{
                fontSize: isMobile ? '1.6rem' : '2rem',
                margin: '0 -8px',
                zIndex: 4,
                filter: 'drop-shadow(0 0 12px rgba(255, 79, 135, 0.9))'
              }}
              animate={
                isEnded
                  ? { scale: [1, 1.4, 1.2], y: [-10, -40, -30], opacity: [1, 1, 0.9] }
                  : { scale: [1, 1.15, 1], y: [0, -4, 0] }
              }
              transition={
                isEnded
                  ? { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
                  : { repeat: Infinity, duration: 1.8 }
              }
            >
              💖
            </motion.div>

            {/* Bear 2 (Right) */}
            <motion.div
              animate={
                isEnded
                  ? { x: -hugOffset, rotate: -10, scale: 1.05 }
                  : { y: [0, -6, 0] }
              }
              transition={
                isEnded
                  ? { duration: 0.9, ease: 'easeOut' }
                  : { repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.3 }
              }
              style={{ zIndex: 2 }}
            >
              <Teddy mood={isEnded ? 'love' : 'heart'} size={bearSize} animated={!isEnded} />
            </motion.div>
          </div>

          {/* Sincere Ending Message */}
          <div
            style={{
              background: 'rgba(23, 13, 43, 0.45)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '1.4rem 1.6rem',
              maxWidth: 550,
              margin: '0.8rem auto 1.5rem auto',
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
          >
            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.7,
                color: '#FFF8EE',
                fontWeight: '400'
              }}
            >
              I may not always be perfect,
              <br />
              but I'll always value our friendship.
              <br />
              I hope this little surprise made you smile.
            </p>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: '#FFD6E7',
                marginTop: '0.9rem',
                fontWeight: '500'
              }}
            >
              Take your time. No pressure.
              <br />
              Whenever you're ready, I'd love to make things right. 🧸
            </p>
          </div>

          {/* Finishing Banner when End is clicked */}
          <AnimatePresence>
            {isEnded && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  color: 'var(--rose-pink)',
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '700',
                  fontSize: '1.15rem',
                  boxShadow: '0 8px 24px rgba(255, 79, 135, 0.35)',
                  margin: '1.2rem auto',
                  maxWidth: 500
                }}
              >
                Sending you a little happiness, one teddy hug at a time. 💗
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons: End Button & Replay Button */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '1.5rem'
            }}
          >
            <button
              type="button"
              className="btn-cute-outline"
              onClick={onBack}
              style={{
                color: '#FFFFFF',
                borderColor: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.1)'
              }}
              aria-label="Back to Screen 8"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            {!isEnded ? (
              <CuteButton
                onClick={handleEndClick}
                variant="primary"
                soundType="hug"
                icon={<Heart size={18} fill="#FFFFFF" />}
              >
                End ♡
              </CuteButton>
            ) : null}

            <button
              type="button"
              className="btn-cute-secondary"
              onClick={onReset}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--warm-brown)'
              }}
            >
              <RotateCcw size={16} />
              <span>Back to Beginning 🧸</span>
            </button>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
}
