import React from 'react'
import './src/translations/i18n'
import './src/services/reactotronConfig.tsx'

import Navigation from '@navigation/index.tsx'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from '@redux/app/store.ts'

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App
