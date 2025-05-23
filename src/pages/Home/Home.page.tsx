import { View, Text, SafeAreaView } from 'react-native'
import createStyle from './home.styles.ts'
import { Icon, Button, Lottie } from '@components/index'
import { useNavigation } from '@react-navigation/native'
import Routes from '@navigation/routes.ts'
import * as LottieAnimation from '@assets/lottie/index.ts'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const styles = createStyle()
  const navigation = useNavigation()
  const { t } = useTranslation()

  const routeToMenuPage = () => {
    navigation.navigate(Routes.MENU_PAGE)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name={'React'} fill={false} color={'green'} size={64} />
        <Text style={styles.title}>{t('welcome')}</Text>
        <Text style={styles.title}>{t('server_demo')}</Text>
        <Lottie source={LottieAnimation.ReactLottie} />
      </View>

      <View style={styles.actionButtons}>
        <Button title={t('goToMenu')} onPress={routeToMenuPage} style={{ marginTop: 0 }} />
        <Button
          title={'Outline Button'}
          onPress={() => console.log('Clicked!!')}
          size={'large'}
          variant={'outline'}
        />
        <Button
          title={'Ghost Button'}
          onPress={() => console.log('Clicked!!')}
          size={'large'}
          variant={'outline'}
        />

        <Button
          title={'Icon Button'}
          onPress={() => console.log('Clicked!!')}
          size={'large'}
          icon={<Icon name={'React'} size={30} />}
          variant={'ghost'}
        />
      </View>
    </SafeAreaView>
  )
}
