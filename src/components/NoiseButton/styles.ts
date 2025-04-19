import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { theme } from '@styles/index'

const createStyle = ({ isActive }) => {
  const { colors } = useTheme()
  const { spacing, radius, fontSize } = theme

  return StyleSheet.create({
    container: {
      width: '33%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    iconContainer: {
      backgroundColor: isActive ? '#fff' : 'rgba(34,61,41,0.8)',
      borderRadius: radius.md,
      padding: spacing.md,
    },
    infoContainer: {
      width: '100%',
      height: 30,
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      color: 'rgba(255,255,255,0.75)',
      fontSize: fontSize.md,
    },
  })
}

export default createStyle
