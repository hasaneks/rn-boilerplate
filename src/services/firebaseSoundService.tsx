import firestore from '@react-native-firebase/firestore'

export type FirebaseSound = {
  key: string
  name: string
  url: string
  category: string
  iconName: string
}

export const fetchSoundsFromFirebase = async (): Promise<Record<string, FirebaseSound[]>> => {
  try {
    const snapshot = await firestore().collection('sounds').get()

    const sounds: FirebaseSound[] = []
    snapshot.forEach((doc) => {
      sounds.push(doc.data() as FirebaseSound)
    })

    const grouped: Record<string, FirebaseSound[]> = {}
    for (const sound of sounds) {
      if (!grouped[sound.category]) grouped[sound.category] = []
      grouped[sound.category].push(sound)
    }

    return grouped
  } catch (err) {
    console.error('❌ Firestore çekme hatası:', err)
    return {}
  }
}
