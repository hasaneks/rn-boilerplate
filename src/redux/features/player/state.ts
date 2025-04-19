export interface SoundInfo {
  key: string
  volume: number
}

export interface PlayerState {
  isVisible: boolean
  playingSounds: SoundInfo[]
  pausedAll: boolean
}

export const initialPlayerState: PlayerState = {
  isVisible: false,
  playingSounds: [],
  pausedAll: false,
}
