import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ImageBackground, Text, TouchableOpacity, View, ViewToken } from 'react-native'
import { BottomSheets, NoiseButton } from '@components/index'
import { soundController } from '@services/soundController'
import { fetchSoundsFromFirebase, FirebaseSound } from '@services/firebaseSoundService'
import createStyle from './home.styles'
import * as Img from '@assets/img'
import { getBooleanFromStorage, getFromStorage, saveToStorage } from '@services/storage'
import { STORAGE_KEYS } from '@constants/storageConstant.ts'
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv'

export default function HomePage() {
  const styles = createStyle()
  const [soundData, setSoundData] = useState<Record<string, FirebaseSound[]>>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [soundStates, setSoundStates] = useMMKVObject<
    Record<string, { playing: boolean; volume: number }>
  >(STORAGE_KEYS.SOUND_STATES)
  const [isPlaying, setIsPlaying] = useMMKVBoolean(STORAGE_KEYS.PAUSED_ALL)
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const categoryListRef = useRef<FlatList>(null)

  const categoryKeys = Object.keys(soundData)

  const restoredPlaying = (savedStates) => {
    if (getBooleanFromStorage(STORAGE_KEYS.PAUSED_ALL)) {
      return
    }

    const playingSounds = Object.entries(savedStates)
      .filter(([_, val]) => val.playing)
      .map(([key, val]) => ({ key, volume: val.volume || 0.5 }))
    console.log('playingSounds', playingSounds?.length)
    if (playingSounds?.length > 0) {
      playingSounds.forEach(({ key, volume }) => {
        soundController.setVolume(key, volume || 0.5)
        soundController.play(key)
      })
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    const init = async () => {
      const savedSoundData = [
        getFromStorage<Record<string, FirebaseSound[]>>(STORAGE_KEYS.SOUND_DATA, {}),
      ]

      if (Object.keys(savedSoundData).length > 0) {
        setSoundData(savedSoundData)
        setSelectedCategory(Object.keys(savedSoundData)[0] || '')
      }

      const savedStates = getFromStorage<Record<string, { playing: boolean; volume: number }>>(
        STORAGE_KEYS.SOUND_STATES,
        {}
      )

      setSoundStates(savedStates)

      const fetchedData = await fetchSoundsFromFirebase()
      if (fetchedData && Object.keys(fetchedData).length > 0) {
        setSoundData(fetchedData)
        setSelectedCategory(Object.keys(fetchedData)[0] || '')
        saveToStorage(STORAGE_KEYS.SOUND_DATA, fetchedData)
      }

      const allSounds = Object.values(fetchedData || savedSoundData).flat()
      await Promise.all(allSounds.map((sound) => soundController.addSound(sound.key, sound.url)))

      restoredPlaying(savedStates)
    }

    init()
  }, [])

  const toggleSound = async (sound) => {
    const isPlaying = soundStates[sound?.key]?.playing ?? false

    if (!isPlaying && !soundController.sounds[sound?.key]) {
      setLoadingStates((prev) => ({ ...prev, [sound?.key]: true }))
      try {
        await soundController.addSound(sound?.key, sound?.url)
        setIsPlaying(true)
      } catch (e) {
        console.warn(`🔴 ${sound?.key} yüklenemedi:`, e)
      }
      setLoadingStates((prev) => ({ ...prev, [sound?.key]: false }))
    }

    if (isPlaying) {
      soundController.pause(sound?.key)
    } else {
      setIsPlaying(true)
      soundController.setVolume(sound?.key, soundStates[sound?.key]?.volume ?? 0.5)
      saveToStorage(STORAGE_KEYS.PLAYING_SOUNDS, true)
      restoredPlaying(soundStates)

      await soundController.play(sound?.key)
    }

    setSoundStates((prev) => {
      const newStates = {
        ...prev,
        [sound?.key]: { ...prev[sound?.key], playing: !isPlaying, ...sound },
      }
      saveToStorage(STORAGE_KEYS.SOUND_STATES, newStates)
      return newStates
    })
  }

  const updateVolume = (key: string, volume: number) => {
    soundController.setVolume(key, volume)
    setSoundStates((prev) => {
      const updated = { ...prev, [key]: { ...prev[key], volume } }
      saveToStorage(STORAGE_KEYS.SOUND_STATES, updated)
      return updated
    })
  }

  const getCategoryTitle = (val: string) => val.charAt(0).toUpperCase() + val.slice(1)

  const renderCategoryButton = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      key={item}
      style={[styles.noiseTypeItem, selectedCategory === item && styles.noiseTypeItemSelected]}
      onPress={() => {
        setSelectedCategory(item)
        categoryListRef.current?.scrollToIndex({ index, animated: true })
      }}
    >
      <Text
        style={[
          styles.noiseTypeItemText,
          selectedCategory === item && styles.noiseTypeItemTextSelected,
        ]}
      >
        {getCategoryTitle(item)}
      </Text>
    </TouchableOpacity>
  )

  const renderNoiseButtons = ({ item }: { item: string }) => (
    <FlatList
      data={soundData[item]}
      numColumns={3}
      contentContainerStyle={styles.flatList}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <NoiseButton
          onPress={() => toggleSound(item)}
          value={soundStates[item.key]?.volume ?? 0.5}
          setValue={(val: any) => updateVolume(item.key, val)}
          isActive={soundStates[item.key]?.playing ?? false}
          isLoading={loadingStates[item.key] ?? false}
          name={item.name}
          iconName={item.iconName}
          soundKey={item.key}
        />
      )}
    />
  )

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const firstItem = viewableItems[0].item as string
      setSelectedCategory(firstItem)
    }
  }).current

  return (
    <ImageBackground source={Img.Bg02} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.noiseTypeContainer}>
          <FlatList
            data={categoryKeys}
            renderItem={renderCategoryButton}
            horizontal
            keyExtractor={(item) => item}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            ref={categoryListRef}
            data={categoryKeys}
            renderItem={renderNoiseButtons}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
          />
        </View>
      </View>
      <BottomSheets.Player />
    </ImageBackground>
  )
}
