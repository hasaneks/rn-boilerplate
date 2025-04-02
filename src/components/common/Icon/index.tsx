import React from 'react'
import { SvgProps } from 'react-native-svg'
import { View, StyleProp, ViewStyle } from 'react-native'
import * as Icons from '@assets/icons'

type IconProps = {
  name: string
  fill?: boolean
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

const Icon: React.FC<IconProps> = ({ name, fill = false, size = 24, color, style }) => {
  const iconKey = fill ? `${name}Fill` : name
  const IconComponent = Icons[iconKey as keyof typeof Icons] as React.FC<SvgProps>

  if (!IconComponent) {
    console.warn(`Icon "${iconKey}" not found`)
    return null
  }

  return (
    <View style={style}>
      <IconComponent width={size} height={size} color={color || 'black'} />
    </View>
  )
}

export default Icon
