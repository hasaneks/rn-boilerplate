import RNFS from 'react-native-fs'

export const getLocalSoundPath = (key: string) => {
  return `${RNFS.DocumentDirectoryPath}/${key}.mp3`
}

export const listDownloadedFiles = async () => {
  const files = await RNFS.readDir(RNFS.DocumentDirectoryPath)
  console.log(
    '📁 Downloaded files:',
    files.map((f) => f.name)
  )
}

export const ensureSoundDownloaded = async (key: string, url: string): Promise<string> => {
  const localPath = getLocalSoundPath(key)

  const exists = await RNFS.exists(localPath)
  if (!exists) {
    console.log(`📥 Downloading ${key}...`)
    await RNFS.downloadFile({ fromUrl: url, toFile: localPath }).promise
    console.log(`✅ Downloaded ${key}`)
  }

  return 'file://' + localPath
}
