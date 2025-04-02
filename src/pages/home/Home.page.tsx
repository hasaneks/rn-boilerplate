import { View, Text, SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import createStyle from './home.styles.ts'
import { Icon } from '@components/index'
import { useNavigation } from '@react-navigation/native'
import Routes from '@navigation/routes.ts'

export default function HomePage() {
  const styles = createStyle()
  const navigation = useNavigation()

  const routeToMenuPage = () => {
    navigation.navigate(Routes.MENU_PAGE)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Icon name={'ArrowLeft'} fill={true} color={'green'} size={32} />
      </View>

      <Text>Home Page</Text>

      <TouchableOpacity style={styles.routeButton} onPress={routeToMenuPage}>
        <Text>Go To Menu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
