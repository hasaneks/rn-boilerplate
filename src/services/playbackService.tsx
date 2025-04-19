import TrackPlayer, { Event } from 'react-native-track-player'
import { soundController } from './soundController'

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('▶️ RemotePlay triggered')
    soundController.playAll()
  })

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('⏸️ RemotePause triggered')
    soundController.pauseAll()
  })

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.log('🛑 RemoteStop triggered')
    soundController.stopAll()
  })
}
