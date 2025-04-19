import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Routes from './routes.ts'
import BottomTabBar from '@navigation/BottomTabBar'
import { useEffect, useState } from 'react'
import { colors, theme } from '@styles'
import { Appearance, useColorScheme } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Stack = createNativeStackNavigator()

const LightTheme = {
  dark: false,
  colors: colors.light,
  fonts: theme.fonts,
  padding: theme.padding,
}

const DarkTheme = {
  dark: true,
  colors: colors.dark,
  fonts: theme.fonts,
  padding: theme.padding,
}

export default function Navigation() {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState(colorScheme === 'dark' ? DarkTheme : LightTheme)

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme)
    })

    return () => subscription.remove()
  }, [])

  const RootStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.TAB_STACK} component={BottomTabBar} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer theme={theme}>
      <BottomSheetModalProvider>
        <RootStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  )
}
