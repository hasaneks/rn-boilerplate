import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import createStyle from './player.style.ts'
import { useTranslation } from 'react-i18next'
import { Icon } from '@components/index.ts'
import { soundController } from '@services/soundController.tsx'
import Slider from '@react-native-community/slider'
import { STORAGE_KEYS } from '@constants/storageConstant.ts'
import { getFromStorage, saveToStorage } from '@services/storage.ts'
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv'

const BottomSheetPlayer = forwardRef((props, ref) => {
  const styles = createStyle()
  const { t } = useTranslation()
  const playerRef = useRef(null)
  const [snapPoints, setSnapPoints] = useState<string[]>(['12%', '85%'])
  const [isPlaying, setIsPlaying] = useMMKVBoolean(STORAGE_KEYS.PAUSED_ALL)
  const [playingSounds, setPlayingSounds] = useState<any[]>([])
  const [currentPosition, setCurrentPosition] = useState<number>(-1)
  const [soundStates] = useMMKVObject(STORAGE_KEYS.SOUND_STATES)

  const setDynamicSize = () => {
    let dynamicSize = playingSounds?.length * 15
    if (dynamicSize > 100) {
      dynamicSize = 90
    }

    setSnapPoints(['12%', `${dynamicSize + 12}%`])
  }

  const getPlayingSoundsFromState = () => {
    try {
      const raw = getFromStorage<any>(STORAGE_KEYS.SOUND_STATES, {})
      return Object.entries(raw)
        .filter(([_, val]) => val.playing)
        .map(([key, val]) => ({ key, ...val }))
    } catch (e) {
      return []
    }
  }

  useEffect(() => {
    const current = getPlayingSoundsFromState()
    setPlayingSounds(current)
  }, [soundStates])

  useEffect(() => {
    if (playingSounds.length > 0 && currentPosition === -1) {
      setTimeout(() => {
        playerRef?.current?.snapToIndex(0)
        setIsPlaying(true)
      }, 300)
    } else if (playingSounds.length === 0) {
      playerRef?.current?.close()
      setIsPlaying(false)
    }

    setDynamicSize()
  }, [playingSounds?.length])

  const resumePreviouslyPlayingSounds = () => {
    playingSounds.forEach(({ key, volume }: any) => {
      soundController.setVolume(key, volume)
      soundController.play(key)
    })
  }

  const togglePlay = () => {
    if (isPlaying) {
      soundController.pauseAll()
      playingSounds.forEach(({ key }: any) => soundController.pause(key))
      saveToStorage(STORAGE_KEYS.PAUSED_ALL, true)
      setIsPlaying(false)
      return
    }
    setIsPlaying(true)
    saveToStorage(STORAGE_KEYS.PAUSED_ALL, false)
    resumePreviouslyPlayingSounds()
  }

  const toggleSingleSound = (key: string) => {
    const soundStates = getFromStorage<Record<string, { playing: boolean; volume: number }>>(
      STORAGE_KEYS.SOUND_STATES,
      {}
    )

    const isPlaying = soundStates[key]?.playing
    if (isPlaying) {
      soundController.pause(key)
    } else {
      soundController.play(key)
    }

    const updated = {
      ...soundStates,
      [key]: {
        ...soundStates[key],
        playing: !isPlaying,
      },
    }
    saveToStorage(STORAGE_KEYS.SOUND_STATES, updated)
  }

  const updateVolume = (key: string, volume: number) => {
    const soundStates = getFromStorage<Record<string, { playing: boolean; volume: number }>>(
      STORAGE_KEYS.SOUND_STATES,
      {}
    )
    soundController.setVolume(key, volume)
    const updated = {
      ...soundStates,
      [key]: {
        ...soundStates[key],
        volume,
      },
    }
    saveToStorage(STORAGE_KEYS.SOUND_STATES, updated)
  }

  const getPlayingSoundsName = () => {
    if (playingSounds?.length === 1) {
      return `${t(playingSounds[0]?.key)}`
    }
    return `${playingSounds.length} Ses Çalıyor`
  }

  const PlayerBackdrop = ({ ...props }: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop opacity={0.4} appearsOnIndex={1} {...props} />
  }

  return (
    <BottomSheet
      ref={playerRef}
      snapPoints={snapPoints}
      index={-1}
      enableDynamicSizing={false}
      handleStyle={styles.handleStyle}
      onChange={(index) => setCurrentPosition(index)}
      //      backdropComponent={PlayerBackdrop}
    >
      <BottomSheetView style={styles.bottomSheetContainer}>
        <View style={styles.content}>
          <View style={styles.leftContainer}>
            <View style={styles.musicNameContainer}>
              <Icon name={'MusicNote'} size={24} color={'#fff'} />
              <Text style={styles.title}>{getPlayingSoundsName()}</Text>
            </View>
            <Text style={styles.description}>Zamanlayıcı Devre Dışı</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.timerButton} onPress={togglePlay}>
              <Icon name={'Timer'} fill={true} color={'#ccc'} size={32} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
              <Icon name={isPlaying ? 'Pause' : 'Play'} fill={true} color={'#fff'} size={32} />
            </TouchableOpacity>
          </View>
        </View>

        {currentPosition === 1 && (
          <View style={styles.scrollContent}>
            {playingSounds.map((sound) => (
              <View key={sound.key} style={styles.soundItem}>
                <View style={styles.soundInfo}>
                  <Icon name={sound?.iconName} color={'#fff'} fill={true} size={28} />
                  <Text style={styles.soundText}>{sound?.key}</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={sound.volume}
                    onValueChange={(val) => updateVolume(sound.key, val)}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#666"
                  />
                </View>

                <TouchableOpacity onPress={() => toggleSingleSound(sound.key)}>
                  <Icon name={'Cancel'} size={24} color={'#ccc'} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  )
})

export default BottomSheetPlayer
