import { configureStore } from '@reduxjs/toolkit'
import player from '../features/player/slice.ts'

export const store = configureStore({
  reducer: {
    player,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})
