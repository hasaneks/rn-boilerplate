import React from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from '@components/index.ts'
import { soundController } from '@services/soundController.tsx'
import createStyle from './styles.ts'
import { useTranslation } from 'react-i18next'
import Slider from '@react-native-community/slider'

export default function NoiseButton({
  soundKey = 'hairdryer',
  onPress,
  isActive,
  value,
  setValue,
  iconName,
  isLoading,
}) {
  const styles = createStyle({ isActive })
  const { t } = useTranslation()

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <Icon
            name={iconName}
            fill={isActive}
            color={isActive ? '#052765' : 'rgba(255,255,255,0.5)'}
            size={48}
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        {!isActive ? (
          <Text style={styles.name} numberOfLines={2}>
            {t(soundKey)}
          </Text>
        ) : (
          <Slider
            style={{ width: '75%' }}
            value={value}
            minimumValue={0}
            maximumValue={1}
            step={0.1}
            onValueChange={(val) => {
              setValue(val)
              soundController.setVolume(soundKey, val)
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}
