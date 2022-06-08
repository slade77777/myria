export enum SUPPORT_SOUND {
  SIGIL_HOVER = '/sounds/sigil.wav',
  SIGIL_SELECT = '/sounds/sigil_select.wav',
  SIGIL_DASHBOARD_BG = '/sounds/sigil_bg.mp3',
  SIGIL_CLAIM_REWARD = '/sounds/claim_reward.wav',
}

class SoundService {
  private playing: { [id: string]: HTMLAudioElement }
  private mute: boolean;

  constructor() {
    this.mute = false;
    this.playing = {};
  }

  playSound(sound: SUPPORT_SOUND, { loop = false } = {}) {
    const audio = new Audio(sound);
    audio.id = Date.now().toString();
    audio.muted = this.mute;
    audio.play();
    audio.loop = loop;
    audio.onended = () => {
      delete this.playing[audio.id];
    }
    this.playing[audio.id] = audio;
    return audio;
  }

  setMuted(isMuted: boolean) {
    this.mute = isMuted;
    Object.values(this.playing).forEach((audio) => audio.muted = isMuted);
  }
}

export const soundService = new SoundService();