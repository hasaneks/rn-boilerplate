import { StyleSheet } from 'react-native'

type LottieStyleProps = {
  height: number
  width: number
}

const createStyle = ({ height, width }: LottieStyleProps) => {
  return StyleSheet.create({
    lottie: {
      height: height,
      width: width,
    },
  })
}

export default createStyle
