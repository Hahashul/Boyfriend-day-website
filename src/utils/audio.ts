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
 * Audio Engine for "her" — JVKE
 * Strictly plays requested track and does NOT synthesize placeholder/random tunes
 */
class LofiMusicEngine {
  private isPlaying = false;
  private audio: HTMLAudioElement | null = null;

  public start(audioUrl = '/her.mp3'): Promise<boolean> {
    this.stop();
    if (typeof window === 'undefined') return Promise.resolve(false);

    try {
      this.audio = new Audio(audioUrl);
      this.audio.loop = true;
      return this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
          return true;
        })
        .catch(() => {
          // If actual audio for "her" is not available in project, do NOT substitute a different tune
          this.isPlaying = false;
          return false;
        });
    } catch {
      this.isPlaying = false;
      return Promise.resolve(false);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const lofiPlayer = new LofiMusicEngine();
