/**
 * Web Audio API synthesizer for romantic sound effects and warm lofi music
 * Works reliably offline/without external assets
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    console.debug('Audio error', e);
  }
}

export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.12, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.4);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}

export function playCassetteClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.debug('Audio error', e);
  }
}

export function playHeartChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const chords = [587.33, 739.99, 880.0]; // D, F#, A

    chords.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      gain.gain.setValueAtTime(0.1, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.55);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}

/**
 * Romantic Lofi Ambient Synth Player
 * Plays warm gentle acoustic-style chords
 */
class LofiMusicEngine {
  private isPlaying = false;
  private timer: number | null = null;
  private currentStep = 0;
  private filterNode: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;

  // Romantic chord progressions (Frequencies in Hz)
  // Cmaj7 -> Am7 -> Dm7 -> G7sus4 (warm & cozy nostalgic vibe)
  private progressions = [
    // Track 0: "Our First Dance" - Warm Nostalgic Chords
    [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [293.66, 349.23, 440.0, 523.25], // Dm7
      [196.0, 261.63, 293.66, 392.0]   // G7sus
    ],
    // Track 1: "Midnight Conversations" - Dreamy Melodic Chords
    [
      [349.23, 440.0, 523.25, 659.25], // Fmaj7
      [329.63, 392.0, 493.88, 587.33], // Em7
      [293.66, 349.23, 440.0, 523.25], // Dm7
      [261.63, 329.63, 392.0, 493.88]  // Cmaj7
    ],
    // Track 2: "Stargazing With You" - Lofi Ambient Peace
    [
      [220.0, 261.63, 329.63, 440.0],  // Am
      [174.61, 220.0, 261.63, 349.23], // F
      [261.63, 329.63, 392.0, 523.25], // C
      [196.0, 246.94, 293.66, 392.0]   // G
    ]
  ];

  public start(trackIndex = 0) {
    const ctx = getAudioContext();
    if (!ctx) return;
    this.stop();
    this.isPlaying = true;
    this.currentStep = 0;

    const chords = this.progressions[trackIndex % this.progressions.length];

    const playNextChord = () => {
      if (!this.isPlaying) return;
      const stepChords = chords[this.currentStep % chords.length];
      const now = ctx.currentTime;

      stepChords.forEach((freq, noteIdx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Warm lofi mellow filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650 + noteIdx * 100, now);

        osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
        // Add subtle detune for that vintage tape warmth
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.08);

        // Soft gentle envelope
        gain.gain.setValueAtTime(0, now + noteIdx * 0.08);
        gain.gain.linearRampToValueAtTime(0.045, now + noteIdx * 0.08 + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.08 + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + noteIdx * 0.08);
        osc.stop(now + noteIdx * 0.08 + 3.0);
      });

      this.currentStep++;
      this.timer = window.setTimeout(playNextChord, 2600);
    };

    playNextChord();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const lofiPlayer = new LofiMusicEngine();
