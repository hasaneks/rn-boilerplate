import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { storageService } from '@services/storage'
import { STORAGE_KEYS } from '@services/storage/constants'
import { API_URL } from '@env'
import Toast from 'react-native-toast-message'
import i18n from 'i18next'

const handleError = (error, dispatch) => {
  console.log('error', error)
  if (error.status === 'FETCH_ERROR') {
    Toast.show({
      type: 'error',
      text1: 'Bağlantı Hatası',
      text2: 'İnternet bağlantınızı kontrol edin',
    })
    return
  }

  const errorMessage = error?.data?.data?.message || error?.data?.message || 'Bir hata oluştu'
  const statusCode = error.status
  const success = error?.data?.data?.success || error?.data?.success

  switch (statusCode) {
    case 401:
      Toast.show({
        type: 'error',
        text1: 'Oturum Hatası',
        text2: 'Lütfen tekrar giriş yapın',
      })
      // TODO : You can log out of your user account here.
      break

    case 403:
      Toast.show({
        type: 'error',
        text1: 'Yetkisiz İşlem',
        text2: errorMessage,
      })
      break

    case 404:
      Toast.show({
        type: 'error',
        text1: 'Bulunamadı',
        text2: errorMessage,
      })
      break

    case 422:
      Toast.show({
        type: 'error',
        text1: 'Geçersiz Veri',
        text2: errorMessage,
      })
      break

    default:
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: errorMessage,
      })
  }

  console.error('API Error:', {
    endpoint: error.request?.url,
    status: statusCode,
    message: errorMessage,
    success,
    data: error.data,
  })

  return {
    status: statusCode,
    message: errorMessage,
    success: success,
    data: error?.data?.data,
  }
}

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Accept-Language', i18n.language)
      const token = storageService.get(STORAGE_KEYS.AUTH.TOKEN)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

  try {
    const result = await baseQuery(args, api, extraOptions)

    if (result.data?.success === false) {
      return {
        error: {
          status: result.status,
          data: result.data,
        },
      }
    }

    if (result.error) {
      const errorResult = handleError(result.error, api.dispatch)
      return { error: errorResult }
    }

    return result
  } catch (error) {
    const errorResult = handleError(error, api.dispatch)
    return { error: errorResult }
  }
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
  tagTypes: ['Post'],
})
