import Reactotron, { ReactotronReactNative } from 'reactotron-react-native'
import mmkvPlugin from 'reactotron-react-native-mmkv'
import { storage } from './storage.ts'

Reactotron.use(mmkvPlugin<ReactotronReactNative>({ storage })).useReactNative().connect()
