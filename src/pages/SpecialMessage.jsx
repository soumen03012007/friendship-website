import React from 'react';
import { motion } from 'framer-motion';
import Teddy from '../components/Teddy';
import Sparkles from '../components/Sparkles';
import ScreenTransition from '../components/ScreenTransition';
import { BottomNav } from '../components/Navigation';
import { Heart, Sparkles as SparkleIcon } from 'lucide-react';

export default function SpecialMessage({ onNext, onBack, currentStep }) {
  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 650 }}>
        <Sparkles count={10} />
        <span className="page-badge">
          <Heart size={14} fill="#FF4F87" /> Most Cherished
        </span>

        <h1 className="page-title">You're My Favorite Person 💗</h1>

        {/* Teddy Bear hugging a giant glowing heart with floating mini hearts */}
        <div className="special-teddy-container">
          <Teddy mood="love" size={210} animated={true} />

          {/* Floating animated ambient hearts */}
          <motion.div
            style={{ position: 'absolute', top: 10, left: 10, fontSize: '1.6rem' }}
            animate={{ y: [-5, 5, -5], rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            💖
          </motion.div>
          <motion.div
            style={{ position: 'absolute', top: 25, right: 10, fontSize: '1.8rem' }}
            animate={{ y: [5, -5, 5], rotate: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          >
            💕
          </motion.div>
          <motion.div
            style={{ position: 'absolute', bottom: 30, right: 0, fontSize: '1.4rem' }}
            animate={{ scale: [0.9, 1.2, 0.9] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            ✨
          </motion.div>
        </div>

        {/* Heartwarming emotional message */}
        <motion.div
          className="special-quote-box"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              fontSize: '1.22rem',
              color: 'var(--warm-brown)',
              lineHeight: 1.7,
              fontWeight: '500'
            }}
          >
            "Even when you're angry with me,
            <br />
            you're still someone very special to me.
            <br />
            <strong>I'm really glad you're in my life."</strong>
          </p>
          <div style={{ marginTop: '0.8rem', fontSize: '0.95rem', color: 'var(--rose-pink)', fontWeight: '600' }}>
            Always here, through the giggles and the pouts. 🧸✨
          </div>
        </motion.div>

        <BottomNav
          currentStep={currentStep}
          totalSteps={9}
          onBack={onBack}
          onNext={onNext}
          nextLabel="One Last Surprise →"
        />
      </div>
    </ScreenTransition>
  );
}
