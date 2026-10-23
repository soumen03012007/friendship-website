// Pure Web Audio API Sound Synthesizer
// Zero external files, zero 404s, fully offline and lightweight!

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.muted = true; // Off by default as required
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.bgmNoteIndex = 0;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  setMuted(mute) {
    this.muted = mute;
    if (mute) {
      this.stopBGM();
    } else {
      this.init();
      this.startBGM();
    }
  }

  toggleSound() {
    this.setMuted(!this.muted);
    return !this.muted;
  }

  // Play a soft cute pop (for buttons, clicks)
  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn("Sound play error", e);
    }
  }

  // Play heart catch chime (mini game)
  playHeartCatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const freq = freqs[Math.floor(Math.random() * freqs.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.15);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn("Sound play error", e);
    }
  }

  // Play funny boing for pranks
  playBoing() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(450, now + 0.12);
      osc.frequency.linearRampToValueAtTime(220, now + 0.25);
      osc.frequency.linearRampToValueAtTime(500, now + 0.38);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn("Sound play error", e);
    }
  }

  // Play warm chime / hug chords
  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chord = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.65);
      });
    } catch (e) {
      console.warn("Sound play error", e);
    }
  }

  // Play gentle hug / ending celebration chord
  playHug() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.15, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.3);
      });
    } catch (e) {
      console.warn("Sound play error", e);
    }
  }

  // Gentle calming background lullaby arpeggio
  startBGM() {
    if (this.muted || this.bgmPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.bgmPlaying = true;
    const melodyNotes = [
      261.63, 329.63, 392.00, 523.25, // C - E - G - C
      440.00, 392.00, 329.63, 293.66, // A - G - E - D
      349.23, 392.00, 440.00, 523.25, // F - G - A - C
      392.00, 329.63, 293.66, 261.63  // G - E - D - C
    ];

    const playNextNote = () => {
      if (!this.bgmPlaying || this.muted || !this.ctx) return;
      try {
        const freq = melodyNotes[this.bgmNoteIndex % melodyNotes.length];
        this.bgmNoteIndex++;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.75);
      } catch (err) {
        // Audio error handling
      }

      this.bgmTimer = setTimeout(playNextNote, 600);
    };

    playNextNote();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

export const sound = new SoundSystem();
