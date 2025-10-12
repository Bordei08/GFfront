import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

(() => {
  const deepPath = 'react-native/Libraries/Animated/NativeAnimatedHelper';
  try {
    require(deepPath); 
    jest.mock(deepPath, () => ({}));
  } catch {
  }
})();

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    { countryCode: 'RO', languageTag: 'en-RO', languageCode: 'en', isRTL: false },
  ],
  getNumberFormatSettings: () => ({ decimalSeparator: '.', groupingSeparator: ',' }),
  getCalendar: () => 'gregorian',
  getCountry: () => 'RO',
  getCurrencies: () => ['RON'],
  getTemperatureUnit: () => 'celsius',
  getTimeZone: () => 'Europe/Bucharest',
  uses24HourClock: () => true,
  usesMetricSystem: () => true,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));
