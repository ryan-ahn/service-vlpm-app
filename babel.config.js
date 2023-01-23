module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@libs': './src/libs',
          '@asset': './src/asset',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@graphql': './src/graphql',
        },
      },
    ],
  ],
};
