import { StyleSheet, useWindowDimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { theme } from '@styles/index'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const createStyle = () => {
  const { colors } = useTheme()
  const { spacing, radius, fontSize } = theme
  const { width } = useWindowDimensions()
  const { top } = useSafeAreaInsets()

  const default_colors = {
    header: '#82a3a1',
    pageColor: 'transparent',
  }

  return StyleSheet.create({
    container: {
      flex: 1,
      marginTop: top,
    },
    noiseTypeContainer: {
      padding: spacing.md,
    },
    title: {
      fontSize: fontSize.xl,
      fontWeight: '700',
      marginVertical: spacing.xl,
    },
    header: {
      padding: spacing.md,
    },
    routeButton: {
      width: '25%',
      padding: spacing.md,
      borderRadius: radius.sm,
      backgroundColor: default_colors.pageColor,
      marginTop: spacing.xl,
    },
    actionButtons: {
      alignItems: 'center',
    },
    flatList: {
      flex: 1,
      width: width,
      backgroundColor: default_colors.pageColor,
      paddingTop: 25,
    },
    noiseTypeItem: {
      marginHorizontal: 5,
      backgroundColor: 'rgba(255,255,255,0.15)',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.sm,
      borderColor: 'transparent',
      borderWidth: 1,
    },
    noiseTypeItemSelected: {
      backgroundColor: '#fff',
      borderColor: '#fff',
      borderWidth: 1,
    },
    noiseTypeItemText: {
      color: '#fff',
    },
    noiseTypeItemTextSelected: {
      color: 'rgb(20,67,172)',
      fontWeight: 'bold',
    },
  })
}

export default createStyle
