import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlayerState, SoundInfo, initialPlayerState } from './state'

const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    showPlayer: (state) => {
      state.isVisible = true
    },
    hidePlayer: (state) => {
      state.isVisible = false
    },
    updatePlayingSounds: (state, action: PayloadAction<SoundInfo[]>) => {
      state.playingSounds = action.payload
      state.isVisible = action.payload.length > 0
    },
    updateVolume: (state, action: PayloadAction<{ key: string; volume: number }>) => {
      const index = state.playingSounds.findIndex((s) => s.key === action.payload.key)
      if (index !== -1) {
        state.playingSounds[index].volume = action.payload.volume
      }
    },
    setPausedAll: (state, action: PayloadAction<boolean>) => {
      state.pausedAll = action.payload
    },
  },
})

export const { showPlayer, hidePlayer, updatePlayingSounds, updateVolume, setPausedAll } =
  playerSlice.actions
export default playerSlice.reducer
