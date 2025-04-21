import {MMKV} from 'react-native-mmkv'

const storage = new MMKV()

class StorageService {
  set(key, value) {
    try {
      const serializedValue =
        typeof value === 'string' ? value : JSON.stringify(value)
      storage.set(key, serializedValue)
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  }

  get(key, defaultValue = null) {
    try {
      const value = storage.getString(key)
      if (!value) return defaultValue

      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  }

  delete(key) {
    try {
      storage.delete(key)
      return true
    } catch (error) {
      console.error('Storage delete error:', error)
      return false
    }
  }

  clearAll() {
    try {
      storage.clearAll()
      return true
    } catch (error) {
      console.error('Storage clearAll error:', error)
      return false
    }
  }
}

export const storageService = new StorageService()
