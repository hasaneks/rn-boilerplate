import {configureStore} from '@reduxjs/toolkit'
import {baseApi} from '@services/api'

import auth from '../features/auth/slice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
})
