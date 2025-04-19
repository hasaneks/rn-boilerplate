import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '@styles'

const createStyle = () => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const { fonts, spacing, fontSize, radius } = theme

  return StyleSheet.create({
    bottomSheetContainer: {
      borderTopRightRadius: radius.md,
      borderTopLeftRadius: radius.md,
      backgroundColor: colors.bottomBar,
      paddingTop: spacing.md,
      flex: 1,
    },
    handleStyle: {
      display: 'none',
    },
    content: {
      flexDirection: 'row',
      paddingHorizontal: spacing.xl,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftContainer: {
      flex: 1,
    },
    rightContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.md,
    },
    musicNameContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.secondary.bold,
      fontSize: fontSize.lg,
      fontWeight: 700,
      color: colors.textPrimary,
    },
    description: {
      marginVertical: spacing.md,
      fontSize: fontSize.sm,
      color: colors.borderPrimary,
      lineHeight: fontSize.md * 1.5,
      marginBottom: 15,
    },
    timerButton: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
    },
    playButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      backgroundColor: 'rgba(13,123,255,0.05)',
      height: 50,
      width: 50,
    },
    scrollContent: {},
    soundItem: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.lg,
      backgroundColor: 'rgba(22,22,35,0.8)',
      margin: spacing.sm,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
    },
    soundTitle: {
      fontSize: fontSize.md,
      color: colors.textPrimary,
    },
    sliderContainer: {
      flex: 1,
    },
    slider: {},
    soundInfo: {
      alignItems: 'center',
      width: 50,
    },
    soundText: {
      fontSize: 9,
      color: colors.textPrimary,
      textAlign: 'center',
    },
  })
}

export default createStyle
