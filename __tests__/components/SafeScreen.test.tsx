import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { render } from '@testing-library/react-native';
import SafeScreen from '../../src/components/SafeScreen';

jest.mock('../../src/theme/useColorMode', () => ({
  useColorMode: () => 'light',
}));

jest.mock('../../src/theme/colors', () => ({
  colors: {
    light: { bg: '#ffffff' },
    dark: { bg: '#000000' },
  },
}));

jest.mock('../../src/theme/tokens', () => ({
  spacing: (n: number) => n * 8, // spacing(2) -> 16
}));

const flatten = (styles: any) =>
  Array.isArray(styles) ? Object.assign({}, ...styles) : styles;

describe('SafeScreen', () => {
  it('wraps children in SafeAreaView with correct edges and styles', () => {
    const { getByText, UNSAFE_getByType, UNSAFE_getAllByType } = render(
      <SafeScreen>
        <Text>Inner content</Text>
      </SafeScreen>
    );

    expect(getByText('Inner content')).toBeTruthy();

    const safe = UNSAFE_getByType(SafeAreaView);
    expect(safe.props.edges).toEqual(['top', 'left', 'right']);
    const safeStyle = flatten(safe.props.style);
    expect(safeStyle.flex).toBe(1);
    expect(safeStyle.backgroundColor).toBe('#ffffff'); // colors.light.bg

    const views = UNSAFE_getAllByType(View);
    const contentView = views.find(v => {
      const s = flatten(v.props.style);
      return s && s.padding === 16 && s.flex === 1;
    });
    expect(contentView).toBeTruthy();
  });
});
