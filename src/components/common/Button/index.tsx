import React, { useState } from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  Animated,
  View,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native'
import createStyle, { variantStyles, sizeStyles } from './styles'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'small' | 'medium' | 'large'

type CommonButtonProps = {
  title: string
  onPress?: (event: GestureResponderEvent) => void
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  rounded?: boolean
  buttonColor?: string
  textColor?: string
  style?: StyleProp<any>
}

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  rounded = false,
  buttonColor,
  textColor,
}) => {
  const [scale] = useState(new Animated.Value(1))
  const isDisabled = loading || disabled
  const styles = createStyle()

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start()
  }

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start()
  }

  const variantStyle = isDisabled ? variantStyles.disabled : variantStyles[variant]
  const sizeStyle = sizeStyles[size]

  const combinedButtonStyle: StyleProp<ViewStyle> = [
    styles.buttonBase,
    sizeStyle.button,
    variantStyle.button,
    fullWidth && styles.fullWidth,
    rounded && { borderRadius: 999 },
    buttonColor && { backgroundColor: buttonColor },
    { transform: [{ scale }] },
  ]

  const combinedTextStyle: StyleProp<TextStyle> = [
    styles.text,
    sizeStyle.text,
    variantStyle.text,
    textColor && { color: textColor },
  ]

  return (
    <TouchableWithoutFeedback
      disabled={isDisabled}
      onPressIn={animateIn}
      onPressOut={animateOut}
      onPress={onPress}
    >
      <Animated.View style={combinedButtonStyle}>
        {loading ? (
          <ActivityIndicator color={textColor || variantStyle.text.color} />
        ) : (
          <View style={styles.content}>
            {icon && <View style={styles.iconMargin}>{icon}</View>}
            <Text style={combinedTextStyle}>{title}</Text>
          </View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CommonButton
