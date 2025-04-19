import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

/**
 * Kalıcı veri kaydet
 * @param key Anahtar (örneğin 'playingSounds')
 * @param value Her türlü obje, array, string vs
 */
export const saveToStorage = (key: string, value: any) => {
  try {
    storage.set(key, JSON.stringify(value))
  } catch (e) {
    console.warn(`❌ Storage set error [${key}]`, e)
  }
}

export const getBooleanFromStorage = (key: string, fallback = false): boolean => {
  try {
    return storage.getBoolean(key) || false
  } catch (e) {
    console.warn(`❌ Storage boolean get error [${key}]`, e)
    return fallback
  }
}
/**
 * Kalıcı veriyi getir
 * @param key Anahtar
 * @param fallback Opsiyonel varsayılan değer
 */
export const getFromStorage = <T>(key: string, fallback: T | null = null): T | null => {
  try {
    const value = storage.getString(key)
    return value ? JSON.parse(value) : fallback
  } catch (e) {
    console.warn(`❌ Storage get error [${key}]`, e)
    return fallback
  }
}

/**
 * Veriyi sil
 */
export const removeFromStorage = (key: string) => {
  try {
    storage.delete(key)
  } catch (e) {
    console.warn(`❌ Storage remove error [${key}]`, e)
  }
}
