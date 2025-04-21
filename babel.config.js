module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@styles': './src/styles',
          '@components': './src/components',
          '@assets': './src/assets',
          '@pages': './src/pages',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@redux': './src/redux',
          '@services': './src/services',
          '@hooks': './src/hooks',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
  ],
}
