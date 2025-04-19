import { StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '@styles/index.ts'
import { useTheme } from '@react-navigation/native'

const createStyle = () => {
  const { fonts } = theme
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  return StyleSheet.create({
    bottomBar: {
      flexDirection: 'row',
      height: Platform.OS === 'ios' ? 75 : 65,
      paddingBottom: insets.bottom / 2,
      backgroundColor: colors.bottomBar,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    },
    bottomBarItem: {
      flex: 1,
      alignItems: 'center',
      height: '100%',
      paddingVertical: 8,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    activeIconContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: fonts.sm,
      color: colors.textPrimary,
      fontFamily: fonts.primary.regular,
      marginTop: 4,
    },
  })
}

export default createStyle
