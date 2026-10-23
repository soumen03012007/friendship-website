import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppHeader } from './components/Navigation';
import FloatingHearts from './components/FloatingHearts';

// Pages
import Welcome from './pages/Welcome';
import MoodSelection from './pages/MoodSelection';
import Apology from './pages/Apology';
import FunSurprise from './pages/FunSurprise';
import TeddyPrank from './pages/TeddyPrank';
import SweetReminder from './pages/SweetReminder';
import HeartGame from './pages/HeartGame';
import SpecialMessage from './pages/SpecialMessage';
import Ending from './pages/Ending';
import Extras from './pages/Extras';

import { sound } from './utils/sound';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showExtras, setShowExtras] = useState(false);

  // Navigation handlers
  const handleNext = () => {
    sound.playPop();
    setCurrentStep((prev) => Math.min(prev + 1, 9));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    sound.playPop();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    sound.playPop();
    setShowExtras(false);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenExtras = () => {
    sound.playPop();
    setShowExtras(true);
  };

  const handleCloseExtras = () => {
    sound.playPop();
    setShowExtras(false);
  };

  return (
    <div className="app-container">
      {/* Background Floating Hearts */}
      <FloatingHearts count={16} />

      {/* Persistent Navigation Header */}
      <AppHeader
        onOpenExtras={handleOpenExtras}
        onGoHome={handleGoHome}
        currentScreen={currentStep}
      />

      {/* Main Viewport */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {showExtras ? (
            <Extras key="extras" onClose={handleCloseExtras} />
          ) : (
            (() => {
              switch (currentStep) {
                case 1:
                  return <Welcome key="step-1" onNext={handleNext} />;
                case 2:
                  return (
                    <MoodSelection
                      key="step-2"
                      onNext={handleNext}
                      onBack={handleBack}
                      currentStep={2}
                    />
                  );
                case 3:
                  return (
                    <Apology
                      key="step-3"
                      onNext={handleNext}
                      onBack={handleBack}
                      currentStep={3}
                    />
                  );
                case 4:
                  return (
                    <FunSurprise
                      key="step-4"
                      onNext={handleNext}
                      onBack={handleBack}
                      currentStep={4}
                    />
                  );
                case 5:
                  return (
                    <TeddyPrank
                      key="step-5"
                      onNext={handleNext}
                      onBack={handleBack}
                      currentStep={5}
                    />
                  );
                case 6:
                  return (
                    <SweetReminder
                      key="step-6"
                      onNext={handleNext}
                      onBack={handleBack}
                      currentStep={6}
                    />
                  );
                case 7:
                  return (
                    <HeartGame
                      key="step-7"
                      onNext={handleNext}
                      onBack={handleBack}
                      currentStep={7}
                    />
                  );
                case 8:
                  return (
                    <SpecialMessage
                      key="step-8"
                      onNext={handleNext}
                      onBack={handleBack}
                      currentStep={8}
                    />
                  );
                case 9:
                  return (
                    <Ending
                      key="step-9"
                      onReset={handleGoHome}
                      onBack={handleBack}
                    />
                  );
                default:
                  return <Welcome key="step-1-fallback" onNext={handleNext} />;
              }
            })()
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
