import React from 'react';
import { View, Text, Image } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import MainHeader from '../../../src/components/headers/MainHeader';

jest.mock('../../../src/theme/useColorMode', () => ({
  useColorMode: () => 'light',
}));

const flatten = (styles: any) =>
  Array.isArray(styles) ? Object.assign({}, ...styles) : styles;

const findPressableAncestor = (node: any) => {
  let cur = node;
  for (let i = 0; i < 6 && cur; i += 1) {
    if (cur?.props && (typeof cur.props.onPress === 'function' || 'disabled' in cur.props)) {
      return cur;
    }
    cur = cur.parent;
  }
  throw new Error('Clickable ancestor not found');
};

describe('MainHeader', () => {
  it('renders title when provided', () => {
    const { getByText } = render(<MainHeader title="Dashboard" />);
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('does not render title element when not provided', () => {
    const { queryByText } = render(<MainHeader />);
    expect(queryByText('Dashboard')).toBeNull();
  });

  it('renders rightContent when provided', () => {
    const Right = <Text testID="right-slot">R</Text>;
    const { getByTestId, queryByText } = render(
      <MainHeader title="X" rightContent={Right} />
    );
    expect(getByTestId('right-slot')).toBeTruthy();
    expect(queryByText('X')).toBeTruthy();
  });

  it('calls onLogoPress when logo is pressed', () => {
    const onLogoPress = jest.fn();
    const { UNSAFE_getByType } = render(
      <MainHeader title="T" onLogoPress={onLogoPress} />
    );

    const img = UNSAFE_getByType(Image);
    const logoWrapper = findPressableAncestor(img);

    // simulate user tap on the wrapper that has onPress
    fireEvent.press(logoWrapper);
    expect(onLogoPress).toHaveBeenCalledTimes(1);
  });

  it('disables logo wrapper when onLogoPress is not provided', () => {
    const { UNSAFE_getByType } = render(<MainHeader title="T" />);
    const img = UNSAFE_getByType(Image);
    const logoWrapper = findPressableAncestor(img);

    expect(logoWrapper.props.disabled).toBe(true);
  });

  it('image has accessibilityIgnoresInvertColors', () => {
    const { UNSAFE_getByType } = render(<MainHeader title="T" />);
    const img = UNSAFE_getByType(Image);
    expect(img.props.accessibilityIgnoresInvertColors).toBe(true);
  });

  it('applies bottom border by default', () => {
    const { UNSAFE_getAllByType } = render(<MainHeader title="T" />);
    const [container] = UNSAFE_getAllByType(View);
    const flat = flatten(container.props.style);
    expect(flat.borderBottomWidth).toBeDefined();
    expect(flat.borderBottomColor).toBeDefined();
  });

  it('omits bottom border when showBottomBorder=false', () => {
    const { UNSAFE_getAllByType } = render(
      <MainHeader title="T" showBottomBorder={false} />
    );
    const [container] = UNSAFE_getAllByType(View);
    const flat = flatten(container.props.style);
    expect(flat.borderBottomWidth).toBeUndefined();
    expect(flat.borderBottomColor).toBeUndefined();
  });

  it('keeps logo wrapper layout and title color consistent', () => {
    const { UNSAFE_getAllByType, getByText } = render(<MainHeader title="Styled" />);
    const [container] = UNSAFE_getAllByType(View);
    const titleNode = getByText('Styled');

    const containerStyle = flatten(container.props.style);
    const titleStyle = flatten(titleNode.props.style);

    expect(containerStyle.paddingHorizontal).toBe(16);
    expect(containerStyle.flexDirection).toBe('row');
    expect(typeof titleStyle.color).toBe('string');
    expect(titleStyle.fontWeight).toBe('700');
    expect(titleStyle.fontSize).toBe(18);
  });
});
