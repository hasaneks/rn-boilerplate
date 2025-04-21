import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { findBestLanguageTag } from 'react-native-localize'
import { LANGUAGE_URL } from '@env'

import en from './locales/en.json'
import tr from './locales/tr.json'

const deviceLanguage = findBestLanguageTag(['en', 'tr'])?.languageTag || 'en'

const BASE_LANG_URL = LANGUAGE_URL

const localResources = {
  en: { translation: en },
  tr: { translation: tr },
}

i18n
  .use(
    resourcesToBackend((language: string) => {
      const url = `${BASE_LANG_URL}/${language}.json`
      return fetch(url, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
        .then((res) => {
          if (!res.ok) {
            console.error('❌ Fetch failed:', res.status)
            throw new Error('Server response failed')
          }
          return res.json()
        })
        .catch((err) => {
          console.warn('⚠️ Falling back to localResources due to:', err.message)
          return localResources[language as keyof typeof localResources]
        })
    })
  )
  .use(initReactI18next)
  .init({
    lng: deviceLanguage,
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
