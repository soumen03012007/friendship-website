import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Teddy from '../components/Teddy';
import ScreenTransition from '../components/ScreenTransition';
import { BottomNav } from '../components/Navigation';
import { moodResponses } from '../data/messages';
import { sound } from '../utils/sound';

export default function MoodSelection({ onNext, onBack, currentStep }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { key: 'angry', ...moodResponses.angry },
    { key: 'sad', ...moodResponses.sad },
    { key: 'ignoring', ...moodResponses.ignoring },
    { key: 'annoyed', ...moodResponses.annoyed }
  ];

  const handleSelect = (key) => {
    setSelectedMood(key);
    sound.playPop();
  };

  const currentResponse = selectedMood ? moodResponses[selectedMood] : null;

  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 720 }}>
        <span className="page-badge">Step 2 • Check-In</span>
        
        <h1 className="page-title">What's Your Mood Right Now?</h1>
        <p className="page-subtitle">Pick one... I'll try to fix it! 💗</p>

        {/* 4 Interactive Mood Cards */}
        <div className="mood-grid">
          {moods.map((m) => {
            const isSelected = selectedMood === m.key;
            return (
              <motion.div
                key={m.key}
                className={`mood-card-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(m.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(m.key)}
              >
                <div className="mood-emoji-badge">{m.emoji}</div>
                <div className="mood-teddy-box">
                  <Teddy mood={m.bearMood} size={105} animated={isSelected} />
                </div>
                <div className="mood-title">{m.title}</div>
                <div className="mood-desc">{m.subtitle}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Response Box */}
        <AnimatePresence mode="wait">
          {currentResponse && (
            <motion.div
              key={selectedMood}
              className="mood-response-box"
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--rose-pink)', marginBottom: '0.4rem' }}>
                {currentResponse.response}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {currentResponse.actionTip}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedMood && (
          <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
            👆 Tap any card above to see Teddy's reaction!
          </div>
        )}

        <BottomNav
          currentStep={currentStep}
          totalSteps={9}
          onBack={onBack}
          onNext={onNext}
          nextLabel="Continue →"
          disableNext={!selectedMood}
        />
      </div>
    </ScreenTransition>
  );
}
