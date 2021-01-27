module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'next/babel',
        {
          'preset-react': {
            'runtime': 'automatic',
            'importSource': '@emotion/react',
          },
        },
      ],
    ],
    plugins: [
      '@emotion/babel-plugin',
    ],
  };
};
