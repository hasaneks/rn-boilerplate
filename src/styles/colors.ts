import theme from './theme.ts'

const common = {
  white: '#FFFFFF',
  card: '#fff',
  text: '#fff',
  border: '#fff',
  notification: '#fff',
  ...theme.colors.common,
}

const colors = {
  light: {
    ...theme.colors.light,
    ...common,
  },
  dark: {
    ...theme.colors.dark,
    ...common,
  },
}

export default colors
