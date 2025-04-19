import TrackPlayer from 'react-native-track-player'

export async function setupTrackPlayer() {
  await TrackPlayer.setupPlayer()

  //  console.log('🎧 Track Player initialized')

  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: 'stopPlaybackAndRemoveNotification',
    },
    capabilities: ['play', 'pause', 'stop'],
    compactCapabilities: ['play', 'pause'],
    notificationCapabilities: ['play', 'pause', 'stop'],
    // icon: require('../assets/icon.png'), // isteğe bağlı
  })

  // console.log('⚙️ Track Player options set')

  await TrackPlayer.add({
    id: 'controller',
    url: 'https://dummy.sound/empty.mp3',
    title: 'White Noise Mixer',
    artist: 'Your App',
  })

  // console.log('🎵 Dummy track added')

  await TrackPlayer.play()
  // console.log('▶️ Track Player started')
}
