import BackgroundTimer from 'react-native-background-timer'

let timerId: number | null = null

/**
 * Sleep timer başlatır
 * @param minutes Süre (dakika cinsinden)
 * @param callback Süre bitince çalışacak fonksiyon
 */
export const startSleepTimer = (minutes: number, callback: () => void) => {
  if (timerId !== null) {
    BackgroundTimer.clearTimeout(timerId)
  }

  timerId = BackgroundTimer.setTimeout(() => {
    timerId = null
    callback()
  }, minutes * 60 * 1000)
}

/**
 * Sleep timer'ı iptal eder
 */
export const cancelSleepTimer = () => {
  if (timerId !== null) {
    BackgroundTimer.clearTimeout(timerId)
    timerId = null
  }
}
