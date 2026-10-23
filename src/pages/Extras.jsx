import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Teddy from '../components/Teddy';
import ScreenTransition from '../components/ScreenTransition';
import { cuteJokes } from '../data/jokes';
import { cuteTeddyMessages, friendshipQuotes } from '../data/messages';
import { extraPranks } from '../data/pranks';
import { sound } from '../utils/sound';
import { Smile, MessageCircleHeart, Sparkles, Wand2, X, RefreshCw } from 'lucide-react';

export default function Extras({ onClose }) {
  const [activeTab, setActiveTab] = useState('jokes'); // 'jokes' | 'messages' | 'quotes' | 'pranks'

  // Joke state
  const [jokeIdx, setJokeIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Teddy Messages state
  const [msgIdx, setMsgIdx] = useState(0);

  // Quotes state
  const [quoteIdx, setQuoteIdx] = useState(0);

  // Pranks state
  const [prankIdx, setPrankIdx] = useState(0);
  const [prankRevealed, setPrankRevealed] = useState(false);

  // Handlers
  const handleNextJoke = () => {
    sound.playPop();
    setShowAnswer(false);
    setJokeIdx((prev) => (prev + 1) % cuteJokes.length);
  };

  const handleNextMessage = () => {
    sound.playChime();
    setMsgIdx((prev) => (prev + 1) % cuteTeddyMessages.length);
  };

  const handleNextQuote = () => {
    sound.playChime();
    setQuoteIdx((prev) => (prev + 1) % friendshipQuotes.length);
  };

  const handleNextPrank = () => {
    sound.playBoing();
    setPrankRevealed(false);
    setPrankIdx((prev) => (prev + 1) % extraPranks.length);
  };

  const handleTriggerPrank = () => {
    setPrankRevealed(true);
    sound.playBoing();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD6E7', '#FF4F87', '#FFE4EE']
      });
    } catch (e) {}
  };

  const currentJoke = cuteJokes[jokeIdx];
  const currentMessage = cuteTeddyMessages[msgIdx];
  const currentQuote = friendshipQuotes[quoteIdx];
  const currentPrank = extraPranks[prankIdx];

  const tabs = [
    { id: 'jokes', label: 'Funny Jokes', icon: <Smile size={17} /> },
    { id: 'messages', label: 'Teddy Messages', icon: <MessageCircleHeart size={17} /> },
    { id: 'quotes', label: 'Friendship Quotes', icon: <Sparkles size={17} /> },
    { id: 'pranks', label: 'Random Pranks', icon: <Wand2 size={17} /> }
  ];

  return (
    <ScreenTransition>
      <div className="cute-card" style={{ maxWidth: 740, position: 'relative' }}>
        {/* Close Button */}
        <button
          className="icon-btn"
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
          aria-label="Back to main story"
          title="Return to main journey"
        >
          <X size={20} />
        </button>

        <span className="page-badge">🎁 Bonus Goodies</span>
        <h1 className="page-title">Quick Extras & Smiles</h1>
        <p className="page-subtitle">Interactive cards crafted to brighten up your mood anytime!</p>

        {/* Tab Navigation */}
        <div className="extras-tabs-container">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(tab.id);
                }}
                className={`extras-tab-btn ${isActive ? 'btn-cute-primary active' : 'btn-cute-secondary'}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Funny Jokes */}
        {activeTab === 'jokes' && (
          <motion.div
            key="jokes-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, #FFF8EE 0%, #FFEBF3 100%)',
              border: '2px solid var(--soft-pink)',
              borderRadius: '24px',
              padding: '1.8rem 1.4rem',
              maxWidth: 580,
              margin: '0 auto 1.5rem auto'
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--rose-pink)', fontWeight: '700', marginBottom: '0.5rem' }}>
              JOKE {jokeIdx + 1} OF {cuteJokes.length}
            </div>

            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--warm-brown)', marginBottom: '1rem', lineHeight: 1.5 }}>
              "{currentJoke.question}"
            </div>

            <div style={{ minHeight: 65, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {showAnswer ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div style={{ fontSize: '1.15rem', color: 'var(--rose-pink)', fontWeight: '700', marginBottom: '0.3rem' }}>
                    👉 {currentJoke.answer}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {currentJoke.reaction}
                  </div>
                </motion.div>
              ) : (
                <button
                  type="button"
                  className="btn-cute-outline"
                  onClick={() => {
                    sound.playPop();
                    setShowAnswer(true);
                  }}
                  style={{ margin: '0 auto', fontSize: '0.9rem' }}
                >
                  👀 Reveal Punchline
                </button>
              )}
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button type="button" className="btn-cute-primary" onClick={handleNextJoke} style={{ fontSize: '0.95rem' }}>
                <RefreshCw size={15} />
                <span>Next Joke ({jokeIdx + 1}/{cuteJokes.length})</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Cute Teddy Messages */}
        {activeTab === 'messages' && (
          <motion.div
            key="messages-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, #FFF5F9 0%, #F5ECFF 100%)',
              border: '2px solid var(--soft-pink)',
              borderRadius: '24px',
              padding: '1.8rem 1.4rem',
              maxWidth: 580,
              margin: '0 auto 1.5rem auto'
            }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              <Teddy mood={msgIdx % 2 === 0 ? "heart" : "waving"} size={120} animated={true} />
            </div>

            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.8rem',
                background: 'rgba(255, 79, 135, 0.12)',
                color: 'var(--rose-pink)',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: '700',
                marginBottom: '0.8rem'
              }}
            >
              {currentMessage.tag}
            </span>

            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--warm-brown)', marginBottom: '0.5rem' }}>
              {currentMessage.title}
            </div>

            <p style={{ fontSize: '1.08rem', color: '#5A3525', lineHeight: 1.6, maxWidth: 460, margin: '0 auto 1.4rem auto' }}>
              "{currentMessage.message}"
            </p>

            <button type="button" className="btn-cute-primary" onClick={handleNextMessage} style={{ fontSize: '0.95rem' }}>
              <RefreshCw size={15} />
              <span>Next Message ({msgIdx + 1}/{cuteTeddyMessages.length})</span>
            </button>
          </motion.div>
        )}

        {/* Tab 3: Love & Friendship Quotes */}
        {activeTab === 'quotes' && (
          <motion.div
            key="quotes-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, #FFFDF7 0%, #FFF0F6 100%)',
              border: '2px solid var(--soft-pink)',
              borderRadius: '24px',
              padding: '2rem 1.6rem',
              maxWidth: 580,
              margin: '0 auto 1.5rem auto'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>💌</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--rose-pink)', fontWeight: '700', marginBottom: '0.8rem' }}>
              QUOTE {quoteIdx + 1} OF {friendshipQuotes.length}
            </div>

            <p style={{ fontSize: '1.2rem', color: 'var(--warm-brown)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '0.8rem' }}>
              "{currentQuote.quote}"
            </p>

            <div style={{ fontSize: '0.92rem', color: 'var(--rose-pink)', fontWeight: '700', marginBottom: '1.5rem' }}>
              — {currentQuote.author}
            </div>

            <button type="button" className="btn-cute-primary" onClick={handleNextQuote} style={{ fontSize: '0.95rem' }}>
              <RefreshCw size={15} />
              <span>Next Quote ({quoteIdx + 1}/{friendshipQuotes.length})</span>
            </button>
          </motion.div>
        )}

        {/* Tab 4: Random Pranks */}
        {activeTab === 'pranks' && (
          <motion.div
            key="pranks-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, #FFF9E6 0%, #FFEBF3 100%)',
              border: '2px dashed var(--rose-pink)',
              borderRadius: '24px',
              padding: '1.8rem 1.4rem',
              maxWidth: 580,
              margin: '0 auto 1.5rem auto'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.3rem' }}>{currentPrank.emoji}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--warm-brown)', marginBottom: '0.4rem' }}>
              {currentPrank.title}
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
              {currentPrank.preview}
            </p>

            {!prankRevealed ? (
              <button
                type="button"
                className="btn-cute-primary"
                onClick={handleTriggerPrank}
                style={{ marginBottom: '1.2rem' }}
              >
                <span>{currentPrank.triggerText}</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid var(--rose-pink)',
                  borderRadius: '16px',
                  padding: '1.1rem',
                  marginBottom: '1.2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--rose-pink)'
                }}
              >
                {currentPrank.reveal}
              </motion.div>
            )}

            <div>
              <button type="button" className="btn-cute-secondary" onClick={handleNextPrank} style={{ fontSize: '0.92rem' }}>
                <RefreshCw size={15} />
                <span>Another Prank ({prankIdx + 1}/{extraPranks.length})</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Return Button */}
        <div style={{ marginTop: '1rem' }}>
          <button
            type="button"
            className="btn-cute-outline"
            onClick={onClose}
            style={{ fontSize: '0.95rem' }}
          >
            <span>← Return to Story</span>
          </button>
        </div>
      </div>
    </ScreenTransition>
  );
}
