module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@types': './types/index',
            '@utils': './utils/index.ts',
            '@components': './components/index.ts',
            '@screens': './screens/index.ts',
          },
          extensions: ['.ts', '.tsx'],
        },
      ],
    ],
  };
};
