import Routes from '@navigation/routes'
import { Home, Menu } from '@pages/'
import * as Icon from '@assets/icons'
import { TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated'
import { useTheme } from '@react-navigation/native'
import createStyle from './bottomTabBar.style.ts'
import { useCallback, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator()

const TAB_CONFIG = {
  SPRING_CONFIG: {
    damping: 10,
    stiffness: 100,
    mass: 0.5,
  },
  ICON_SIZES: {
    active: 32,
    inactive: 24,
  },
}

const TabBarList = [
  {
    name: Routes.HOME_PAGE,
    component: Home,
    icon: Icon.MusicNote,
    activeIcon: Icon.MusicNoteFill,
  },
  {
    name: Routes.SETTINGS_PAGE,
    component: Menu,
    icon: Icon.Setting,
    activeIcon: Icon.SettingFill,
  },
]

function TabItem({ route, isFocused, options, onPress, colors, styles }) {
  const { Icon: TabIcon, ActiveIcon } = options
  const IconComponent = isFocused ? ActiveIcon : TabIcon
  const { t } = useTranslation()

  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const labelY = useSharedValue(0)
  const iconSize = useSharedValue(TAB_CONFIG.ICON_SIZES.inactive)

  useEffect(() => {
    if (isFocused) {
      iconSize.value = withSpring(TAB_CONFIG.ICON_SIZES.active, TAB_CONFIG.SPRING_CONFIG)
      scale.value = withSequence(
        withSpring(1.2, TAB_CONFIG.SPRING_CONFIG),
        withSpring(1, TAB_CONFIG.SPRING_CONFIG)
      )
      opacity.value = withTiming(0, { duration: 150 })
      labelY.value = withSpring(10, TAB_CONFIG.SPRING_CONFIG)
    } else {
      iconSize.value = withSpring(TAB_CONFIG.ICON_SIZES.inactive, TAB_CONFIG.SPRING_CONFIG)
      scale.value = withSpring(1, TAB_CONFIG.SPRING_CONFIG)
      opacity.value = withTiming(1, { duration: 200 })
      labelY.value = withSpring(0, TAB_CONFIG.SPRING_CONFIG)
    }
  }, [isFocused])

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    width: iconSize.value,
    height: iconSize.value,
  }))

  const labelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: labelY.value }],
  }))

  const label = options.tabBarLabel ?? options.title ?? route.name

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={styles.bottomBarItem}
    >
      <Animated.View
        style={[isFocused ? styles.activeIconContainer : styles.iconContainer, iconStyle]}
      >
        <IconComponent
          width="100%"
          height="100%"
          color={isFocused ? 'rgba(255,255,255,0.6)' : '#fff'}
        />
      </Animated.View>
      {!isFocused && <Animated.Text style={[styles.label, labelStyle]}>{t(label)}</Animated.Text>}
    </TouchableOpacity>
  )
}

function TabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme()
  const styles = createStyle()

  const onTabPress = useCallback(
    (route, isFocused) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      })

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params)
      }
    },
    [navigation]
  )

  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index

        return (
          <TabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            options={descriptors[route.key].options}
            onPress={() => onTabPress(route, isFocused)}
            colors={colors}
            styles={styles}
          />
        )
      })}
    </View>
  )
}

function BottomTabBar() {
  const screenOptions = useMemo(
    () => ({
      tabBarShowLabel: false,
      headerShown: false,
    }),
    []
  )

  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={screenOptions}>
      {TabBarList.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          options={{
            Icon: item.icon,
            ActiveIcon: item.activeIcon,
          }}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  )
}

export default BottomTabBar
