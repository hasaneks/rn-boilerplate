import React from 'react'
import LottieView, { LottieViewProps } from 'lottie-react-native'
import { StyleProp, ViewStyle } from 'react-native'
import createStyle from './styles.ts'

type Props = {
  source: LottieViewProps['source']
  style?: StyleProp<ViewStyle>
  autoPlay?: boolean
  loop?: boolean
  speed?: number
  resizeMode?: 'cover' | 'contain' | 'center'
  height?: number
  width?: number
} & Omit<LottieViewProps, 'source'>

const BaseLottie: React.FC<Props> = ({
  source,
  style,
  autoPlay = true,
  loop = true,
  speed = 1,
  resizeMode = 'contain',
  height = 128,
  width = 128,
  ...rest
}) => {
  const styles = createStyle({ height, width })
  return (
    <LottieView
      source={source}
      style={[style, styles.lottie]}
      autoPlay={autoPlay}
      loop={loop}
      speed={speed}
      resizeMode={resizeMode}
      {...rest}
    />
  )
}

export default BaseLottie
