import { StyleSheet } from 'react-native'
import { theme } from '@styles/index.ts'

const createStyle = () => {
  const { spacing } = theme

  return StyleSheet.create({
    buttonBase: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: spacing.xl,
    },
    fullWidth: {
      alignSelf: 'stretch',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconMargin: {
      marginRight: 8,
    },
    text: {
      fontWeight: '600',
    },
  })
}

export default createStyle

export const sizeStyles = {
  small: {
    button: {
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    text: {
      fontSize: 14,
    },
  },
  medium: {
    button: {
      paddingVertical: 10,
      paddingHorizontal: 18,
    },
    text: {
      fontSize: 16,
    },
  },
  large: {
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
    },
    text: {
      fontSize: 18,
    },
  },
}

export const variantStyles = {
  primary: {
    button: {
      backgroundColor: '#007AFF',
    },
    text: {
      color: '#fff',
    },
  },
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#007AFF',
    },
    text: {
      color: '#007AFF',
    },
  },
  ghost: {
    button: {
      backgroundColor: 'transparent',
    },
    text: {
      color: '#007AFF',
    },
  },
  disabled: {
    button: {
      backgroundColor: '#ccc',
      borderColor: '#ccc',
    },
    text: {
      color: '#888',
    },
  },
}
