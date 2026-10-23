import React from 'react';
import { motion } from 'framer-motion';
import Teddy from '../components/Teddy';
import ScreenTransition from '../components/ScreenTransition';
import { BottomNav } from '../components/Navigation';
import { sweetReminders } from '../data/messages';
import { Heart } from 'lucide-react';

export default function SweetReminder({ onNext, onBack, currentStep }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 680 }}>
        <span className="page-badge">Step 6 • Deep Appreciation</span>

        <h1 className="page-title">Just a Little Reminder...</h1>
        <p className="page-subtitle">In case nobody reminded you today 💗</p>

        {/* Dreamy Sunset Landscape with Teddy */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 180,
            borderRadius: '24px',
            background: 'linear-gradient(180deg, #FFB3D1 0%, #FFD6A5 55%, #FDFFB6 100%)',
            overflow: 'hidden',
            boxShadow: 'inset 0 4px 14px rgba(255, 79, 135, 0.15)',
            marginBottom: '1.6rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
        >
          {/* Gentle sun glow in landscape */}
          <div
            style={{
              position: 'absolute',
              top: '25px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFFFFF 30%, #FFE29F 80%, rgba(255,255,255,0) 100%)',
              filter: 'drop-shadow(0 0 15px #FFE29F)'
            }}
          />

          {/* Rolling sunset hills */}
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, width: '100%', height: '55%', zIndex: 1 }}
          >
            <path d="M0 80 Q140 30 250 70 T500 60 L500 150 L0 150 Z" fill="#FFAAA6" opacity="0.7" />
            <path d="M0 100 Q180 50 350 90 T500 95 L500 150 L0 150 Z" fill="#FF8BA7" opacity="0.9" />
          </svg>

          {/* Teddy sitting & gazing at sunset */}
          <div style={{ position: 'relative', zIndex: 2, marginBottom: -15 }}>
            <Teddy mood="shy" size={135} animated={true} />
          </div>
        </div>

        {/* 5 Animated Heart Bullets */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            textAlign: 'left',
            margin: '0 auto 1.5rem auto',
            maxWidth: 520
          }}
        >
          {sweetReminders.map((r) => (
            <motion.div
              key={r.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 4 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.9rem',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.85rem 1.1rem',
                borderRadius: '16px',
                border: '1.5px solid var(--soft-pink)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span
                style={{
                  color: 'var(--rose-pink)',
                  fontSize: '1.4rem',
                  lineHeight: 1,
                  marginTop: '2px',
                  filter: 'drop-shadow(0 2px 4px rgba(255,79,135,0.3))'
                }}
              >
                💗
              </span>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--warm-brown)' }}>
                  {r.text}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {r.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <BottomNav
          currentStep={currentStep}
          totalSteps={9}
          onBack={onBack}
          onNext={onNext}
          nextLabel="Play Catch The Hearts! →"
        />
      </div>
    </ScreenTransition>
  );
}
