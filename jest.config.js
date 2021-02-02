module.exports = {
  verbose: true,

  // globals
  globals: {
    'NODE_ENV': 'test',
  },

  // Jest MUST NOT load with these patterns
  //     '/src/server/',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],

  // // Module Configuration
  // moduleFileExtensions: [
  //   'js',
  //   'json',
  //   'vue',
  // ],

  // moduleNameMapper: {
  //   '^vue$': 'vue/dist/vue.runtime.js',
  //   '^api$': '<rootDir>/src/client/api', // unit-tests will always use mock
  //   '^actions/(.*)': '<rootDir>/src/client/store/actions/$1',
  //   '^assets/(.*)': '<rootDir>/src/assets/$1',
  //   '^components/(.*)': '<rootDir>/src/client/components/$1',
  //   '^mixins/(.*)': '<rootDir>/src/client/mixins/$1',
  //   '^layouts/(.*)': '<rootDir>/src/client/layouts/$1',
  //   '^locales/(.*)': '<rootDir>/src/client/locales/$1',
  //   '^plugins/(.*)': '<rootDir>/src/client/plugins/$1',
  //   '^views/(.*)': '<rootDir>/src/client/views/$1',
  //   '^router$': '<rootDir>/src/client/router',
  //   '^actions$': '<rootDir>/src/client/store/actions',
  //   '^store$': '<rootDir>/src/client/store',
  //   '^mock$': '<rootDir>/mock',
  //   '.+\\.(css|scss|png|jpg|jpeg|gif|svg|eot|otf|ttf|woff|woff2)$': 'jest-transform-stub',
  // },

  // moduleNameMapper: {
  //   '^vue$': 'vue/dist/vue.runtime.js',
  //   '^api$': '<rootDir>/src/client/api', // unit-tests will always use mock
  //   '.+\\.(css|scss|png|jpg|jpeg|gif|svg|eot|otf|ttf|woff|woff2)$': 'jest-transform-stub',
  // },

  setupFilesAfterEnv: [
    './jest.setup.js',
  ],

  // File type transforms
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },

  // Snapshot Serialization
  // snapshotSerializers: [
  //   'jest-serializer-vue',
  // ],

  // Coverage Reporting
  // collectCoverage: true,

  // collectCoverageFrom: [
  //   'src/**/*.{js,vue}',
  //   // 'tests/integration/**/*.{js,vue}',
  //   '!**/node_modules/**',
  //   '!src/server/**', // not the sever code yest !!!
  //   '!src/client/App.vue', // special-case file
  //   '!src/client/main.js', // special-case file
  //   '!**/_*.js', // not underscore files
  //   '!**/_*/**', // not in (underscore) folders
  //   '!src/assets/javascript/**',
  // ],

  // coverageReporters: [
  //   'text',
  //   // 'text-summary',
  //   'html',
  //   // 'cobertura'
  // ],

  // 100 |      100 |    100 |      100
  // coverageThreshold: {
  //   global: {
  //     statements: 100,
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //   },
  // },
};
