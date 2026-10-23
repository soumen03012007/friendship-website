import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles as SparkleIcon, ArrowLeft, Home } from 'lucide-react';
import { sound } from '../utils/sound';

export function AppHeader({ onOpenExtras, onGoHome, currentScreen }) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sound.isMuted());
  }, []);

  const handleToggleSound = () => {
    const active = sound.toggleSound();
    setIsMuted(!active);
  };

  return (
    <header className="app-header">
      <div 
        className="header-brand" 
        onClick={onGoHome}
        role="button"
        tabIndex={0}
        aria-label="Go to welcome screen"
        onKeyDown={(e) => e.key === 'Enter' && onGoHome()}
      >
        <span className="header-brand-emoji">🧸</span>
        <span className="header-brand-title">A Little Teddy for You</span>
        <span className="header-brand-title-mobile">Little Teddy</span>
      </div>

      <div className="header-actions">
        {/* Sound Toggle Button */}
        <button
          className="icon-btn sound-toggle-btn"
          onClick={handleToggleSound}
          title={isMuted ? "Turn sound ON (cute chimes & effects)" : "Mute sound"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={19} /> : <Volume2 size={19} color="#FF4F87" />}
        </button>

        {/* Quick Extras Button */}
        <button
          className="extras-pill-btn"
          onClick={onOpenExtras}
          aria-label="Open Quick Extras"
        >
          <SparkleIcon size={16} />
          <span className="extras-btn-text">Quick Extras</span>
          <span className="extras-btn-text-mobile">Extras</span>
        </button>
      </div>
    </header>
  );
}

export function BottomNav({ 
  currentStep, 
  totalSteps = 9, 
  onBack, 
  onNext, 
  nextLabel = "Continue →", 
  disableNext = false,
  showBack = true
}) {
  const hasBack = showBack && currentStep > 1;

  return (
    <div className="nav-bottom-bar">
      {/* Step Dots Track */}
      <div className="progress-pill-track" aria-label={`Step ${currentStep} of ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isPassed = stepNum < currentStep;
          return (
            <div
              key={stepNum}
              className={`step-dot ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
              title={`Screen ${stepNum}`}
            />
          );
        })}
      </div>

      {/* Buttons Container */}
      <div className={`nav-buttons-container ${hasBack ? 'has-back' : 'next-only'}`}>
        {hasBack && (
          <button
            type="button"
            className="btn-cute-outline btn-nav-back"
            onClick={onBack}
            aria-label="Go back to previous screen"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}

        {onNext && (
          <button
            type="button"
            className="btn-cute-primary btn-nav-next"
            onClick={onNext}
            disabled={disableNext}
            aria-label={nextLabel}
          >
            <span>{nextLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
