import React from 'react';
import { motion } from 'framer-motion';
import Teddy from '../components/Teddy';
import CuteButton from '../components/CuteButton';
import Sparkles from '../components/Sparkles';
import ScreenTransition from '../components/ScreenTransition';
import { Heart, Sparkles as SparkleIcon } from 'lucide-react';

export default function Welcome({ onNext }) {
  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 580 }}>
        <Sparkles count={12} />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="page-badge">
            <Heart size={14} fill="#FF4F87" /> A Little Teddy For You
          </span>
        </motion.div>

        <h1 className="page-title" style={{ marginTop: '0.4rem' }}>
          Hey... I Know You're Angry ♡
        </h1>

        {/* Adorable Teddy holding red heart */}
        <div style={{ margin: '1.2rem auto', position: 'relative' }}>
          <Teddy mood="heart" size={210} animated={true} />
        </div>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="page-subtitle" style={{ fontSize: '1.2rem', color: '#5A3525', marginBottom: '2rem' }}>
            But I still care about you... a lot! 🥺
            <br />
            <span style={{ fontSize: '1.05rem', color: '#8C6553', display: 'block', marginTop: '0.4rem' }}>
              So, I made something special just for you.
            </span>
          </p>

          <CuteButton
            onClick={onNext}
            variant="primary"
            soundType="pop"
            icon={<SparkleIcon size={18} />}
          >
            Start Our Little Adventure →
          </CuteButton>
        </motion.div>
      </div>
    </ScreenTransition>
  );
}
