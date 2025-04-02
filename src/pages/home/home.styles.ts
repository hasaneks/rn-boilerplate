import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { theme } from '@styles/index'

const createStyle = () => {
  const { colors } = useTheme()
  const { spacing, radius } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    routeButton: {
      width: '25%',
      padding: spacing.md,
      borderRadius: radius.sm,
      backgroundColor: '#ccc',
      marginTop: spacing.xl,
    },
  })
}

export default createStyle
