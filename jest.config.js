// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.ts',
  ],
  moduleNameMapper: {
    // FIX: proper string regex for Windows/Node
    '\\.(svg)$': '<rootDir>/__tests__/__mocks__/svgMock.js',
    '^react-i18next$': '<rootDir>/__tests__/__mocks__/react-i18next.ts',
    '\\.(png|jpg|jpeg|mp4)$': '<rootDir>/__tests__/__mocks__/fileMock.js',

  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
      + '|@react-native'
      + '|react-native-svg'
      + '|react-redux'
      + '|@reduxjs/toolkit'
      + '|redux-persist'
      + '|react-native-safe-area-context'
      + '|react-native-gesture-handler'
      + ')/)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
    '/__tests__/__mocks__/',
  ],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
};
