import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { theme } from '@styles/index'

const createStyle = () => {
  const { colors } = useTheme()
  const { spacing, radius, fontSize } = theme

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      marginVertical: spacing.xl,
    },
    header: {
      alignItems: 'center',
    },
    routeButton: {
      width: '25%',
      padding: spacing.md,
      borderRadius: radius.sm,
      backgroundColor: '#ccc',
      marginTop: spacing.xl,
    },
    actionButtons: {
      alignItems: 'center',
    },
  })
}

export default createStyle
