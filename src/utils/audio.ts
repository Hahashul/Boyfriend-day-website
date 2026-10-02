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
 * Real HTML5 Audio Engine for Mixtape & Landing Page
 * Strictly plays requested real audio tracks and does NOT synthesize placeholder/random tunes.
 */
class RealAudioEngine {
  private isPlaying = false;
  private audio: HTMLAudioElement | null = null;
  private currentUrl = '';
  private onStateChangeListeners: Array<(playing: boolean, currentUrl: string) => void> = [];

  public start(audioUrl = '/audio/her.mp3'): Promise<boolean> {
    if (typeof window === 'undefined') return Promise.resolve(false);

    // If already playing this exact track, resume or keep playing
    if (this.audio && this.currentUrl === audioUrl && !this.audio.paused) {
      this.isPlaying = true;
      this.notify();
      return Promise.resolve(true);
    }

    this.stop();

    return new Promise((resolve) => {
      try {
        const audio = new Audio();
        this.audio = audio;
        this.currentUrl = audioUrl;

        audio.onplay = () => {
          this.isPlaying = true;
          this.notify();
        };

        audio.onpause = () => {
          this.isPlaying = false;
          this.notify();
        };

        audio.onended = () => {
          this.isPlaying = false;
          this.notify();
        };

        // Try primary URL first
        audio.src = audioUrl;

        audio
          .play()
          .then(() => {
            this.isPlaying = true;
            this.notify();
            resolve(true);
          })
          .catch(() => {
            // If primary URL failed (e.g. /audio/her.mp3), try root fallback (/her.mp3) or alternate naming
            let fallbackUrl = '';
            if (audioUrl.startsWith('/audio/')) {
              fallbackUrl = audioUrl.replace('/audio/', '/');
            } else if (audioUrl.startsWith('/')) {
              fallbackUrl = '/audio' + audioUrl;
            }

            if (fallbackUrl && fallbackUrl !== audioUrl) {
              const fallbackAudio = new Audio(fallbackUrl);
              this.audio = fallbackAudio;
              this.currentUrl = fallbackUrl;

              fallbackAudio.onplay = () => {
                this.isPlaying = true;
                this.notify();
              };
              fallbackAudio.onpause = () => {
                this.isPlaying = false;
                this.notify();
              };
              fallbackAudio.onended = () => {
                this.isPlaying = false;
                this.notify();
              };

              fallbackAudio
                .play()
                .then(() => {
                  this.isPlaying = true;
                  this.notify();
                  resolve(true);
                })
                .catch(() => {
                  this.isPlaying = false;
                  this.notify();
                  resolve(false);
                });
            } else {
              this.isPlaying = false;
              this.notify();
              resolve(false);
            }
          });
      } catch {
        this.isPlaying = false;
        this.notify();
        resolve(false);
      }
    });
  }

  public pause() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.currentUrl = '';
    this.notify();
  }

  public getStatus() {
    return this.isPlaying;
  }

  public getCurrentUrl() {
    return this.currentUrl;
  }

  public getAudioElement() {
    return this.audio;
  }

  public subscribe(listener: (playing: boolean, currentUrl: string) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach((l) => l(this.isPlaying, this.currentUrl));
  }
}

export const lofiPlayer = new RealAudioEngine();
