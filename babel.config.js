module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@redux': './src/redux',
          '@utils': './src/utils',
          '@navigator': './src/navigator',
          '@hooks': './src/hooks',
          '@constant': './src/constant',
        },
      },
    ],
  ],
};
