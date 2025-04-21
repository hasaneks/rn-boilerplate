import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Pages from '@pages/index'
import Routes from './routes.ts'

const Stack = createNativeStackNavigator()

export default function Navigation() {
  const RootStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.HOME_PAGE} component={Pages.Home} />
        <Stack.Screen name={Routes.MENU_PAGE} component={Pages.Menu} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}
