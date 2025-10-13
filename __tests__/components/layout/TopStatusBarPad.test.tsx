import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { render } from '@testing-library/react-native';
import TopStatusBarPad from '../../../src/components/layout/TopStatusBarPad';

jest.mock('../../../src/theme/useColorMode', () => ({
  useColorMode: () => mockMode,
}));
jest.mock('../../../src/theme/colors', () => ({
  colors: {
    light: { card: '#f8f8f8' },
    dark: { card: '#222222' },
  },
}));

let mockMode: 'light' | 'dark' = 'light';

const setOS = (os: 'android' | 'ios') => {
  Object.defineProperty(Platform, 'OS', {
    get: () => os,
  });
};

const flatten = (styles: any) =>
  Array.isArray(styles) ? Object.assign({}, ...styles) : styles;

describe('TopStatusBarPad', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMode = 'light';
  });

  it('Android: derives barStyle from light mode and uses theme background when no override given', () => {
    setOS('android');
    mockMode = 'light'; // theme = light → barStyle = dark-content

    const { UNSAFE_queryAllByType } = render(<TopStatusBarPad />);

    const bars = UNSAFE_queryAllByType(StatusBar);
    expect(bars.length).toBe(1);

    const bar = bars[0];
    expect(bar.props.translucent).toBe(true);
    expect(bar.props.backgroundColor).toBe('#f8f8f8');
    expect(bar.props.barStyle).toBe('dark-content');

    const pads = UNSAFE_queryAllByType(SafeAreaView);
    expect(pads.length).toBe(0);
  });

  it('Android: honors explicit backgroundColor and lightContent=true', () => {
    setOS('android');
    mockMode = 'dark'; // ignored by explicit props

    const { UNSAFE_queryAllByType } = render(
      <TopStatusBarPad backgroundColor="#00ff00" lightContent />
    );

    const bar = UNSAFE_queryAllByType(StatusBar)[0];
    expect(bar.props.translucent).toBe(true);
    expect(bar.props.backgroundColor).toBe('#00ff00');
    expect(bar.props.barStyle).toBe('light-content');
  });

  it('iOS: uses transparent StatusBar and paints top SafeArea with theme card color (dark mode)', () => {
    setOS('ios');
    mockMode = 'dark'; // theme = dark → barStyle = light-content; bg = colors.dark.card

    const { UNSAFE_queryAllByType } = render(<TopStatusBarPad />);

    const bars = UNSAFE_queryAllByType(StatusBar);
    expect(bars.length).toBe(1);
    expect(bars[0].props.barStyle).toBe('light-content');

    const pads = UNSAFE_queryAllByType(SafeAreaView);
    expect(pads.length).toBe(1);
    expect(pads[0].props.edges).toEqual(['top']);

    const padStyle = flatten(pads[0].props.style);
    expect(padStyle.backgroundColor).toBe('#222222');
  });

  it('iOS: respects backgroundColor override and lightContent=false', () => {
    setOS('ios');
    mockMode = 'dark'; // would normally be light-content, but prop forces dark-content

    const { UNSAFE_queryAllByType } = render(
      <TopStatusBarPad backgroundColor="#abcdef" lightContent={false} />
    );

    const bar = UNSAFE_queryAllByType(StatusBar)[0];
    expect(bar.props.barStyle).toBe('dark-content');

    const pad = UNSAFE_queryAllByType(SafeAreaView)[0];
    const padStyle = flatten(pad.props.style);
    expect(padStyle.backgroundColor).toBe('#abcdef');
  });
});
