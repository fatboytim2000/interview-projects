module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // modules: false,
        // debug: true,
        targets: {
          browsers: [
            // 'last 2 versions', // this will include IE10 and IE11 !!!!
            '> 0.5%',
            'not ie > 0',
            'safari > 10',
            'ios > 10.2',
            'opera > 43',
            'edge > 15',
            // 'firefox > 51',
            // 'chrome > 56',
          ],
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env', { targets: { node: 'current' } },
        ],
      ],
    },
  },
};