import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Teddy from '../components/Teddy';
import ScreenTransition from '../components/ScreenTransition';
import { BottomNav } from '../components/Navigation';
import { apologyMessages } from '../data/messages';
import { ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Apology({ onNext, onBack, currentStep }) {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    sound.playPop();
    setIndex((prev) => (prev === 0 ? apologyMessages.length - 1 : prev - 1));
  };

  const handleNextCard = () => {
    sound.playPop();
    setIndex((prev) => (prev === apologyMessages.length - 1 ? 0 : prev + 1));
  };

  const currentApology = apologyMessages[index];

  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 680 }}>
        <span className="page-badge">
          <Heart size={14} fill="#FF4F87" /> Sincere Apology
        </span>

        <h1 className="page-title">Sorry... 💗</h1>

        {/* Teddy Bear holding a large red heart with the word 'Sorry' */}
        <div style={{ margin: '0.8rem auto 1.2rem auto' }}>
          <Teddy mood="apology" text="Sorry" size={190} animated={true} />
        </div>

        <p className="page-subtitle" style={{ fontSize: '1.15rem', color: '#5A3525', marginBottom: '1.5rem' }}>
          I know I messed up, and I'm genuinely sorry.
          <br />
          I never wanted to hurt your feelings.
          <br />
          <strong>Your friendship means a lot to me.</strong>
        </p>

        {/* Apology Carousel of 5 messages */}
        <div className="carousel-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="carousel-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Quote className="carousel-quote-icon" size={36} />
              
              <div style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--warm-brown)', marginBottom: '0.6rem' }}>
                {currentApology.title}
              </div>

              <div style={{ fontSize: '1.02rem', color: '#6A4330', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                "{currentApology.text}"
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--rose-pink)', fontWeight: '600', fontStyle: 'italic' }}>
                {currentApology.highlight}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows & Dots */}
          <div className="carousel-arrows">
            <button
              className="icon-btn"
              onClick={handlePrev}
              aria-label="Previous apology message"
            >
              <ChevronLeft size={20} />
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {apologyMessages.map((msg, i) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    sound.playPop();
                    setIndex(i);
                  }}
                  style={{
                    width: i === index ? 22 : 9,
                    height: 9,
                    borderRadius: 5,
                    border: 'none',
                    background: i === index ? 'var(--rose-pink)' : 'var(--soft-pink)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="icon-btn"
              onClick={handleNextCard}
              aria-label="Next apology message"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <BottomNav
          currentStep={currentStep}
          totalSteps={9}
          onBack={onBack}
          onNext={onNext}
          nextLabel="Let's Have Some Fun →"
        />
      </div>
    </ScreenTransition>
  );
}
