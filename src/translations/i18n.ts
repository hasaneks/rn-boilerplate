import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { findBestLanguageTag } from 'react-native-localize'

import en from './locales/en.json'
import tr from './locales/tr.json'

const deviceLanguage = findBestLanguageTag(['en', 'tr'])?.languageTag || 'en'

const BASE_LANG_URL = 'https://hasaneksi.net/boilerplate/translations'

const localResources = {
  en: { translation: en },
  tr: { translation: tr },
}

i18n
  .use(
    resourcesToBackend((language: string) => {
      return fetch(`${BASE_LANG_URL}/${language}.json`)
        .then((res) => {
          if (!res.ok) throw new Error('Sunucu yanıtı başarısız')
          return res.json()
        })
        .catch(() => {
          return localResources[language as keyof typeof localResources]?.translation
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
