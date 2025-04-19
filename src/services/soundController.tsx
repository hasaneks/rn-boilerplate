import Sound from 'react-native-sound'
import { ensureSoundDownloaded } from '@services/fileManager.tsx'

Sound.setCategory('Playback')

class SoundController {
  sounds: Record<string, Sound> = {}

  async addSound(key: string, url: string): Promise<void> {
    if (this.sounds[key]) return

    const localPath = await ensureSoundDownloaded(key, url)

    return new Promise((resolve, reject) => {
      const sound = new Sound(localPath, '', (error) => {
        if (error) {
          reject(error)
          return
        }
        this.sounds[key] = sound
        resolve()
      })
    })
  }

  playAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.setNumberOfLoops(-1) // sonsuz döngü
      sound.play()
    })
  }

  pauseAll() {
    Object.values(this.sounds).forEach((sound) => sound.pause())
  }

  stopAll() {
    Object.values(this.sounds).forEach((sound) => sound.stop())
  }

  async play(key: string) {
    const sound = this.sounds[key]
    if (sound) {
      sound.setNumberOfLoops(-1)
      sound.play()
    }
  }

  pause(key: string) {
    this.sounds[key]?.pause()
  }

  setVolume(key: string, volume: number) {
    this.sounds[key]?.setVolume(volume)
  }

  getVolume(key: string): number {
    return this.sounds[key]?._volume ?? 1
  }
}

export const soundController = new SoundController()
